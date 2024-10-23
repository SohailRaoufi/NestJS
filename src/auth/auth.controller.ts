import { Controller, Get } from "@nestjs/common";
import { AuthService } from "./auth.service";



@Controller('auth')
export class AuthController{
    constructor(private authservice: AuthService){}
    @Get("signin")
    signin(){
        return this.authservice.signin();
    }


    @Get("signup")
    signup(){
        return this.authservice.signup();
    }
}