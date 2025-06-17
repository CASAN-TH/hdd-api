import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsArray, IsOptional } from 'class-validator';

export class UpdateMedDto {

  @ApiPropertyOptional({ description: 'ID of the med' })
  @IsString()
  @IsOptional()
  medID: string;

  @ApiPropertyOptional({ description: 'Name of the med' })
  @IsString()
  medName: string;

  @ApiPropertyOptional({ description: 'ID of the store' })
  @IsString()
  storeID: string;

  @ApiPropertyOptional({ description: 'location of the med' })
  @IsString()
  location: number;
}
