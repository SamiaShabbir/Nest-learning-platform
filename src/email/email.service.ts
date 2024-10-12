import { MailerService } from '@nestjs-modules/mailer';  
import { Injectable } from '@nestjs/common';
  
interface Email {  
  to: string;  
  data: any;  
}  
  
@Injectable()
export class EmailService {  
  
constructor(private readonly mailerService: MailerService) {
    console.log('MailerService:', mailerService); // Add this line
}  
  
  async welcomeEmail(data) {
  
    const { email, name } = data;  
    const subject = `Welcome to Leaning Platform: ${name}`;  
    let page='';
    if(data.type=='teacherwelcome'){
     page='./welcome';
    }
    else if(data.type=="studentwelcome")
    {
      page='./student-welcome';

    }else if(data.type=="verificationsucessfull"){
      page='./verification-teacher';

    }else if(data.type=="course"){
      page='./course';
    }
    await this.mailerService.sendMail({  
      to: email,  
      subject,  
      template: page,  
      context: {  
        'name':name,
        'Link':'http://localhost:3000',
        'courseTitle':data.title || null
      }, 
    });  

    return true;


  }  
}
