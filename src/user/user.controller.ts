import { Body, Controller, Post, Get, Req, UseGuards } from '@nestjs/common';
import {  UserIdDto } from './Dto/user.dto';
import { ApiBody, ApiOperation, ApiProperty, ApiResponse } from '@nestjs/swagger';
import { UserRepository } from './user.dbinterface';
import { AuthGuard } from 'src/auth/auth.guard';
import  { Request,  } from 'express';

class GetUserResponse{
    @ApiProperty({example: 1})
    id: number
    @ApiProperty({example: 'Alexandre'})
    name: string
    @ApiProperty({example: 'alexandre.jtsubaki@gmail.com'})
    email: string
    @ApiProperty({example: 'argon...'})
    password: string
    @ApiProperty({example: '2023-08-04T15:29:12.284Z'})
    createdAt: Date
}

interface UserRequest extends Request{
    user:{
        id: number;
        name: string;
        email: string;
        password: string;
        createdAt: Date;
    }

}


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserRepository) { }

    // @Post()
    // async createUser(@Body() body: UserDto){
    //     await this.userService.createUser({
    //         name: body.name,
    //         password: body.password,
    //         email: body.email
    //     });
    //     console.log(await this.userService.users({
    //         where: {
    //             name: 'Alexandre'
    //         }
    //     }))
    //     return 'ok';
    // }

    // @Post('/get_user')
    // @UseGuards(AuthGuard)
    // @ApiOperation({ summary: 'Find User by Id' })
    // @ApiBody({ type: UserIdDto })
    // @ApiResponse({ status: 200, description: 'Find User by Id', type: GetUserResponse})
    // async findUser(@Body() body: UserIdDto, @Req() request: Request) {
    //     console.log('request.user')
    //     console.log(request.user)
    //     return await this.userService.findByUser({
    //         name: body.name
    //     });

    // }

    @Get('/get_user')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Find by Token' })
    @ApiResponse({ status: 200, description: 'Find User by Id', type: GetUserResponse})
    async findUser(@Req() request: UserRequest) {
        return await this.userService.findByUser({
            name: request.user.name
        });

    }


}
