import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthController } from './controllers/auth/auth.controller';
import { LocalStrategy } from './strategies/LocalStrategy';
import { AuthService } from './services/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/accessToken.strategy';
import { JwtRefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from '../schemas/token.schema';
require('dotenv').config({path:'.env'})


@Module({
  imports: [UserModule,
            PassportModule,
            JwtModule.register({
              secret: process.env.JWT_ACCESS_SECRET,
              signOptions: { expiresIn: '3600s' },
            }),
            MongooseModule.forFeature([{name: Token.name, schema:TokenSchema}]),
          ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshTokenStrategy]
})
export class AuthModule {}
