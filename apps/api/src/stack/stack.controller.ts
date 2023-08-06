import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { StackService } from './stack.service';

@Controller('stack')
export class StackController {
  constructor(private stackService: StackService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getStacks(@Req() { user }) {
    return this.stackService.getStacks(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createStack(@Req() { user }, @Body() { name }) {
    return this.stackService.createStack(user.id, name);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:stackId')
  deleteStack(
    @Req() { user },
    @Param('stackId', ParseIntPipe) stackId: number,
  ) {
    return this.stackService.deleteStack(user.id, stackId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:stackId/task')
  createTask(
    @Req() { user },
    @Param('stackId', ParseIntPipe) stackId: number,
    @Body() { content },
  ) {
    return this.stackService.createTask(user.id, stackId, content);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:stackId/task/:taskId')
  deleteTask(
    @Req() { user },
    @Param('stackId', ParseIntPipe) stackId: number,
    @Param('taskId', ParseIntPipe) taskId: number,
  ) {
    return this.stackService.deleteTask(user.id, stackId, taskId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:stackId/task/:taskId/move')
  moveTask(
    @Req() { user },
    @Param('stackId', ParseIntPipe) stackId: number,
    @Param('taskId', ParseIntPipe) taskId: number,
    @Body() { index },
  ) {
    return this.stackService.moveTask(user.id, stackId, taskId, index);
  }
}
