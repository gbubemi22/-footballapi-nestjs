/* eslint-disable prettier/prettier */
import { IsString, IsEmail, } from 'class-validator';




export class CreateUserDto {
    @IsString()
  fullname: string;


  @IsString()
  username: string;
  
  
  @IsEmail()
  email: string;
  
  phonenumber: number;
  
  
  password: string;

  @IsString()
  role: string 
  enum = ['superAdmin', 'admin', 'user'];
  default: 'user';
  
}
