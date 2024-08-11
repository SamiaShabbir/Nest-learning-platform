import { IsAlphanumeric, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class AuthPayloadDto {
  @ApiProperty({
    example: 'example.user@gmail.com',
    required: true
 })
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty({
    example: 'password1234',
    required: true
 })
  @IsNotEmpty()
  @IsAlphanumeric()
  password: string;
}
