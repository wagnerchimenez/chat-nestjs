import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body() body) {
    return this.usersService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body) {
    return this.usersService.update(id, body);
  }

  @Patch('/update-name/:id')
  updateName(@Param('id') id: number, @Body('name') name: string) {
    return this.usersService.updateName(id, name);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
