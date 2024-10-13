import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
export class UpdateBlog {

  @ApiPropertyOptional({
    example: 'Blog title'})
   title: string;

  @ApiPropertyOptional({
    example: 'Blog Body'})
  body: any;

  @ApiPropertyOptional({
    example: 'category_id'})
  category: string;

  @ApiPropertyOptional({
    example: ['category_id','another_id']})
  sub_category:[];


  @ApiPropertyOptional({ description: 'Path to the profile pic file', type: 'string', format: 'binary' })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiPropertyOptional({ description: '1|0' })
  @IsNumber()
  status: number;

  @IsString()
  @IsOptional()
  user_id:string;

  subArraycategory:string[];

}
