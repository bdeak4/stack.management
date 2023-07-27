import { Controller, Post, UseGuards, Get, Req, Body } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() { username, password }) {
    return this.authService.register(username, password);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() { user }) {
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('whoami')
  whoami(@Req() { user }) {
    return user;
  }
}
