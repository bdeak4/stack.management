import { Injectable } from '@nestjs/common';
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

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id };

    return { access_token: this.jwtService.sign(payload) };
  }

  async register(username: string, password: string) {
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
  }
}
