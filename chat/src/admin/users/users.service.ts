import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Users } from './entities/users.entity';
import { createUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Messages } from './entities/messages.entity';
import { HashingService } from 'src/auth/hashing/hashing.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @InjectRepository(Messages)
    private readonly messagesRepository: Repository<Messages>,
    private readonly hasshingService: HashingService,
  ) {}

  async getAllUsers() {
    return await this.usersRepository.find();
  }

  async getUserById(id: string) {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async createUser(createUserDto: createUserDto) {
    const user = this.usersRepository.create({
      name: createUserDto.name,
      email: createUserDto.email,
      password: await this.hasshingService.hash(createUserDto.password),
    });
    return this.usersRepository.save(user);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
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

    if (updateUserDto.password) {
      user.password = await this.hasshingService.hash(updateUserDto.password);
    }

    return this.usersRepository.save(user);
  }

  async deleteUser(id: string) {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return this.usersRepository.remove(user);
  }

  async sendMessage(message: string, senderId: string, receiverId: string) {
    const sender = await this.usersRepository.findOne({
      where: {
        id: senderId,
      },
    });

    if (!sender) {
      throw new BadRequestException();
    }

    const receiver = await this.usersRepository.findOne({
      where: {
        id: receiverId,
      },
    });

    if (!receiver) {
      throw new BadRequestException();
    }

    const newMessage = this.messagesRepository.create({
      message,
      sender,
      receiver,
    });

    return this.messagesRepository.save(newMessage);
  }
}
