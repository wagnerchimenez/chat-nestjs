import { IsInt, IsString } from 'class-validator';

export class createMessageDto {
  @IsString()
  message: string;
  @IsString()
  senderId: string;
  @IsString()
  receiverId: string;
}
