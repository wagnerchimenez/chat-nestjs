import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { Repository } from 'typeorm';
import { Users } from 'src/admin/users/entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async signIn(loginDto: LoginDto) {
    const user = await this.usersRepository.findOne({
      where: {
        email: loginDto.email,
        password: loginDto.password,
      },
    });

    if (!user) {
      return false;
    }

    return true;
  }
}
