import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginPasswordDto {
  @ApiProperty({
    description: 'Email (ex. dr.diallo@nawaqare.sn) or phone in E.164 (ex. +221771000001)',
    example: 'dr.diallo@nawaqare.sn',
  })
  @IsString()
  @IsNotEmpty()
  identifier!: string;

  @ApiProperty({ description: 'Account password', minLength: 8, example: 'TestNawaqare2024!' })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  password!: string;
}
