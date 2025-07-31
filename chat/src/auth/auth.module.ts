import { Module } from '@nestjs/common';
import { HashingService } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/admin/users/entities/users.entity';
import { JwtService } from '@nestjs/jwt';


@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    AuthService,
    JwtService
  ],
  controllers: [AuthController],
})
export class AuthModule {}
