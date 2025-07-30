import {
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
    const user = this.usersRepository.create(createUserDto);
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
}
