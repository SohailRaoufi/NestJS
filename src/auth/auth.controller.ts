import { Body, Controller, Get, ParseIntPipe, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";



@Controller('auth')
export class AuthController{
    constructor(private authservice: AuthService){}
    @Get("signin")
    signin(){
        return this.authservice.signin();
    }


    @Post("signup")
    signup(@Body() dto:AuthDto){
        return this.authservice.signup(dto);
    }
}