import { Body, Controller, Delete, Get, InternalServerErrorException, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EmailAlreadyExistsError } from '../../../common/exceptions';
import { CreateDto } from '../../../dtos/User.dto';
import { UserService } from '../../services/user/user.service';
import { genToken } from "../../../common/global_functions";
import { MailService } from '../../../mail/mail.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService,
                private readonly mailService: MailService,
                ){}

                

    @Post('signup')
    @UsePipes(ValidationPipe)
    async signUp(@Body() createDto: CreateDto) {
        // check if a user with provided email already exists
        const emailExists = await this.userService.findByEmail(createDto.email)

        if(emailExists){
            throw EmailAlreadyExistsError();
        }

        // create user
        const user = await this.userService.create(createDto)
        
        if(!user.email){
            throw new InternalServerErrorException('User not saved')
        }

        const emailVerifToken = genToken(10, 'hex')
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 1);

        const tokenSaved = await this.userService.saveEmailVerifToken(user.userId, emailVerifToken, expiryDate);

        if(!tokenSaved.veriftoken){
            throw new InternalServerErrorException('verification token not saved')
        }
        
        const sendEmail = await this.mailService.sendUserConfirmation(user, emailVerifToken)

        return user;
    } 


    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    async findOne(@Param('id') id: string){
        return await this.userService.findById(id)
    }


    // @UseGuards(AuthGuard('jwt'))
    @Delete('delete/:id')
    async delete(@Param('id') id: string){
        return await this.userService.delete(id)
    }


    // @UseGuards(AuthGuard('jwt'))
    @Get()
    async index(){
        return await this.userService.index()
    }
}
