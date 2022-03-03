import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  username: string;

  expoPushToken?: string;
}
