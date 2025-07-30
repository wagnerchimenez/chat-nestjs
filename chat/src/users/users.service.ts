import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Users } from './entities/users.entity';
import { createUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Messages } from './entities/messages.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @InjectRepository(Messages)
    private readonly messagesRepository: Repository<Messages>,
  ) {}

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new HttpException(
        `User with ID ${id} not found!`,
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  async create(createUserDto: createUserDto) {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    let user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException(`User ID ${id} not found!`);
    }

    if (updateUserDto.name) {
      user.name = updateUserDto.name;
    }

    if (updateUserDto.email) {
      user.email = updateUserDto.email;
    }

    return this.usersRepository.save(user);
  }

  async updateName(id: string, name: string) {
    let user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      return;
    }

    user.name = name;
    this.usersRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      return;
    }

    this.usersRepository.remove(user);
  }

  async sendMessage(senderId: string, receiverId: string, messageText: string) {
    const sender = await this.usersRepository.findOne({
      where: { id: senderId },
    });
    const receiver = await this.usersRepository.findOne({
      where: { id: receiverId },
    });

    if (!sender || !receiver) {
      throw new NotFoundException('Sender or Receiver not found!');
    }

    const message = this.messagesRepository.create({
      sender,
      receiver,
      message: messageText,
    });

    return await this.messagesRepository.save(message);
  }
}
