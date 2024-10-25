import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('users')
export class UserController {
    // we must a guard which check the token and let the request to come here
    @UseGuards(AuthGuard("jwt")) // use AuthGuard from Passport js and gurad for jwt
    @Get("me")
    getMe(@Req() Req:Request){
        // the payload that goes to AuthGuard it will be appended to user request.
        
        return Req.user;
    }
}
