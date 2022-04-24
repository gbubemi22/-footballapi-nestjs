/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Param,
  Patch,
  Body,
  NotFoundException,
  Post,
} from '@nestjs/common';

import { User } from './schemas/user.schema';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { AuthService } from './auth.service';

@Controller('/auth')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private authService:  AuthService,
    ) {}

  @Get('/:id')
  async getUser(@Param('id') id: string): Promise<User> {
    const user = await this.usersService.getUserById(id);

    if (!user) {
      throw new NotFoundException(`No User with ${id}....`);
    }
    return user;
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Post('/register')
  async createUser(@Body() createuserDto: CreateUserDto): Promise<User> {

   const user = await this.authService.register(
      createuserDto.fullname,
      createuserDto.username,
      createuserDto.email,
      createuserDto.phonenumber,
      createuserDto.password,
    
    );

    return user;
    
  }

  @Patch('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(id, updateUserDto);
  }
}
