import { BadRequestException, Injectable } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class StackService {
  constructor(private prismaService: PrismaService) {}

  async getStacks(userId: number) {
    return await this.prismaService.stack.findMany({
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
            position: 'desc',
          },
        },
        _count: {
          select: {
            tasks: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async createStack(userId: number, name: string) {
    if (!name) {
      throw new BadRequestException('Stack name is required');
    }

    return await this.prismaService.stack.create({
      data: {
        name,
        userId,
      },
      include: {
        tasks: true,
        _count: {
          select: {
            tasks: true,
          },
        },
      },
    });
  }

  async deleteStack(userId: number, stackId: number) {
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

    const count = await this.prismaService.stack.count({
      where: {
        userId,
        deletedAt: null,
      },
    });

    if (count === 1) {
      throw new BadRequestException('You cannot delete the last stack');
    }

    await this.prismaService.task.updateMany({
      where: {
        stackId,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return await this.prismaService.stack.update({
      where: {
        id: stackId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async createTask(userId: number, stackId: number, content: string) {
    if (!content) {
      throw new BadRequestException('Task content is required');
    }

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

    const prevTask = await this.prismaService.task.findFirst({
      where: {
        stackId,
        deletedAt: null,
      },
      select: {
        position: true,
      },
      orderBy: {
        position: 'desc',
      },
    });

    const position = prevTask ? prevTask.position.add(1) : new Decimal(1);

    return await this.prismaService.task.create({
      data: {
        content,
        stackId,
        position,
      },
    });
  }

  async deleteTask(userId: number, stackId: number, taskId: number) {
    const stack = await this.prismaService.stack.findFirst({
      where: {
        id: stackId,
        userId,
        deletedAt: null,
        tasks: {
          some: {
            id: taskId,
          },
        },
      },
    });

    if (!stack) {
      throw new BadRequestException('Stack not found');
    }

    return await this.prismaService.task.update({
      where: {
        id: taskId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async moveTask(
    userId: number,
    stackId: number,
    taskId: number,
    index: number,
  ) {
    if (index < 1) {
      const task = await this.prismaService.task.findFirst({
        where: {
          stackId,
          deletedAt: null,
          stack: {
            userId,
          },
        },
        select: {
          position: true,
        },
        orderBy: {
          position: 'desc',
        },
      });

      if (!task) {
        throw new BadRequestException('Task not found');
      }

      return await this.prismaService.task.update({
        where: {
          id: taskId,
        },
        data: {
          position: task.position.add(1),
        },
      });
    }

    const [before, after] = await this.prismaService.task.findMany({
      where: {
        stackId,
        deletedAt: null,
        stack: {
          userId,
        },
      },
      select: {
        position: true,
      },
      orderBy: {
        position: 'desc',
      },
      skip: index - 1,
      take: 2,
    });

    if (!before && !after) {
      throw new BadRequestException('Task not found');
    }

    const position = !!after
      ? before.position.add(after.position).div(2)
      : before.position.sub(1);

    return await this.prismaService.task.update({
      where: {
        id: taskId,
      },
      data: {
        position,
      },
    });
  }
}
