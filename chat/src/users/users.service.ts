import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
  private users: Users[] = [
    {
      id: 1,
      name: 'Usuário Padrão',
      email: 'emailusuariopadrao@gmail.com',
    },
  ];

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

  create(createUserDto) {
    this.users.push(createUserDto);
  }

  update(id: number, updateUserDto) {
    if (!this.findOne(id)) {
      return;
    }

    const index = this.users.findIndex((user) => user.id == id);
    this.users[index] = {
      id,
      ...updateUserDto,
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
    if (index) {
      this.users.splice(index, 1);
    }
  }
}
