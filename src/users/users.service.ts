/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './schemas/user.schema';
import { UsersRepository } from './users.repository';
import { Messages } from './Messages.data';
import { InjectModel } from '@nestjs/mongoose';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private usersRepository: UsersRepository) {}
  // get all Users
  async getUsers(): Promise<User[]> {
    return this.usersRepository.findAll();
  }
  // get single user by id
  async getUserById(id: string): Promise<User> {
    let user = this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`${id} ${Messages.USER_NOT_EXIST}`);
    }
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.usersRepository.create(createUserDto);
  }

  async findByLogin(userDTO1: LoginDto) {
    return await this.usersRepository.findByLogin(userDTO1);
  }

  async update(userUpdates: UpdateUserDto): Promise<User> {
    return this.usersRepository.update(userUpdates);
  }

  async delete(id: string): Promise<boolean> {
    let x = await this.usersRepository.delete(id);
    console.log(x);
    return x;
  }
}
