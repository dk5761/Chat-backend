import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { Document } from 'mongoose';
import { Profile, ProfileSchema } from './profile.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ type: ProfileSchema, required: true })
  @Type(() => Profile)
  profile: Profile;

  @Prop()
  createdAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
