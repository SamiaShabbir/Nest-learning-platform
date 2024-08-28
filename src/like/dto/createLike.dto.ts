import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreateLike {
  @IsOptional()
  @IsString()
  userId: string;

  @IsString()
  @IsOptional()
  type:string;
  
  @IsString()
  @IsOptional()
  type_id:string;

}
