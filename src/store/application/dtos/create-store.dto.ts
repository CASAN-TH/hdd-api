import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsArray, IsBoolean } from 'class-validator';

export class CreateStoreDto {
  @ApiProperty({ description: 'Name of the store' })
  @IsString()
  name: string;

   @ApiProperty({ description: 'ID of the store' })
  @IsString()
   location: string;
  @ApiProperty({ description: 'ID of the store' })
  @IsString()
  type: string;
  @ApiProperty({ description: 'ID of the company' })
  @IsBoolean()
  active: boolean;
}