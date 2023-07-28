import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class StackService {
  constructor(private prismaService: PrismaService) {}

  async getLastUsedStack(userId: number) {
    return this.prismaService.stack.findFirst({
      where: {
        userId,
      },
    });
  }
}
