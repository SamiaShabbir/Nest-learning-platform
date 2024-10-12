import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeRepository } from './repository/like.respository';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { BlogLike, BlogLikeSchema } from 'src/schemas/BlogLike.schema';
import { Like, LikeSchema } from 'src/schemas/Like.schema';
import { Role, RoleSchema } from 'src/schemas/Role.schema';
import { Token, TokenSchema } from 'src/schemas/Token.schema';
import { User, UserSchema } from 'src/schemas/User.schama';
import { LikeController } from './like.controller';
import { BlogModule } from 'src/blog/blog.module';
import { BlogRepository } from 'src/blog/repositroy/blog.repository';
import { BlogService } from 'src/blog/blog.service';
import { Blog, BlogSchema } from 'src/schemas/Blog.schema';
import { CourseLike, CousreLikeSchema } from 'src/schemas/CourseLike.schema';
import { CourseModule } from 'src/course/course.module';
import { CourseService } from 'src/course/course.service';
import { CourseRepository } from 'src/course/repository/course.repository';
import { Course, CourseSchema } from 'src/schemas/Course.schema';
import { Category, CategorySchema } from 'src/schemas/Category.schema';
import { SubCategory, SubCategorySchema } from 'src/schemas/SubCategory';
import { CategoryRepository } from 'src/category/repository/category.repository';
import { CategoryModule } from 'src/category/category.module';
import { EmailModule } from 'src/email/email.module';
import { EmailService } from 'src/email/email.service';
import { LessonRepositpory } from 'src/course/repository/lesson.repository';
import { Lesson, LessonSchema } from 'src/schemas/Lesson.schema';

@Module({
  imports: [
    AuthModule,
    BlogModule,
    CourseModule,
    CategoryModule,
    EmailModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
      { name: Token.name, schema:TokenSchema },
      { name: Blog.name, schema:BlogSchema },
      { name:Course.name, schema:CourseSchema },
      {
        name: Like.name,
        schema: LikeSchema,
        discriminators: [
          { name: BlogLike.name, schema: BlogLikeSchema },
          { name: CourseLike.name, schema: CousreLikeSchema }
        ],
      },
      { name: Category.name, schema:CategorySchema},
      { name:SubCategory.name, schema:SubCategorySchema},
      { name:Lesson.name,schema:LessonSchema  }
    ]),
  ],
  providers: [ LikeService,
               LikeRepository,
               BlogRepository,
               BlogService,
               CourseService,
               CourseRepository,
               CategoryRepository,
               EmailService,
               LessonRepositpory
             ],
  exports:[LikeService,LikeRepository],
  controllers: [LikeController]
})
export class LikeModule {}
