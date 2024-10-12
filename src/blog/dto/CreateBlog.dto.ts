import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreateBlog {

  @ApiProperty({
    example: 'Blog title'})
  @IsNotEmpty()
   title: string;

  @ApiProperty({
    example: 'Blog Body'})
  @IsNotEmpty()
  body: any;

  @ApiProperty({
    example: 'category_id'})
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    example: ['category_id','another_id']})
  @IsNotEmpty()
  sub_category:[];


  @ApiPropertyOptional({ description: 'Path to the profile pic file', type: 'string', format: 'binary' })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({ description: '1|0' })
  @IsNumber()
  @IsNotEmpty()
  status: number;

  @IsString()
  @IsOptional()
  user_id:string;

  subArraycategory:string[];

}
