import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { catchError, from, map, Observable, throwError } from 'rxjs';
import { UserDto } from 'src/dto/user.dto';
import { UserMapper } from 'src/mappers/user.mapper';
import { User } from 'src/models/user.model';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard, Public } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) { }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): Observable<any> {
    return from(this.authService.login(req.user)).pipe(
      catchError(err => throwError(err))
    );
  }

  @Public()
  @Post('register')
  register(@Body() {username, password}: {username: string, password: string}): Observable<UserDto> {
    return this.usersService.create(username, password).pipe(
      map((model: User) => UserMapper.toDto(model)),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('profil')
  getProfile(@Request() req) {
    return req.user;
  }
}
