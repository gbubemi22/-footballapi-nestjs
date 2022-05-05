/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEnum, IsOptional, IsDate, IsNumberString } from 'class-validator';
import { Document } from 'mongoose';
import { UserRole } from '../User.enum';

export type UserDocument  = User & Document;

@Schema()
export class User {
  
  @Prop({required: true})
  fullname: string;

  @Prop({required: true, unique: true})
  username: string;

  @Prop({required: true})
  email: string;

  @Prop({required: true})
  @IsNumberString()
  phonenumber: number;

  @Prop({required: true})
  password: string;

  @Prop({default: "USER"})
  @IsOptional()
  @IsEnum(UserRole)
  role:UserRole

  @IsDate()
  createDate: Date;
  
}

export const UserSchema = SchemaFactory.createForClass(User);
