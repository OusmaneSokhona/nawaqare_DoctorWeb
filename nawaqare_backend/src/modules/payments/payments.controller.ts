import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('initiate')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Initiate payment for booking' })
  async initiatePayment(@Body() body: { booking_id: string; amount: number; method: string }) {
    const payment = await this.paymentsService.initiatePayment(
      body.booking_id,
      body.amount,
      body.method,
    );
    return { data: payment };
  }

  @Get(':bookingId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get payment status' })
  async getPaymentStatus(@Param('bookingId') bookingId: string) {
    const payment = await this.paymentsService.getPaymentStatus(bookingId);
    return { data: payment };
  }

  @Post('webhook')
  @ApiOperation({ summary: 'Handle payment webhook' })
  async handleWebhook(@Body() body: any) {
    const result = await this.paymentsService.handlePaymentWebhook(body);
    return result;
  }
}
