import { randomUUID } from 'node:crypto';
import { Users } from 'src/users/entities/users.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Messages {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  message: string;

  @ManyToOne(() => Users, (user) => user.sentMessages)
  @JoinColumn({ name: 'sender_id' })
  sender: Users;

  @ManyToOne(() => Users, (user) => user.receivedMessages)
  @JoinColumn({ name: 'receiver_id' })
  receiver: Users;

  @Column({ name: 'created_at' })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
