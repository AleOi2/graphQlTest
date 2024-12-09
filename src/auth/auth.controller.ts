import { Body, Controller, Post } from '@nestjs/common';
import { AuthDto } from './Dto';
import { AuthService } from './auth.service';
import { UserDto } from 'src/user/Dto/user.dto';

@Controller('/auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('/signin')
    signIn(@Body() body: AuthDto){
        return this.authService.signin(body);
    }

    @Post('/signup')
    signUp(@Body() body: UserDto){
        return this.authService.signup(body);
    }


}
