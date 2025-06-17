import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsArray, IsBoolean } from 'class-validator';

export class CreateStoreDto {
  @ApiProperty({ description: 'storeID of the store' })
  @IsString()
  storeID: string;

   @ApiProperty({ description: 'storeName of the store' })
  @IsString()
   storeName: string;
   
  @ApiProperty({ description: 'buiding of the store' })
  @IsString()
  buiding: string;

  @ApiProperty({ description: 'Floor of the store' })
  @IsString()
  floor: string;

 
}