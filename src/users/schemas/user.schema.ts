/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument  = User & Document;

@Schema()
export class User {
  
  @Prop({required: true})
  fullname: string;

  @Prop({required: true})
  username: string;

  @Prop({required: true})
  email: string;

  @Prop({required: true})
  phonenumber: number;

  @Prop({required: true})
  password: string;

  isString()
  role: {
    enum: ['superAdmin', 'admin', 'user'];
    default: 'user';
  };
}

export const UserSchema = SchemaFactory.createForClass(User);
