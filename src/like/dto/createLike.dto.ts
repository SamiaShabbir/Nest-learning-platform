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
    example: '872348394829hhh',
    required: true
 })
  @IsString()
  @IsNotEmpty()
  blogId:string;

}
