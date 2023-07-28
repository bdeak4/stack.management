import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getUserStats(username: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const completedTasksCount = await this.prismaService.task.count({
      where: {
        stack: {
          userId: user.id,
        },
        deletedAt: {
          not: null,
        },
      },
    });

    return { registrationDate: user.createdAt, completedTasksCount };
  }
}
