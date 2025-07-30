import { Users } from 'src/users/entities/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Messages {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @ManyToOne(() => Users, (user) => user.sentMessages)
  @JoinColumn({ name: 'sender_id' })
  sender: Users;

  @ManyToOne(() => Users, (user) => user.receivedMessages)
  @JoinColumn({ name: 'receiver_id' })
  receiver: Users;
}
