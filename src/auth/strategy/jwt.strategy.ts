
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";

// validation the access token
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(config: ConfigService, private pirsma:PrismaService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get("JWT_SECRET")
        })
    }


    async validate(payload: {sub:number,email:string}){
        // the token will come here in decoded form az object and will be returned and get appended to user request object.
        // now from payload we take the user and return it.
        const user = await this.pirsma.user.findUnique({
            where:{
                id:payload.sub,
            },
        });
        delete user.hash;
        return user
    }
}