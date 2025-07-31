import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { LoginController } from './login/login.controller';

@Module({
  imports: [UsersModule, DatabaseModule],
  controllers: [LoginController],
})
export class AppModule {}
