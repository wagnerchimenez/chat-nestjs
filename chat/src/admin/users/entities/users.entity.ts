import { randomUUID } from 'node:crypto';
import { Messages } from 'src/admin/users/entities/messages.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string

  @OneToMany(() => Messages, (message) => message.sender)
  sentMessages: Messages[];

  @OneToMany(() => Messages, (message) => message.receiver)
  receivedMessages: Messages[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;
}
