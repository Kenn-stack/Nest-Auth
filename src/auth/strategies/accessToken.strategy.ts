import { Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
require('dotenv').config({path:'.env'})


type JwtPayload = {
    email: string,
    sub: string    
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt'){
    constructor(){
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          ignoreExpiration: false,
          secretOrKey: process.env.JWT_ACCESS_SECRET,
        });
      }  
      
    validate(payload: JwtPayload) {
        return payload;
    }
    
}