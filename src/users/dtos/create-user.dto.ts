/* eslint-disable prettier/prettier */
import { IsString, IsEmail,IsNotEmpty, IsIn, ValidateIf, IsInt,IsNumber } from 'class-validator';
import { UserRole } from '../User.enum';




export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
  fullname: string;


  @IsString()
  @IsNotEmpty()
  username: string;
  
  
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsInt()
  @IsNumber()
  phonenumber: number;
  
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsString()
  @ValidateIf(r => typeof r.role !== 'undefined')
  @IsIn(Object.values(UserRole))
  role: UserRole
  
  
}


