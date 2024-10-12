import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('email')
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  async sendEmail(@Body() emailData: { to: string; subject: string; template: string; context: any }) {
    const emaildata= {email:'samiashabbir987@gmail.com',name:"samiashabbir"};
    return this.emailService.welcomeEmail(emaildata);
  }
}
