/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Param,
  Body,
  NotFoundException,
  Post,
  Put,
  Delete,
  HttpCode,
} from '@nestjs/common';

import { User } from './schemas/user.schema';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { LoginDto } from './dtos/login.dto';
//import { AuthService } from './auth.service';

@Controller('/auth')
export class UsersController {
  constructor(
    private usersService: UsersService,
   // private authService:  AuthService,
    ) {}

  @Get('/:id')
  async getUserById(@Param('id') id: string): Promise<User> {
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
     //Create a User
  @Post('register')
  async createUser(@Body() userDTO: CreateUserDto): Promise<User> {

   const user = await this.usersService.create(userDTO);

   return user;
    
  }

  @Post('login')
  async findByLogin(@Body() loginDTO: LoginDto) {

    const user = await this.usersService.findByLogin(loginDTO);

    return user;
  }




        //Update A user
  @Put('/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    updateUserDto.id = id
    
    return this.usersService.update(updateUserDto);
        
  }
// Delete a User
  @Delete('/:id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    const y = await this.usersService.delete(id);
    if(!y) {
      throw new NotFoundException('User not found ....')
    }
  }
}
