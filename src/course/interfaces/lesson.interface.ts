import { ObjectId } from "mongoose";

export interface Lesson {
  id?:ObjectId;
  title: string;
  description?: string;
  file?: string; 
  video?: string;
  course?: ObjectId; 
}

