import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { Document } from 'mongoose';
import { Profile, ProfileSchema } from './profile.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ unique: true })
  username: string;

  @Prop({
    default:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  })
  profileImageUrl?: string;

  @Prop()
  createdAt?: Date;

  @Prop()
  socketId?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
