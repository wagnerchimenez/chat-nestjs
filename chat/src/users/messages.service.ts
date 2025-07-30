import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Messages } from './entities/messages.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { createMessageDto } from './dto/create-message.dto';
import { Users } from './entities/users.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Messages)
    private readonly messagesRepository: Repository<Messages>,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async getAllMessages() {
    return this.messagesRepository.find({
      relations: ['sender', 'receiver'],
    });
  }

  async getMessageById(id: string) {
    const message = await this.messagesRepository.findOne({
      where: {
        id: id,
      },
      relations: ['sender', 'receiver'],
    });

    if (!message) {
      throw new NotFoundException(`Message with ID ${id} not found!`);
    }

    return message;
  }

  async createMessage(createMessageDto: createMessageDto) {
    const sender = await this.usersRepository.findOne({
      where: {
        id: createMessageDto.senderId,
      },
    });

    if (!sender) {
      throw new NotFoundException();
    }

    const receiver = await this.usersRepository.findOne({
      where: {
        id: createMessageDto.receiverId,
      },
    });

    if (!receiver) {
      throw new NotFoundException();
    }

    const message = this.messagesRepository.create({
      message: createMessageDto.message,
      sender: sender,
      receiver: receiver,
    });

    return this.messagesRepository.save(message);
  }

  async deleteMessage(id: string) {
    const message = await this.messagesRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!message) {
      throw new NotFoundException(`Message with ID ${id} not found!`);
    }

    return this.messagesRepository.remove(message);
  }
}
