import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './dto/login.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Get()
  @Render('login')
  showPageLogin() {
    return { message: 'Hello world!' };
  }

  @Post('sign-in')
  async signIn(@Body() loginDto: LoginDto) {
    const login = await this.loginService.signIn(loginDto);

    if (!login) {
      return 'Login incorreto';
    }

    return 'Login com sucesso';
  }
}
