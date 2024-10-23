import { Injectable } from "@nestjs/common";


@Injectable({})
export class AuthService{
    signin(){
        return {msg : "You are Signed in!"};
    }

    signup(){
        return {msg : "You are Signed Up!"};
    }
}