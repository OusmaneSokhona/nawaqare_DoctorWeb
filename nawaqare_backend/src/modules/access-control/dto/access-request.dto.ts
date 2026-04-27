import { IsString, IsNotEmpty, IsOptional, IsDate, IsEnum, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export enum AccessType {
  READ = 'READ',
  READ_WRITE = 'READ_WRITE',
}

export class CreateAccessRequestDto {
  @IsString()
  @IsNotEmpty()
  patientId: string;

  @IsEnum(AccessType)
  @IsNotEmpty()
  accessType: AccessType;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  scope?: string[];

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  duration?: Date;

  @IsString()
  @IsOptional()
  reason?: string;
}

export class EmergencyAccessDto {
  @IsString()
  @IsNotEmpty()
  patientId: string;

  @IsString()
  @IsNotEmpty()
  justification: string;
}

export class UpdateConsentDto {
  @IsNotEmpty()
  granted: boolean;
}
