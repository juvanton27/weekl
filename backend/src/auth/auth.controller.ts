import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Public } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): Observable<any> {
    return from(this.authService.login(req.user));
  }
}
