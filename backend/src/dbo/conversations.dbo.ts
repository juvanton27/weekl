import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('conversations')
export class ConversationDbo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id_1: number;

  @Column()
  user_id_2: number;
}