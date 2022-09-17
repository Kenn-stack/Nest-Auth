import { ConflictException } from "@nestjs/common"


export const EmailAlreadyExistsError = () =>{
    return new ConflictException('Email already exists')
}