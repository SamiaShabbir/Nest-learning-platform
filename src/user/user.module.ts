import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from 'src/schemas/User.schama';
import { RoleSchema, Role } from '../schemas/Role.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { AuthRepository } from 'src/auth/repositories/auth.repository';
import { Token,TokenSchema } from 'src/schemas/Token.schema';
import { Like, LikeSchema } from 'src/schemas/Like.schema';
import { BlogLike, BlogLikeSchema } from 'src/schemas/BlogLike.schema';
import { EmailModule } from 'src/email/email.module';
import { EmailService } from '../email/email.service';
import { CourseService } from 'src/course/course.service';
import { CourseModule } from 'src/course/course.module';
import { CategoryModule } from 'src/category/category.module';
import { CategoryRepository } from 'src/category/repository/category.repository';
import { LessonRepositpory } from 'src/course/repository/lesson.repository';
import { Category, CategorySchema } from 'src/schemas/Category.schema';
import { Lesson, LessonSchema } from 'src/schemas/Lesson.schema';
import { LikeModule } from 'src/like/like.module';
import { BlogModule } from 'src/blog/blog.module';
import { Blog, BlogSchema } from 'src/schemas/Blog.schema';
import { BlogService } from 'src/blog/blog.service';

@Module({
  imports: [
    AuthModule,
    EmailModule,
    CourseModule,
    CategoryModule,
    LikeModule,
    BlogModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
      { name: Token.name, schema:TokenSchema},
      { name: Category.name, schema:CategorySchema},
      { name: Lesson.name, schema:LessonSchema},
      { name:Blog.name,schema:BlogSchema}
    ]),
  ],
  providers: [UserService,AuthService,AuthRepository,EmailService,CourseService,CategoryRepository,LessonRepositpory,BlogService],
  controllers: [UserController],
  exports:[UserService]
})
export class UserModule {}
