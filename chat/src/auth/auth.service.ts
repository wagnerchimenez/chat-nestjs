import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { Repository } from 'typeorm';
import { Users } from 'src/admin/users/entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingService } from './hashing/hashing.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private readonly hashingService: HashingService,
    private jwtService: JwtService,
  ) {}

  async login(
    loginDto: LoginDto,
  ): Promise<{ accessToken: string } | UnauthorizedException> {
    const user = await this.usersRepository.findOneBy({
      email: loginDto.email,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const isValidUser = await this.hashingService.compare(
      loginDto.password,
      user.password,
    );

    if (!isValidUser) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: loginDto.email,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      audience: process.env.JWT_TOKEN_AUDIENCE,
      issuer: process.env.JWT_TOKEN_ISSUER,
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_TTL,
    });

    return { accessToken };
  }
}
