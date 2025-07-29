import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  findAll() {
    return 'List of Users';
  }

  //   @Get(':id')
  //   findOne(@Param() params) {
  //     return `User ID ${params.id}`;
  //   }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return `User ID ${id}`;
  }

  @Post()
  create(@Body() body) {
    return body;
  }
}
