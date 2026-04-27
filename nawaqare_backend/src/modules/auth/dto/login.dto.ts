import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'Phone number', example: '+221771234567' })
  @IsString()
  @IsNotEmpty()
  phone!: string;
}
