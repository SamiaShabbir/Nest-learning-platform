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
import { MailerModule } from './mailer/mailer.module';
import { ConfigModule } from '@nestjs/config';
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
    MailerModule,
    ConfigModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService,IsUniqueConstraint],
})
export class AppModule {}
