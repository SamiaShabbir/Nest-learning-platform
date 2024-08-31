import {MongooseModule} from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Course,CourseSchema } from '../schemas/Course.schema';
import { CourseLike, CousreLikeSchema } from '../schemas/CourseLike.schema';
import { Lesson, LessonSchema } from '../schemas/Lesson.schema';
import { Like, LikeSchema } from 'src/schemas/Like.schema';
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

@Module({
    imports:[
        AuthModule,
        MongooseModule.forFeature([
           { name: User.name, schema: UserSchema },
           { name:Token.name,schema:TokenSchema  },
            { name: Course.name, schema: CourseSchema },
            {name:Lesson.name,schema:LessonSchema},
          ])
        ],
    providers: [CourseService,LessonService,LessonRepositpory,CourseRepository,  AuthService,
      AuthRepository],
    controllers: [CourseController,LessonController],
    exports:[CourseRepository,CourseService]
})
export class CourseModule {
    
}
