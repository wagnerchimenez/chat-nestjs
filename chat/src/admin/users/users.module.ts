import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Messages } from './entities/messages.entity';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { HashingService } from 'src/auth/hashing/hashing.service';
import { BcryptService } from 'src/auth/hashing/bcrypt.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Messages])],
  controllers: [UsersController, MessagesController],
  providers: [
    UsersService,
    MessagesService,
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    JwtService,
  ],
})
export class UsersModule {}
