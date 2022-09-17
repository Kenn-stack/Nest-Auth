import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../services/auth/auth.service";
import { Strategy } from "passport-local";
import { AuthDto } from "../../dtos/User.dto";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt'


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthService){
        super( {usernameField: 'email'})
    }

    async validate(email: string, password: string){
        const user = await this.authService.validateUser({email, password}) 
        console.log(user)
        if(!user){
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }

        const passwordValid = await bcrypt.compare(password, user.password)

        if(!passwordValid){
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }

        return user;
    }
}