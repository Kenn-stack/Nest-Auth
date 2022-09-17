import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import {Injectable, UnauthorizedException, Body} from '@nestjs/common';
import { UserService } from '../../user/services/user/user.service';
import { AuthService } from '../services/auth/auth.service';
require('dotenv').config({path:'.env'})


type JwtPayload = {
    email: string,
    sub: string    
}

 
@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy,"jwt-refreshtoken") {
    constructor(private userService:UserService, private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: process.env.JWT_ACCESS_SECRET,
            passReqToCallback:true
        });
    }
 
    async validate(req: any, payload: JwtPayload) {

        const user = await this.userService.findByEmail(payload.email);
        const token = await this.authService.getToken(user.userId)

        if(!user){
            throw new UnauthorizedException();
        }
        if(req.body.refreshToken != (await token).refreshtoken){
            throw new UnauthorizedException();
        }
        if( new Date() > new Date((await token).refreshtokenexpires)){
            throw new UnauthorizedException();
        }
        return { userId: payload.sub, username: payload.email };
    }
}
