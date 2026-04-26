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

  async getComplianceStatus(doctorId: string) {
    const items = await this.prisma.complianceItem.findMany({
      where: { doctor_id: doctorId },
    });

    if (items.length === 0) {
      return {
        score_percentage: 0,
        total_items: 0,
        expiring_items: 0,
      };
    }

    const verifiedCount = items.filter((item) => item.status === 'VERIFIED').length;
    const scorePercentage = Math.round((verifiedCount / items.length) * 100);

    const now = new Date();
    const expiringItems = items.filter(
      (item) => item.expires_at && item.expires_at <= new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000),
    ).length;

    return {
      score_percentage: scorePercentage,
      total_items: items.length,
      expiring_items: expiringItems,
    };
  }

  async createComplianceDocument(doctorId: string, type: string, documentUrl: string) {
    return this.prisma.complianceItem.create({
      data: {
        doctor_id: doctorId,
        item_type: type,
        document_url: documentUrl,
        status: 'VERIFIED',
        verified_at: new Date(),
      },
    });
  }
}
