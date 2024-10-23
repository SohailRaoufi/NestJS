import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { error } from "console";


@Injectable()
export class AuthService{
    constructor(private prisma: PrismaService){}
    async signin(dto:AuthDto){
        // find user
        const user = await this.prisma.user.findUnique({
            where:{
                email:dto.email,
            }
        })
        const verify = await argon.verify(user.hash, dto.password);

        if(!user){
            throw new ForbiddenException("Wrong Crediential!");
        }
        if(!verify){
            throw new ForbiddenException("Crediential Incorrect!");
        }

        return `Signed In, Welcome ${user.email.split("@")[0]}`;
    }

    async signup(dto:AuthDto){
        // now we have the data and first we must hash the password.

        // generate Password has
        const hash = await argon.hash(dto.password);

        // save the new user in db
        try {
            const user = await this.prisma.user.create({
                data:{
                    email:dto.email,
                    hash,
                },
                select:{ // only returns the seleceted fileds like filter.
                    id:true,
                    email:true,
                    createdAt:true,
                }
            })
            return user;
        } catch(error){
            if(error instanceof PrismaClientKnownRequestError){
                if(error.code === "P2002"){ //prisma Error code
                    throw new ForbiddenException("Credntioal Exists!");
                }
            }

            throw error;
        }
        
    }
}