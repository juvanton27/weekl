import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('stories')
export class StoryDbo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  video: string;

  @Column()
  user_id: number;

  @Column()
  description: string;
}