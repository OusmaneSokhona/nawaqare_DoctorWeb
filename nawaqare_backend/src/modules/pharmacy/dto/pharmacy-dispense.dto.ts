import { IsUUID, IsNumber, IsOptional, IsString, IsBoolean, IsArray, ValidateNested } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class DispenseLine {
  @ApiProperty({ description: 'Prescription line ID' })
  @IsUUID()
  prescriptionLineId!: string;

  @ApiProperty({ description: 'Quantity delivered' })
  @IsNumber()
  quantityDelivered!: number;

  @ApiPropertyOptional({ description: 'Optional pharmacist notes' })
  @IsOptional()
  @IsString()
  pharmacistNotes?: string;
}

export class PharmacyDispenseDto {
  @ApiProperty({ description: 'Lines to dispense', type: [DispenseLine] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DispenseLine)
  lines!: DispenseLine[];
}

export class PharmacyRejectDto {
  @ApiProperty({ description: 'Rejection reason' })
  @IsString()
  reason!: string;
}

export class PharmacySubstitutionDto {
  @ApiProperty({ description: 'Original prescription line ID' })
  @IsUUID()
  originalLineId!: string;

  @ApiProperty({ description: 'Substituted drug name' })
  @IsString()
  substitutedDrugName!: string;

  @ApiProperty({ description: 'Substituted DCI (active substance)' })
  @IsString()
  substitutedDci!: string;

  @ApiProperty({ description: 'Patient has consented to substitution' })
  @IsBoolean()
  patientConsented!: boolean;
}

export class UpdatePharmacyProfileDto {
  @ApiPropertyOptional({ description: 'Pharmacy name' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Pharmacy address' })
  @IsOptional()
  @IsString()
  address?: string;
}
