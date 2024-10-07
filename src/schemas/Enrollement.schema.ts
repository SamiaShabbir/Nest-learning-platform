import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './User.schama';
import { Course } from './Course.schema';
import { Lesson } from './Lesson.schema';
@Schema()
export class Enrollment {
  _id: string;
  
  @Prop({ required:false ,default:null ,type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  student: User;

  @Prop({default:0})
  progress:number;
  
  @Prop({default:0})
  lesson_no:number;

  @Prop({default: Date.now})
  enrollmentDate:Date;

  @Prop({ type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]})
  course: Course[];

  @Prop({ type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }]})
  current_lesson: Lesson;

}
export const EnrollmentSchema = SchemaFactory.createForClass(Enrollment);