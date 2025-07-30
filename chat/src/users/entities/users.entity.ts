import { randomUUID } from 'node:crypto';
import { Messages } from 'src/users/entities/messages.entity';
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

  @OneToMany(() => Messages, (message) => message.sender)
  sentMessages: Messages[];

  @OneToMany(() => Messages, (message) => message.receiver)
  receivedMessages: Messages[];

  @Column({ name: 'created_at' })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @BeforeInsert()
  generatedId() {
    if (this.id) {
      return;
    }

    this.id = randomUUID();
  }
}
