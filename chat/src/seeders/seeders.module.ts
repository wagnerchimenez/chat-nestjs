import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { SeederController } from './seeder.controller';
import { UsersService } from 'src/admin/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/admin/users/entities/users.entity';
import { Messages } from 'src/admin/users/entities/messages.entity';
import { HashingService } from 'src/auth/hashing/hashing.service';
import { BcryptService } from 'src/auth/hashing/bcrypt.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Messages])],
  controllers: [SeederController],
  providers: [
    SeederService,
    UsersService,
    {
      provide: HashingService,
      useClass: BcryptService,
    },
  ],
})
export class SeedersModule {}
