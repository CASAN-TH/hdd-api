import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsArray } from 'class-validator';

export class CreateMedDto {
   @ApiProperty({ description: 'ID of the med' })
  @IsString()
  medID: string;

   @ApiProperty({ description: 'Name of the med' })
  @IsString()
  medName: string;

   @ApiProperty({ description: 'ID of the store' })
  @IsString()
  storeID: string;

   @ApiProperty({ description: 'Location of the med' })
  @IsString()
  location: string;


}