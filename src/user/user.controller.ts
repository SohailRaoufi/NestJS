import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';

// we must use a guard which check the token and let the request to come here
@UseGuards(JwtGuard) // use AuthGuard from Passport js and gurad for jwt
@Controller('users')
export class UserController {
    @Get("me")
    getMe(@GetUser() user:User){
        // the payload that goes to AuthGuard it will be appended to user request.
        return user;
    }
}
