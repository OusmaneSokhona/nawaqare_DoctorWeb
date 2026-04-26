import { Controller, Get, Post, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { VaccinationsService } from './vaccinations.service';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';

@ApiTags('Vaccinations')
@Controller('vaccinations')
export class VaccinationsController {
  constructor(private readonly vaccinationsService: VaccinationsService) {}

  @Get('patient/:patientUuid')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get vaccination history' })
  async getVaccinationHistory(@Param('patientUuid') patientUuid: string) {
    const vaccinations = await this.vaccinationsService.getVaccinationHistory(patientUuid);
    return { data: vaccinations };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Add vaccination record' })
  async addVaccination(@Body() body: any) {
    const vaccination = await this.vaccinationsService.addVaccination(body.patient_uuid, body);
    return { data: vaccination };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Update vaccination record' })
  async updateVaccination(@Param('id') id: string, @Body() body: any) {
    const vaccination = await this.vaccinationsService.updateVaccination(id, body);
    return { data: vaccination };
  }
}
