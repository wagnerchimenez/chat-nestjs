import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { Repository } from 'typeorm';
import { Users } from 'src/admin/users/entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingService } from './hashing/hashing.service';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from './dto/refresh-token.dto';

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
  ): Promise<
    { accessToken: string; refreshToken: string } | UnauthorizedException
  > {
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

    const accessToken = await this.signJwtAsync(payload, false);
    const refreshToken = await this.signJwtAsync(payload, true);

    return { accessToken, refreshToken };
  }

  async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    const { sub } = await this.jwtService.verifyAsync(
      refreshTokenDto.refreshToken,
      {
        audience: process.env.JWT_TOKEN_AUDIENCE,
        issuer: process.env.JWT_TOKEN_ISSUER,
        secret: process.env.JWT_SECRET,
      },
    );

    const user = await this.usersRepository.findOneBy({
      email: sub,
    });

    if(!user){
        throw new UnauthorizedException()
    }

    // TODO Implementar geracao do token
    // return this.createTokens()
  }

  private async signJwtAsync(payload, refresh: boolean): Promise<string> {
    let options = {
      audience: process.env.JWT_TOKEN_AUDIENCE,
      issuer: process.env.JWT_TOKEN_ISSUER,
      secret: process.env.JWT_SECRET,
    };

    if (refresh) {
      options['expiresIn'] = process.env.JWT_TTL;
    }

    return await this.jwtService.signAsync(payload, options);
  }
}
