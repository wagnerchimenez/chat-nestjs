import { Controller, Get, Render } from '@nestjs/common';

@Controller('login')
export class LoginController {
  @Get()
  @Render('index')
  root() {
    return { message: 'Hello world!' };
  }
}
