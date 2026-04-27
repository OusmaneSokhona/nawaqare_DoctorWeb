import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ConsultationsService } from './consultations.service';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';

@ApiTags('Consultations')
@Controller('consultations')
export class ConsultationsController {
  constructor(private readonly consultationsService: ConsultationsService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get consultation detail' })
  async getConsultation(@Param('id') id: string) {
    const consultation = await this.consultationsService.getConsultation(id);
    return { data: consultation };
  }

  @Post(':id/soap-notes')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Create SOAP note' })
  async createSoapNote(@Param('id') id: string, @Body() body: any) {
    const soapNote = await this.consultationsService.createSoapNote(id, body);
    return { data: soapNote };
  }

  @Post(':id/exam-orders')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Create exam order' })
  async createExamOrder(@Param('id') id: string, @Body() body: any) {
    const examOrder = await this.consultationsService.createExamOrder(id, body);
    return { data: examOrder };
  }
}
