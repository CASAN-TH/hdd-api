import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class SignInDto {
  @ApiProperty({ description: 'mail of the user' })
  @IsString()
  @IsNotEmpty({ message: 'mail is required' })
  @MinLength(3)
  mail: string;

  @ApiProperty({ description: 'Password of the user' })
  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6)
  @MaxLength(20)
  password: string;
}
