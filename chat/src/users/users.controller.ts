import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';

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

  @Patch(':id')
  update(@Param('id') id: number, @Body() body) {
    console.log(body);
    return `Update user with ID ${id}`;
  }

//   Exemplo de alterar o status da requisição para 204
//   @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return `Delete user with ID ${id}`;
  }
}
