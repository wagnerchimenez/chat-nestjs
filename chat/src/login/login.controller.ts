import { Controller, Get, Render } from '@nestjs/common';

@Controller('login')
export class LoginController {
  @Get()
  @Render('login')
  root() {
    return { message: 'Hello world!' };
  }
}
