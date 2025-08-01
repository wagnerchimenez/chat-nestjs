import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/admin/users/users.service';

@Injectable()
export class SeederService {
  constructor(private readonly usersService: UsersService) {}

  seedUsers() {
    return this.usersService.createUser({
      name: 'Wagner Lima Chimenez',
      email: 'wagnerllchimenez.comp@gmail.com',
      password: 'admin',
    });
  }
}
