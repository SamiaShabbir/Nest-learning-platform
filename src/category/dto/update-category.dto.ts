import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';
export class UpdateCategory {
  @ApiPropertyOptional({
    example: 'approve|reject'})
  status:string;
  @ApiPropertyOptional({
    example: 'cars'})
  title:string;
}
