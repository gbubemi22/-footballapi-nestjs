/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dtos/update-user.dto';

import { User } from './schemas/user.schema';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  [x: string]: any;
  find(arg0: { username: string }) {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUsers(): Promise<User[]> {
    return this.usersRepository.find({});
  }

  async getUserById(userId: string): Promise<User> {
    return this.usersRepository.findOne({ userId });
  }

  async createUser(
    fullname: string,
    username: string,
    email: string,
    phonenumber: number,
    password: any,
  ): Promise<User> {
    return this.usersRepository.create({
      fullname,
      username,
      email,
      phonenumber,
      password,
      role: {
        enum: ['superAdmin', 'admin', 'user'],
        default: 'user',
      },
    });
  }

  async updateUser(userId: string, userUpdates: UpdateUserDto): Promise<User> {
    return this.usersRepository.findOneAndUpdate({ userId }, userUpdates);
  }
}
