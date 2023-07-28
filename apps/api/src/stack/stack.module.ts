import { Module } from '@nestjs/common';
import { StackController } from './stack.controller';
import { StackService } from './stack.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [StackController],
  providers: [StackService, PrismaService],
})
export class StackModule {}
