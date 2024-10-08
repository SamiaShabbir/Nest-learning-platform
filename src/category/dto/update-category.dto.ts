import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateCategory {
  @ApiProperty({
    example: 'approve|reject'})
  @IsNotEmpty()
  @IsEmail()
  status:string;
}
