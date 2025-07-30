import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { createMessageDto } from './dto/create-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  listAllMessages() {
    return this.messagesService.getAllMessages();
  }

  @Get(':id')
  showMessage(@Param('id') id: string) {
    return this.messagesService.getMessageById(id);
  }

  @Post()
  createMessage(@Body() createMessageDto: createMessageDto) {
    return this.messagesService.createMessage(createMessageDto);
  }

  @Delete(':id')
  deleteMessage(@Param('id') id: string) {
    return this.messagesService.deleteMessage(id);
  }
}
