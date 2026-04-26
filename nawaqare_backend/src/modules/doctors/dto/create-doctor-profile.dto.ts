import { IsString, IsNumber, IsOptional, IsArray, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateDoctorProfileDto {
  @ApiProperty({ description: 'ONMC (Ordre National des Médecins du Chili) number' })
  @IsString()
  onmc_number!: string;

  @ApiProperty({ description: 'Medical specialty' })
  @IsString()
  specialty!: string;

  @ApiProperty({ description: 'Consultation tariff in XOF' })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  tarif_xof!: number;

  @ApiPropertyOptional({ description: 'Doctor bio/about' })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiPropertyOptional({ description: 'Languages spoken' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  languages?: string[];

  @ApiPropertyOptional({ description: 'Consultation modes (VIDEO, IN_PERSON, HOME_VISIT)' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  consultation_modes?: string[];
}
