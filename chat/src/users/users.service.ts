import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Users } from './users.entity';
import { createUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users: Users[] = [];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id == id);

    if (!user) {
      throw new HttpException(
        `User with ID ${id} not found!`,
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  create(createUserDto: createUserDto) {
    const user = {
      id: this.users.length + 1,
      ...createUserDto,
    };

    this.users.push(user);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    if (!this.findOne(id)) {
      return;
    }

    const index = this.users.findIndex((user) => user.id == id);
    const name = updateUserDto?.name ?? '';
    const email = updateUserDto?.email ?? '';

    this.users[index] = {
      id,
      name,
      email,
    };
  }

  updateName(id: number, name: string) {
    let user = this.findOne(id);

    if (!user) {
      return;
    }

    const index = this.users.findIndex((user) => user.id == id);
    this.users[index] = {
      ...user,
      name,
    };
  }

  remove(id: number) {
    const index = this.users.findIndex((user) => user.id == id);
    if (index != -1) {
      this.users.splice(index, 1);
    }
  }
}
