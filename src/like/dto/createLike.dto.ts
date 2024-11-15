import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreateLike {
  @IsOptional()
  @IsString()
  userId: string;

  @IsString()
  @IsOptional()
  type:string;
  
  @ApiProperty({
    example:"sjdfhjsdf38982232"
  })
  @IsString()
  @IsOptional()
  typeId:string;

  @IsString()
  @IsOptional()
  blogId:string;

  @IsString()
  @IsOptional()
  courseId:string;
}
