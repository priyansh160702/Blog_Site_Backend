import { Injectable } from '@nestjs/common';
import { MailerService as NestMailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailerService {
  constructor(private nestMailerService: NestMailerService) {}
  sendEmail(to: string, subject: string, html: string) {
    return this.nestMailerService.sendMail({
      to,
      subject,
      html,
    });
  }
}
