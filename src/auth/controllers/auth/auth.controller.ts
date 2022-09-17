import { Body, Controller, Get, InternalServerErrorException, Param, Post, Request, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../../../user/services/user/user.service';
import { AuthService } from '../../services/auth/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private userService: UserService,
                private authService: AuthService){}

    @UseGuards(AuthGuard('local'))
    @Get('login')
    async login(@Request() req: any){
        return await this.authService.login(req.user)
    }


    @UseGuards(AuthGuard('jwt-refreshtoken'))
    @Post('auth/refreshtoken')
    async refreshToken(@Request() req: any){
        return await this.authService.login(req.user);
    }

    @Post('auth/verify-email/:token')
    async verifyEmail(@Param('token') token: string){
        const dbtoken = this.authService.findEmailVerifToken(token)
        if(!dbtoken){
            throw new InternalServerErrorException('Email token not found')
        }
        return true;
    }

}