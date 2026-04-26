import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  async initiatePayment(bookingId: string, amount: number, method: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    const idempotencyKey = `payment_${bookingId}_${Date.now()}`;

    return this.prisma.payment.create({
      data: {
        booking_id: bookingId,
        amount,
        currency: 'XOF',
        method: method as any,
        status: 'PENDING' as any,
        idempotency_key: idempotencyKey,
      },
    });
  }

  async getPaymentStatus(bookingId: string) {
    return this.prisma.payment.findUnique({
      where: { booking_id: bookingId },
    });
  }

  async updatePaymentStatus(paymentId: string, status: string, externalRef?: string) {
    return this.prisma.payment.update({
      where: { id: paymentId },
      data: { status: status as any, external_ref: externalRef },
    });
  }

  async handlePaymentWebhook(_data: any) {
    // Implement payment webhook handling
    // Verify HMAC, update payment status, trigger booking confirmation
    return { success: true };
  }
}
