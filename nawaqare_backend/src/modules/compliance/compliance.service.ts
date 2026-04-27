import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class ComplianceService {
  constructor(private readonly prisma: PrismaService) {}

  async getComplianceItems(doctorId: string) {
    return this.prisma.complianceItem.findMany({
      where: { doctor_id: doctorId },
      orderBy: { created_at: 'desc' },
    });
  }

  async updateComplianceItem(complianceItemId: string, data: any) {
    const complianceItem = await this.prisma.complianceItem.findUnique({
      where: { id: complianceItemId },
    });

    if (!complianceItem) {
      throw new NotFoundException('Compliance item not found');
    }

    return this.prisma.complianceItem.update({
      where: { id: complianceItemId },
      data,
    });
  }

  async uploadComplianceDocument(complianceItemId: string, documentUrl: string) {
    return this.updateComplianceItem(complianceItemId, {
      document_url: documentUrl,
      verified_at: new Date(),
      status: 'VERIFIED',
    });
  }
}
