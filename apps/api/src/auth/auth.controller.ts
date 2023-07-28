import { Controller, Post, UseGuards, Get, Req, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() { username, password }) {
    return await this.authService.register(username, password);
  }

  @Post('login')
  async login(@Body() { username, password }) {
    return this.authService.login(username, password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('whoami')
  whoami(@Req() { user }) {
    return user;
  }
}
