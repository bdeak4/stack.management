import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/:username/stats')
  async getUserStats(@Param('username') username: string) {
    return this.userService.getUserStats(username);
  }
}
