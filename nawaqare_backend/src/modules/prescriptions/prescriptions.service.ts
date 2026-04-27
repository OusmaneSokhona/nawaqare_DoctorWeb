import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class PrescriptionsService {
  constructor(private readonly prisma: PrismaService) {}

  async getPrescriptions(consultationId: string) {
    return this.prisma.prescription.findMany({
      where: { consultation_id: consultationId },
      include: { prescription_lines: true },
    });
  }

  async createPrescription(consultationId: string, prescriptionData: any) {
    return this.prisma.prescription.create({
      data: {
        consultation_id: consultationId,
        ...prescriptionData,
      },
    });
  }

  async getPrescriptionByQrToken(qrToken: string) {
    return this.prisma.prescription.findUnique({
      where: { qr_code_token: qrToken },
      include: { prescription_lines: true },
    });
  }
}
