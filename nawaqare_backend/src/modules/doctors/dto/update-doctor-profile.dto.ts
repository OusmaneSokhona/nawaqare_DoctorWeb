import { IsOptional, IsString, IsNumber, IsArray, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateDoctorProfileDto {
  @ApiPropertyOptional({ description: 'Doctor bio' })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiPropertyOptional({ description: 'Consultation tariff in XOF' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  tarif_xof?: number;

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
