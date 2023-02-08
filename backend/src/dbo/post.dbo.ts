import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('posts')
export class PostDbo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  picture: string;

  @Column()
  user_id: number;

  @Column()
  description: string;
}