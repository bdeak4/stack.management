import { BadRequestException, Injectable } from '@nestjs/common';
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
          orderBy: {
            updatedAt: 'desc',
          },
        },
        _count: {
          select: {
            tasks: true,
          },
        },
      },
    });
  }

  async createTask(userId: number, stackId: number, content: string) {
    const stack = await this.prismaService.stack.findFirst({
      where: {
        id: stackId,
        userId,
        deletedAt: null,
      },
    });

    if (!stack) {
      throw new BadRequestException('Stack not found');
    }

    return await this.prismaService.task.create({
      data: {
        content,
        stackId,
      },
    });
  }
}
