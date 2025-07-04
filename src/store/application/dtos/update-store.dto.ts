import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsArray, IsOptional } from 'class-validator';

export class UpdateStoreDto {
  @ApiPropertyOptional({ description: 'storeID of the store' })
  @IsString()
  @IsOptional()
  storeID: string;

  @ApiPropertyOptional({ description: 'storeName of the store' })
  @IsString()
  @IsOptional()
  storeName: string;

  @ApiPropertyOptional({ description: 'building of the store' })
  @IsString()
  @IsOptional()
  building: string;

  @ApiPropertyOptional({ description: 'floor of the store' })
  @IsString()
  @IsOptional()
  floor: string;

  companyId: string;
}
