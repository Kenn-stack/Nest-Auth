import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../schemas/user.schema';
import { ConfigService }  from '@nestjs/config';

@Injectable()
export class MailService {

    constructor(private mailerService: MailerService, private config: ConfigService) {}

    async sendUserConfirmation(user: User, token: string) {

        // const url = `localhost:3000/auth/confirm?token=${token}`;

        // const details = {
        //     to: user.email,
        //     subject: 'Welcome to Samaha App! Confirm your Email',
        //     template: './confirmation', 
        //     context: { 
        //         name: user.firstname,
        //         url,
        //     },
        // }

        // await this.mailerService.sendMail(details);


        const mailjet = require ('node-mailjet')
        .connect(this.config.get('MAILJET_PUB_KEY'), this.config.get('MAILJET_SECRET_KEY'))
        const request = mailjet
        .post("send", {'version': 'v3.1'})
        .request({
        "Messages":[
            {
            "From": {
                "Email": "samaha@gmail.com",
                "Name": "Samaha"
            },
            "To": [
                {
                "Email": "agwuekene@gmail.com",
                "Name": "Ekene"
                }
            ],
            "Subject": "Welcome.",
            "TextPart": " Verify your E-mail",
            "HTMLPart": "<h3>Click the link to verify your email and you are all set up <a href='http://localhost:3000/auth/verify-email/token/'>Mailjet</a>!</h3>",
            "CustomID": "EmailVerification"
            }
        ]
        })
        request
        .then((result) => {
            console.log(result.body)
        })
        .catch((err) => {
            console.log(err.statusCode)
        })

        
    }
}


