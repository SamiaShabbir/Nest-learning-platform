import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { IsUniqueConstraint } from "./shared/validation/is-unique-constraint";
import { BlogModule } from './blog/blog.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './shared/guards/roles.gaurd';
import { LikeModule } from './like/like.module';
import { CourseModule } from './course/course.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CategoryModule } from './category/category.module';
import { SubcategoryService } from './category/subcategory.service';
import { SubcategoryController } from './category/subcategory.controller';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './email/email.module';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { IsAtLeastFiveYearsOld } from './shared/validation/date-validate-constraint';


console.log(join(__dirname, '..', 'src', 'templates'));

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src', 'uploads'),
      serveRoot: '/uploads',
    },
    {
      rootPath: join(__dirname, '..', 'src', 'admin'),
      serveRoot: '/admin',
    },),
    
    MongooseModule.forRoot('mongodb://localhost:27017/learning_platform'),
    UserModule,
    AuthModule,
    BlogModule,
    LikeModule,
    CourseModule,
    CategoryModule,
    ConfigModule.forRoot(),
    EmailModule,
    MailerModule.forRoot({  
      transport: {  
        host: 'smtp.gmail.com',  
        port: Number('587'),  
        secure: false,  
        auth: {  
          user: 'saamieeego1122@gmail.com',  
          pass: 'tzpbmedskifcpfku',  
        },  
      },  
      defaults: {  
        from: '"Learning platform" <info@leaningplaform.com>',  
      },  
      template: {  
        dir: join(__dirname, '..', 'src', 'templates'),
        adapter: new EjsAdapter(),  
        options: {  
          strict: false,  
        },  
      },  
    }),  
  ],
  controllers: [AppController],
  providers: [AppService,IsUniqueConstraint,IsAtLeastFiveYearsOld],
})
export class AppModule {}
