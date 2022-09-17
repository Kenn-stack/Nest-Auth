import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [UserModule, 
            MongooseModule.forRoot('mongodb://localhost:27017'), 
            AuthModule,
            ConfigModule.forRoot({
              isGlobal: true,
            }
            ),
            MailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
