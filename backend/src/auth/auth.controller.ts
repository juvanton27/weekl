import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { from, map, Observable } from 'rxjs';
import { UserDto } from 'src/dto/user.dto';
import { UserMapper } from 'src/mappers/user.mapper';
import { User } from 'src/models/user.model';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { Public } from './jwt-auth.guard';
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
    return from(this.authService.login(req.user));
  }

  @Public()
  @Post('register')
  register(@Body() {username, password}: {username: string, password: string}): Observable<UserDto> {
    return this.usersService.create(username, password).pipe(
      map((model: User) => UserMapper.toDto(model)),
    );
  }
}
