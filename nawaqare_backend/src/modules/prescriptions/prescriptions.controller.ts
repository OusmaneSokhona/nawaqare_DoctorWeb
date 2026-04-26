import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { PrescriptionsService } from './prescriptions.service';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';

@ApiTags('Prescriptions')
@Controller('prescriptions')
export class PrescriptionsController {
  constructor(private readonly prescriptionsService: PrescriptionsService) {}

  @Get('qr/:qrToken')
  @ApiOperation({ summary: 'Get prescription by QR token' })
  async getPrescriptionByQr(@Param('qrToken') qrToken: string) {
    const prescription = await this.prescriptionsService.getPrescriptionByQrToken(qrToken);
    return { data: prescription };
  }

  @Post('consultations/:consultationId/prescriptions')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Create prescription' })
  async createPrescription(@Param('consultationId') consultationId: string, @Body() body: any) {
    const prescription = await this.prescriptionsService.createPrescription(consultationId, body);
    return { data: prescription };
  }
}
