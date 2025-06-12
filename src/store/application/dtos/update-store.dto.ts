import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsArray, IsOptional } from 'class-validator';

export class UpdateStoreDto {
  @ApiPropertyOptional({ description: 'Name of the store' })
  @IsString()
  @IsOptional()
  name: string;

  companyId: string;
}
