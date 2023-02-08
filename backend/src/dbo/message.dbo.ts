import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('messages')
export class MessageDbo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  date: Date;

  @Column()
  user_id: number;

  @Column()
  conversation_id: number;
}