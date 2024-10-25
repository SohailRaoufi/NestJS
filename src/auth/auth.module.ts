import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategy";

// we JwtModule for Auth and Passport Js JWT.

@Module({
    imports:[JwtModule.register({})], // register jwt.
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy]
})
export class AuthModule {}