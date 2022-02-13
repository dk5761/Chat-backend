import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Profile } from '../schemas/profile.schema';

export class UserDto {

    @IsEmail()
    email?: string;

    @IsString()
    password?: string;

    @IsNotEmpty()
    profile: Profile
}
