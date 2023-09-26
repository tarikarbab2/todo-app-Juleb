import {IsString,IsEmail} from 'class-validator'

export class CreatUserDto{
    @IsEmail()
    email:string;
    @IsString()
    name:string
    @IsString()
    password:string;
}