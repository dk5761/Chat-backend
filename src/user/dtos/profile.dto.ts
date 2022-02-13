import {IsOptional, IsString } from 'class-validator';

export class ProfileDTO {

    @IsString()
    @IsOptional()
    username: string;

    @IsString()
    @IsOptional()
    profileImage: string;

}
