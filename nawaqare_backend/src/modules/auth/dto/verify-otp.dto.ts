import { IsString, IsNotEmpty, IsOptional, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyOtpDto {
  @ApiProperty({ description: 'Registration ID from register/login response', example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsString()
  @IsNotEmpty()
  registration_id!: string;

  @ApiProperty({ description: 'OTP code', example: '123456' })
  @IsString()
  @Length(6, 6)
  @IsNotEmpty()
  code!: string;

  @ApiProperty({ description: 'First name (for new users)', example: 'John', required: false })
  @IsString()
  @IsOptional()
  first_name?: string;

  @ApiProperty({ description: 'Last name (for new users)', example: 'Doe', required: false })
  @IsString()
  @IsOptional()
  last_name?: string;
}
