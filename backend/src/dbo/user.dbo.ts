import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class UserDbo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;
}