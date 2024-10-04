import {MongooseModule} from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Course,CourseSchema } from '../schemas/Course.schema';
import { Lesson, LessonSchema } from '../schemas/Lesson.schema';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { LessonController } from './lesson.controller';
import { LessonService } from './lesson.service';
import { LessonRepositpory } from './repository/lesson.repository';
import { CourseRepository } from './repository/course.repository';
import { AuthService } from 'src/auth/auth.service';
import { AuthRepository } from 'src/auth/repositories/auth.repository';
import { AuthModule } from 'src/auth/auth.module';
import { User, UserSchema } from 'src/schemas/User.schama';
import { Token, TokenSchema } from 'src/schemas/Token.schema';
import { CategoryModule } from 'src/category/category.module';
import { CategoryRepository } from 'src/category/repository/category.repository';
import { Category, CategorySchema } from 'src/schemas/Category.schema';
import { SubCategory, SubCategorySchema } from 'src/schemas/SubCategory';
import { EnrollmentController } from './enrollment.controller';
import { EnrollmentRepository } from './repository/enrollment.respository';
import { EnrollmentService } from './enrollment.service';
import { Enrollment, EnrollmentSchema } from 'src/schemas/Enrollement.schema';

@Module({
    imports:[
        AuthModule,
        CategoryModule,
        MongooseModule.forFeature([
           { name: User.name, schema: UserSchema },
           { name:Token.name,schema:TokenSchema  },
            { name: Course.name, schema: CourseSchema },
            {name:Lesson.name,schema:LessonSchema},
            { name: Category.name, schema:CategorySchema},
            { name:SubCategory.name, schema:SubCategorySchema},
            { name:Enrollment.name,schema:EnrollmentSchema}
          ])
        ],
    providers: [CourseService,LessonService,LessonRepositpory,CourseRepository,EnrollmentRepository,EnrollmentService,AuthService,
      AuthRepository,CategoryRepository],
    controllers: [CourseController,LessonController,EnrollmentController],
    exports:[CourseRepository,CourseService]
})
export class CourseModule {}
