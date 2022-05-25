/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/login.dto';


@Injectable()
export class UsersRepository {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(id: string): Promise<User> {
    return await this.userModel.findOne({ _id: id});
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username } = createUserDto;
    const user = await this.userModel.findOne({ username });
    if (user){
      throw new HttpException('User Already Available',
      HttpStatus.BAD_REQUEST);
    } 
    user.email = createUserDto.email;
    user.password = await bcrypt.hash(createUserDto.password, 10);
    const newUser = new this.userModel(createUserDto);
    return await newUser.save();
  }


  async findByLogin(userDTO1: LoginDto){
    const { username } = userDTO1;
    const user = await this.userModel.findOne({ username });
    if(!user) {
      throw new HttpException('User not found',
       HttpStatus.UNAUTHORIZED)
    }
    const isPasswordMatching = await bcrypt.compare(
      userDTO1.password,
      user.password
    );
  if (!isPasswordMatching) {
      throw new HttpException('Invalid credentials', 
      HttpStatus.UNAUTHORIZED);    
  }  

    return userDTO1;
   
  }

  async update( user: UpdateUserDto ): Promise<User> {
    return await this.userModel.findOneAndUpdate({email: user.email},
      {password: user.password},
      { phonenumber: user.phonenumber }
      )
  }
   
   async delete(id: string): Promise<boolean> {
    const user = await this.findOne(id);
    if(!user) {
      throw new HttpException('User Not found',
      HttpStatus.BAD_REQUEST)
    }     
    

     return  await this.userModel.findByIdAndRemove({ _id: id })
     
     //return  this.userModel.delete(user);
   }
  
}
