import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class StackService {
  constructor(private prismaService: PrismaService) {}

  async getStacks(userId: number) {
    return this.prismaService.stack.findMany({
      where: {
        userId,
        deletedAt: null,
      },
      include: {
        tasks: {
          where: {
            deletedAt: null,
          },
        },
      },
    });
  }
}
