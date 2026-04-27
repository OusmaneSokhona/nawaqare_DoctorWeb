import { IsString, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
  PATIENT = 'PATIENT',
  DOCTOR = 'DOCTOR',
  PHARMACIST = 'PHARMACIST',
  ADMIN = 'ADMIN',
}

export class RegisterDto {
  @ApiProperty({ description: 'Phone number', example: '+221771234567' })
  @IsString()
  @IsNotEmpty()
  phone!: string;

  @ApiProperty({
    description: 'User role',
    enum: UserRole,
    example: UserRole.PATIENT,
  })
  @IsEnum(UserRole)
  @IsNotEmpty()
  role!: UserRole;

  @ApiProperty({ description: 'First name (optional)', example: 'John', required: false })
  @IsString()
  @IsOptional()
  first_name?: string;

  @ApiProperty({ description: 'Last name (optional)', example: 'Doe', required: false })
  @IsString()
  @IsOptional()
  last_name?: string;
}
