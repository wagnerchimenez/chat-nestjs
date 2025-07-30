import { IsString } from 'class-validator';

export class createUserDto {
  @IsString()
  readonly name: string;
  @IsString()
  readonly email: string;
}
