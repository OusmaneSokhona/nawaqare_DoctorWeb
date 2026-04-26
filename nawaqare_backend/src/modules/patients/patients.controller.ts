import { Controller, Get, Post, Put, Body, Param, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { PatientsService } from './patients.service';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { CurrentUser, CurrentUserDto } from '@/common/decorators/current-user.decorator';
import { CreatePatientProfileDto } from './dto/create-patient-profile.dto';

@ApiTags('Patients')
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PATIENT')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get current patient profile' })
  async getMyProfile(@CurrentUser() currentUser: CurrentUserDto) {
    return this.patientsService.getPatientProfile(currentUser.id);
  }

  @Post('profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PATIENT')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Create or update patient profile' })
  async createPatientProfile(
    @Body() createPatientProfileDto: CreatePatientProfileDto,
    @CurrentUser() currentUser: CurrentUserDto,
  ) {
    return this.patientsService.updatePatientProfile(currentUser.id, createPatientProfileDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PATIENT')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Update patient profile' })
  async updatePatientProfile(
    @Param('id') id: string,
    @Body() createPatientProfileDto: CreatePatientProfileDto,
  ) {
    return this.patientsService.updatePatientProfile(id, createPatientProfileDto);
  }

  @Get(':patientId/records')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get complete patient medical record' })
  async getPatientMedicalRecord(@Param('patientId') patientId: string) {
    return this.patientsService.getPatientMedicalRecord(patientId);
  }

  @Get(':patientId/records/timeline')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get patient health events timeline' })
  async getPatientTimeline(
    @Param('patientId') patientId: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('eventType') eventType?: string,
  ) {
    return this.patientsService.getPatientTimeline(patientId, { startDate, endDate, eventType });
  }

  @Get(':patientId/records/vaccinations')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get patient vaccination record' })
  async getPatientVaccinations(@Param('patientId') patientId: string) {
    return this.patientsService.getPatientVaccinations(patientId);
  }

  @Get(':patientId/records/overview')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get 30-second patient overview' })
  async getPatientOverview(@Param('patientId') patientId: string) {
    return this.patientsService.getPatientOverview(patientId);
  }
}
