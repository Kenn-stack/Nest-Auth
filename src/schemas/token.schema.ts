import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, ObjectId } from "mongoose";
import { User, UserSchema } from "./user.schema";


export type TokenDocument = Token & Document;


@Schema()
export class Token{
    

    @Prop({required: true, type: mongoose.Schema.Types.String, ref: User.name})
    userId: string;

    //  refresh token for jwt strategy
    @Prop()
    refreshtoken: string; 

    @Prop()
    refreshtokenexpires: Date;

    // email verification token
    @Prop()
    veriftoken: string;

    @Prop()
    veriftokenexpires: Date;



    
}


export const TokenSchema = SchemaFactory.createForClass(Token)