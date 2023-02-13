import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { catchError, map, Observable, throwError } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserDto } from 'src/dto/user.dto';
import { UserMapper } from 'src/mappers/user.mapper';
import { User } from 'src/models/user.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number): Observable<UserDto> {
    return this.usersService.findOneById(id).pipe(
      map((model: User) => UserMapper.toDto(model)),
      catchError(err => {
        console.warn(err.message);
        return throwError(err);
      })
    )
  }
}
