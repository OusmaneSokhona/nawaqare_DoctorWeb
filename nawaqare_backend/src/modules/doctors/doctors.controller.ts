import { Controller, Get, Post, Put, Body, Param, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { DoctorsService } from './doctors.service';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { CurrentUser, CurrentUserDto } from '@/common/decorators/current-user.decorator';
import { CreateDoctorProfileDto } from './dto/create-doctor-profile.dto';
import { UpdateDoctorProfileDto } from './dto/update-doctor-profile.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';

@ApiTags('Doctors')
@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Get()
  @ApiOperation({ summary: 'List all doctors' })
  async getDoctors(@Query() pagination: PaginationDto, @Query('specialization') specialization?: string) {
    return this.doctorsService.getDoctors(pagination, specialization);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search doctors by name or specialization' })
  async searchDoctors(
    @Query('q') query: string,
    @Query() pagination: PaginationDto,
  ) {
    return this.doctorsService.searchDoctors(query, pagination);
  }

  @Get('dashboard/stats')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DOCTOR')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Dashboard KPIs (appointments, patients, pending bookings, completed consultations)' })
  async getDashboardStats(@CurrentUser() currentUser: CurrentUserDto) {
    return this.doctorsService.getDashboardStats(currentUser.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get doctor profile' })
  async getDoctorProfile(@Param('id') id: string) {
    return this.doctorsService.getDoctorById(id);
  }

  @Post('profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DOCTOR')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Create doctor profile' })
  async createDoctorProfile(
    @Body() createDoctorProfileDto: CreateDoctorProfileDto,
    @CurrentUser() currentUser: CurrentUserDto,
  ) {
    return this.doctorsService.createDoctorProfile(currentUser.id, createDoctorProfileDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DOCTOR')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Update doctor profile' })
  async updateDoctorProfile(
    @Param('id') id: string,
    @Body() updateDoctorProfileDto: UpdateDoctorProfileDto,
    @CurrentUser() currentUser: CurrentUserDto,
  ) {
    return this.doctorsService.updateDoctorProfile(id, updateDoctorProfileDto, currentUser.id);
  }
}
