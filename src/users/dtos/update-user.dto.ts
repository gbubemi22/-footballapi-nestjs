/* eslint-disable prettier/prettier */
import { IsEmail, IsString, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email: string;

  
  @IsString()
  @IsOptional()
  password: string;

  @IsString()
  @IsOptional()
  phonenumber: number;
  id: string;
}