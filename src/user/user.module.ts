import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './controllers/user/user.controller';
import { User, UserSchema } from '../schemas/user.schema';
import { UserService } from './services/user/user.service';
import { MailModule } from '../mail/mail.module';
import { Token, TokenSchema } from '../schemas/token.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: User.name, schema:UserSchema}, {name: Token.name, schema:TokenSchema}]), MailModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
