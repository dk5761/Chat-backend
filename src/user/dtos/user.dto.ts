import { IsEmail, IsNotEmpty } from 'class-validator';
import { Profile } from '../schemas/profile.schema';

export class UserDto {

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    profile: Profile
}
