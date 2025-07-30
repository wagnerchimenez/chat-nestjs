import { IsInt, IsString } from 'class-validator';

export class createMessageDto {
  @IsString()
  message: string;
  @IsInt()
  senderId: number;
  @IsInt()
  receiverId: number;
}
