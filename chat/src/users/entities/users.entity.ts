import { Messages } from 'src/users/entities/messages.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany(() => Messages, (message) => message.sender)
  sentMessages: Messages[];

  @OneToMany(() => Messages, (message) => message.receiver)
  receivedMessages: Messages[];
}
