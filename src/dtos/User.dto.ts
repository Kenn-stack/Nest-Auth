import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";


export class BaseDto{

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(5)
    password: string;
}

export class CreateDto extends BaseDto{

    @IsNotEmpty()
    firstname: string;

    @IsNotEmpty()
    lastname: string;

    @IsNotEmpty()
    @MaxLength(11)
    @MinLength(11)
    phone: string;
}

export class AuthDto extends BaseDto{}