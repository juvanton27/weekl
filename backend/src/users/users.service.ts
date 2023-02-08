import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, from, map, Observable, throwError } from 'rxjs';
import { UserDbo } from 'src/dbo/user.dbo';
import { UserMapper } from 'src/mappers/user.mapper';
import { User } from 'src/models/user.model';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserDbo)
    private readonly repo: Repository<UserDbo>
  ) { }

  findOne(username: string): Observable<User> {
    return from(this.repo.findOneBy({ username })).pipe(
      map((dbo: UserDbo) => UserMapper.fromDbo(dbo)),
      catchError(err => {
        console.warn(err.message);
        return throwError(err);
      })
    );
  }
}