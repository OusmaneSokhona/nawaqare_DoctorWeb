import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class ConsultationsService {
  constructor(private readonly prisma: PrismaService) {}

  async getConsultation(consultationId: string) {
    return this.prisma.consultation.findUnique({
      where: { id: consultationId },
      include: {
        booking: true,
        soap_note: true,
        prescriptions: true,
        exam_orders: true,
        reference_letters: true,
        certificates: true,
        follow_up_plan: true,
      },
    });
  }

  async createSoapNote(consultationId: string, soapNoteData: any) {
    return this.prisma.soapNote.create({
      data: {
        consultation_id: consultationId,
        ...soapNoteData,
      },
    });
  }

  async createExamOrder(consultationId: string, examOrderData: any) {
    return this.prisma.examOrder.create({
      data: {
        consultation_id: consultationId,
        ...examOrderData,
      },
    });
  }

  async updateExamOrder(examOrderId: string, data: any) {
    return this.prisma.examOrder.update({
      where: { id: examOrderId },
      data,
    });
  }
}
