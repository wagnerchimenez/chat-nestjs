import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AdminModule } from './admin/admin.module';
import { LoginModule } from './login/login.module';

@Module({
  imports: [
    DatabaseModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/'],
    }),
    AdminModule,
    LoginModule,
  ],
})
export class AppModule {}
