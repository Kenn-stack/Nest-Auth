import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthDto, CreateDto } from '../../../dtos/User.dto';
import { User, UserDocument } from '../../../schemas/user.schema';
import * as bcrypt from 'bcrypt'
import { Token, TokenDocument } from '../../../schemas/token.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
                @InjectModel(Token.name) private tokenModel: Model<TokenDocument>) {}


    async create(createDto: CreateDto){
        const hashedPassword =  await bcrypt.hash(createDto.password, 10)
        return await new this.userModel({...createDto, password: hashedPassword}).save();
    }
 
    async findById(id: string){
        return await this.userModel.findById(id).exec();
    }

    async findUser(authDto: AuthDto): Promise<AuthDto>{
        return await this.userModel.findOne({authDto}).select('+password').exec()
    }

    async findByEmail(email: string) {
        return await this.userModel.findOne({email}).exec()
    }

    async delete(id: string){
        return this.userModel.findOneAndDelete({userId: id}).exec()
    }

    async index(){
        return await this.userModel.find().exec()
    }

    async updateEmailVerifToken(userId: string, veriftoken:string, veriftokenexpires: Date){
        return await this.tokenModel.findOneAndUpdate({userId}, {veriftoken, veriftokenexpires})
    }


    async saveEmailVerifToken(userId: string, veriftoken:string, veriftokenexpires: Date){
        return await this.tokenModel.create({userId, veriftoken, veriftokenexpires})
    }


}
