import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('comments')
export class CommentDbo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  label: string;

  @Column()
  post_id: number;

  @Column()
  user_id: number;
}