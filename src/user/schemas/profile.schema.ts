import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProfileDocument = Profile & Document;

@Schema()
export class Profile {

    @Prop()
    username: string

    @Prop()
    profileImage?: string 
    
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);