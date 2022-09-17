import { Injectable } from '@nestjs/common';
import { User } from '../../../schemas/user.schema';
import { AuthDto } from '../../../dtos/User.dto';
import { UserService } from '../../../user/services/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { genToken } from '../../../common/global_functions';
import { Token, TokenDocument } from '../../../schemas/token.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class AuthService {
    constructor(private userService: UserService, 
                private jwtService: JwtService,
                @InjectModel(Token.name) private tokenModel: Model<TokenDocument>) {}

    async validateUser(authDto: AuthDto){
        return  await this.userService.findUser(authDto)
    }

    async login(user: User){
        const payload = {email: user.email, sub: user.userId}
        return {
            access_token: this.jwtService.sign(payload),
            refresh_token: await this.generateRefreshToken(user.userId)
        }
    }

    async generateRefreshToken(userId: string):  Promise<string>{
        const refreshToken = genToken(16, "hex");
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 6);
        await this.updateRefreshToken(refreshToken, userId, expiryDate);
        return refreshToken
    }

    async updateRefreshToken(refreshtoken:string, userId:string, refreshtokenexpires: Date){
        return await this.tokenModel.findOneAndUpdate({userId}, {refreshtoken, refreshtokenexpires})
    }

    async updateEmailVerifToken(userId: string, veriftoken:string, veriftokenexpires: Date){
        return await this.tokenModel.findOneAndUpdate({userId}, {veriftoken, veriftokenexpires})
    }

    async getToken(userId: string){
        return await this.tokenModel.findOne({userId})
    }

    async findEmailVerifToken(veriftoken: string){
        return await this.tokenModel.findOne({veriftoken})
    }



    
}
