import { Injectable } from '@nestjs/common';
import { MailerService as NestMailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailerService {
  constructor(private nestMailerService: NestMailerService) {}
  sendEmail(to: string, token: string) {
    const url = 'https://www.google.com';

    return this.nestMailerService.sendMail({
      to,
      subject: 'Reset Password',
      html: `
            <h1>Reset Password</h1>
            <p>Click on the <a href=${url}>Link</a> to reset your password.</p>
        `,
    });
  }
}
