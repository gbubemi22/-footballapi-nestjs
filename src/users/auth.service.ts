/* eslint-disable prettier/prettier */
import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async register(
    fullname: string,
    username: string,
    email: string,
    phonenumber: number,
    password: any,
  ) {
    const emailAlreadyExists = await this.usersService.findOne(email);
    if (emailAlreadyExists.length) {
      throw new BadRequestException('Email Already in use');
    }

    const userAlreadyExists = await this.usersService.findOne(username);
    if (userAlreadyExists.length) {
      throw new BadRequestException('Username Already in use');
    }

    const salt = randomBytes(10).toString('hex');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const pass = salt + '.' + hash.toString('hex');

    const user = await this.usersService.create(
      fullname,
      username,
      email,
      phonenumber,
      pass,
    );


    return user;

  }
}
