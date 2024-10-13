import {
  IsAlphanumeric ,
  IsArray,
  IsEmail ,
  IsEnum,
  IsNumber ,
  IsOptional,
  IsString , Validate ,
} from 'class-validator';
import { IsUnique } from "../../shared/validation/is-unique";
import { ApiPropertyOptional, ApiQuery } from '@nestjs/swagger';
import { Role } from 'src/enums/role.enum';
import { Query } from '@nestjs/common';
const Model="User";
export class UpdateUserDto {
  @ApiPropertyOptional({
    example: 'myname',
    required: true
 })

  @IsString()
  @IsUnique({tableName:Model})
  username: string;
  @ApiPropertyOptional({
    example: 'password1234',
    required: true
 })

  @IsAlphanumeric()
  password: string;
 
  @IsEmail()
  @ApiPropertyOptional({
    example: 'example.user@gmail.com',
    required: true
 })
  // @Validate(IsUniqueConstraint)
  @IsUnique({tableName:Model})
  email: string;

  @IsString()
  @IsUnique({tableName:Model})
  @ApiPropertyOptional({
    example: 'Marcelo',
    required: true
 })
  first_name: string;

  @IsString()
  @IsUnique({tableName:Model})
  @ApiPropertyOptional({
    example: 'Meeks',
    required: true
 })
  last_name: string;

  @ApiPropertyOptional({
    example: '12/3/2000',
    required: true
 })
  DoB: string;
  @ApiPropertyOptional({
    example: '12',
    required: true
 })
  @IsString()
  age: string;
  // @ApiPropertyOptional({
  //   type: 'array',
  //   items: {
  //     Role
  //   },
  // })
  // role: Role;
  // @ApiPropertyOptional({
  //   example: ['admin', 'user'],
  //   description: 'Array of roles',
  //   type: 'array',
  //   items: {
  //     type: 'string',
  //     enum: Object.values(Role), // Convert enum to an array of values
  //   },
  //   required: false,
  // })
  // @IsOptional()
  // @IsArray()
  // @IsEnum(Role, { each: true })
  // role?: Role;
 
  @ApiPropertyOptional({
    example: 'hello world!',
    required: true
 })

  @IsString()
  description: string;

  @ApiPropertyOptional({ description: 'Path to the profile pic file', type: 'string', format: 'binary' })
  @IsString()
  @IsOptional()
  picture?: string;

  @ApiPropertyOptional({ description: 'Path to the cv file', type: 'string', format: 'binary' })
  @IsString()
  @IsOptional()
  cv?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  gender?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  education_level?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  specialization?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  confirm_password?: string;
  
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  contact_number:number;
}
