import { Injectable, MethodNotAllowedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { concatMap, from, map, Observable } from 'rxjs';
import { UserDbo } from 'src/dbo/user.dbo';
import { UserMapper } from 'src/mappers/user.mapper';
import { User } from 'src/models/user.model';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  saltOrRounds = 10;

  constructor(
    @InjectRepository(UserDbo)
    private readonly repo: Repository<UserDbo>
  ) { }

  create(username: string, password: string): Observable<User> {
    return this.findOne(username).pipe(
      concatMap((user: User) => {
        if(user) throw new MethodNotAllowedException(`User with username ${username} already exists`);
        return from(bcrypt.hash(password, this.saltOrRounds));
      }),
      concatMap((hash: string) => {
        const dbo: Partial<UserDbo> = {
          username, password: hash,
        }
        return from(this.repo.save(dbo));
      }),
      map((dbo: UserDbo) => UserMapper.fromDbo(dbo)),
    );
  }

  findOne(username: string): Observable<User> {
    return from(this.repo.findOneBy({ username })).pipe(
      map((dbo: UserDbo) => UserMapper.fromDbo(dbo))
    );
  }
}