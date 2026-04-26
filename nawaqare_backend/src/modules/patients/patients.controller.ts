import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
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
}
