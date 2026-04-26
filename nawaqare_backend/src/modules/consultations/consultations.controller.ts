import { Controller, Get, Post, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ConsultationsService } from './consultations.service';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { CurrentUser, CurrentUserDto } from '@/common/decorators/current-user.decorator';

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

  @Get(':id/soap-notes')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get SOAP notes for a consultation' })
  async getSoapNotes(@Param('id') id: string) {
    const soapNotes = await this.consultationsService.getSoapNotes(id);
    return { data: soapNotes };
  }

  @Post(':id/exam-orders')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Create exam order' })
  async createExamOrder(@Param('id') id: string, @Body() body: any) {
    const examOrder = await this.consultationsService.createExamOrder(id, body);
    return { data: examOrder };
  }

  @Get(':id/exam-orders')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get exam orders for a consultation' })
  async getExamOrders(@Param('id') id: string) {
    const examOrders = await this.consultationsService.getExamOrders(id);
    return { data: examOrders };
  }

  @Patch('exam-orders/:examOrderId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Update exam order status' })
  async updateExamOrder(
    @Param('examOrderId') examOrderId: string,
    @Body() body: any,
  ) {
    const examOrder = await this.consultationsService.updateExamOrder(
      examOrderId,
      body,
    );
    return { data: examOrder };
  }

  @Post(':id/reference-letters')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Create reference letter' })
  async createReferenceLetter(
    @Param('id') id: string,
    @Body() body: any,
    @CurrentUser() user: CurrentUserDto,
  ) {
    const referenceLetter =
      await this.consultationsService.createReferenceLetter(id, body, user.id);
    return { data: referenceLetter };
  }

  @Get(':id/reference-letters')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get reference letters for a consultation' })
  async getReferenceLetters(@Param('id') id: string) {
    const referenceLetters =
      await this.consultationsService.getReferenceLetters(id);
    return { data: referenceLetters };
  }

  @Post(':id/certificates')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Create medical certificate' })
  async createCertificate(
    @Param('id') id: string,
    @Body() body: any,
    @CurrentUser() user: CurrentUserDto,
  ) {
    const certificate = await this.consultationsService.createCertificate(
      id,
      body,
      user.id,
    );
    return { data: certificate };
  }

  @Get(':id/certificates')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get medical certificates for a consultation' })
  async getCertificates(@Param('id') id: string) {
    const certificates =
      await this.consultationsService.getCertificates(id);
    return { data: certificates };
  }

  @Post(':id/follow-up-plans')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Create follow-up plan' })
  async createFollowUpPlan(@Param('id') id: string, @Body() body: any) {
    const followUpPlan =
      await this.consultationsService.createFollowUpPlan(id, body);
    return { data: followUpPlan };
  }

  @Get(':id/follow-up-plans')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get follow-up plans for a consultation' })
  async getFollowUpPlans(@Param('id') id: string) {
    const followUpPlans =
      await this.consultationsService.getFollowUpPlans(id);
    return { data: followUpPlans };
  }
}
