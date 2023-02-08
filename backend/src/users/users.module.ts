import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDbo } from 'src/dbo/user.dbo';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserDbo])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule { }
