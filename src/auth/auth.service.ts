import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class AuthService{
    constructor(private prisma: PrismaService, private jwt: JwtService, private config:ConfigService){}
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

        return this.signToken(user.id, user.email);
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
            return this.signToken(user.id, user.email);
        } catch(error){
            if(error instanceof PrismaClientKnownRequestError){
                if(error.code === "P2002"){ //prisma Error code
                    throw new ForbiddenException("Credntioal Exists!");
                }
            }

            throw error;
        }
        
    }

    async signToken(userId: number, email: string): Promise<{access_token:string}> {
        // we take token and check id and email for authorization
        // Promise Define what type of data is returing. in this case we return an object with key access_token conatining a string.
        const payload = {
            sub:userId,
            email
        }

        const secret = this.config.get("JWT_SECRET");

        const token = await this.jwt.signAsync(payload, {
            expiresIn: "15m",
            secret: secret
        });

        return {
            access_token: token,
        }

    }
}