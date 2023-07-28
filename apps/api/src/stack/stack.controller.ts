import { Controller, Get, Req, UseGuards } from '@nestjs/common';
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
}
