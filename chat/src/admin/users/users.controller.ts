import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { sendMessageDto } from './dto/send-message.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  listAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  showUser(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Post()
  createUser(@Body() createUserDto: createUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }

  @Post(':id/messages')
  sendMessage(
    @Param('id') senderId: string,
    @Body() sendMessageDto: sendMessageDto,
  ) {
    return this.usersService.sendMessage(
      sendMessageDto.message,
      senderId,
      sendMessageDto.receiverId,
    );
  }
}


/* 

GET	/users/:id/messages/sent	Ver mensagens enviadas por um usuário
GET	/users/:id/messages/received	Ver mensagens recebidas por um usuário
GET	/users/:userId/messages/:messageId	Ver uma mensagem específica de um usuário


Mensagem status lida nao lida
usuario status onlien offline

*/