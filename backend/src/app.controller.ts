import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard, Public } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @Get()
  getHello() {
    return this.appService.getHello();
  }
}
