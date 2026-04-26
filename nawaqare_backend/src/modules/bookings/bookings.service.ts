import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class BookingsService {
  constructor(private readonly prisma: PrismaService) {}

  async getBookingsForDoctor(doctorId: string) {
    return this.prisma.booking.findMany({
      where: { doctor_id: doctorId },
      include: {
        time_slot: true,
      },
      orderBy: { created_at: 'desc' },
    });
  }

  async getBookingsForPatient(patientUuid: string) {
    return this.prisma.booking.findMany({
      where: { patient_uuid: patientUuid },
      include: {
        doctor: {
          select: {
            id: true,
            specialty: true,
            user: {
              select: {
                phone: true,
                profile: {
                  select: {
                    first_name: true,
                    last_name: true,
                  },
                },
              },
            },
          },
        },
        time_slot: true,
      },
      orderBy: { created_at: 'desc' },
    });
  }

  async createBooking(
    patientUuid: string,
    doctorId: string,
    slotId: string,
    consultationMode: string,
    notesPatient?: string,
  ) {
    const slot = await this.prisma.timeSlot.findUnique({
      where: { id: slotId },
    });

    if (!slot || !slot.is_available) {
      throw new BadRequestException('Time slot not available');
    }

    const idempotencyKey = `booking_${patientUuid}_${slotId}_${Date.now()}`;

    const booking = await this.prisma.booking.create({
      data: {
        patient_uuid: patientUuid,
        doctor_id: doctorId,
        slot_id: slotId,
        consultation_mode: consultationMode as any,
        notes_patient: notesPatient,
        idempotency_key: idempotencyKey,
        status: 'CREATED' as any,
      },
    });

    // Mark slot as unavailable
    await this.prisma.timeSlot.update({
      where: { id: slotId },
      data: { is_available: false },
    });

    return booking;
  }

  async updateBookingStatus(bookingId: string, status: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    return this.prisma.booking.update({
      where: { id: bookingId },
      data: { status: status as any },
    });
  }

  async cancelBooking(bookingId: string, cancelledReason?: string, cancelledBy?: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    // Release the time slot
    await this.prisma.timeSlot.update({
      where: { id: booking.slot_id },
      data: { is_available: true },
    });

    return this.prisma.booking.update({
      where: { id: bookingId },
      data: {
        status: 'CANCELLED',
        cancelled_reason: cancelledReason,
        cancelled_by: cancelledBy,
      },
    });
  }
}
