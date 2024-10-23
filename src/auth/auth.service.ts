import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";


@Injectable()
export class AuthService{
    constructor(private prisma: PrismaService){}
    signin(){
        return {msg : "You are Signed in!"};
    }

    signup(dto:AuthDto){
        // now we have the data and first we must hash the password.
        return {msg : "You are Signed Up!"};
    }
}