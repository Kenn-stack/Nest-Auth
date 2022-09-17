import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { genToken } from "../common/global_functions";


export type UserDocument = User & Document;


@Schema()
export class User{

    @Prop({required: true, unique: true, default: genToken(16, "hex")})
    userId: string;

    @Prop({required: true})
    firstname: string;

    @Prop({required: true})
    lastname: string;
   
    @Prop({required: true})
    phone: string;

    @Prop({unique: true, required: true})
    email: string;

    @Prop({required: true, select: false})
    password: string; 
      
}


export const UserSchema = SchemaFactory.createForClass(User)