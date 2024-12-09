import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, isEmail } from 'class-validator';

export class UserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;


}

export class UserIdDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: 'Alexandre', })
    name: string;

}