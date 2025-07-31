import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/admin/users/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
