import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Messages } from './entities/messages.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Messages])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
