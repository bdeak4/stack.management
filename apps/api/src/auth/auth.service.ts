import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.prismaService.user.findUnique({
      where: { username: username },
    });

    if (!user) {
      throw new BadRequestException('Invalid username');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid password');
    }

    const { password: _password, ...result } = user;
    return result;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id };

    return { access_token: this.jwtService.sign(payload) };
  }

  async register(username: string, password: string) {
    try {
      const user = await this.prismaService.user.create({
        data: {
          username,
          password: await bcrypt.hash(password, 10),

          stacks: {
            create: {
              name: 'default',
            },
          },
        },
      });

      const payload = { username: user.username, sub: user.id };

      return { access_token: this.jwtService.sign(payload) };
    } catch (err) {
      if (err.code === 'P2002') {
        throw new BadRequestException('Username already exists');
      }
      throw err;
    }
  }
}
