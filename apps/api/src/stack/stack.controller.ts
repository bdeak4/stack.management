import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
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
}
