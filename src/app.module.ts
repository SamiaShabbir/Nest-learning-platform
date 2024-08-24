import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { IsUniqueConstraint } from "./shared/validation/is-unique-constraint";
import { BlogModule } from './blog/blog.module';
import { ViewModule } from './view/view.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/learning_platform'),
    UserModule,
    AuthModule,
    BlogModule,
    ViewModule,
  ],
  controllers: [AppController],
  providers: [AppService,IsUniqueConstraint],
})
export class AppModule {}
