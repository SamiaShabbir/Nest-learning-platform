import {
  IsAlphanumeric ,
  IsEmail ,
  IsNotEmpty ,
  IsNumber ,
  IsString , Validate ,
} from 'class-validator';
import { IsUnique } from "../../shared/validation/is-unique";

const Model="User";
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsUnique({tableName:Model})
  username: string;
  @IsNotEmpty()
  @IsAlphanumeric()
  password: string;
  @IsNotEmpty()
  @IsEmail()
  // @Validate(IsUniqueConstraint)
  @IsUnique({tableName:Model})
  email: string;
  @IsNotEmpty()
  @IsString()
  @IsUnique({tableName:Model})
  
  first_name: string;
  @IsNotEmpty()
  @IsString()
  @IsUnique({tableName:Model})
  
  last_name: string;
  @IsNotEmpty()
  DoB: string;
  @IsNotEmpty()
  @IsNumber()
  age: number;
  @IsNotEmpty()
  @IsString()
  role_id: string;
}