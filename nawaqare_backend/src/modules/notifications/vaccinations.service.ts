import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class VaccinationsService {
  constructor(private readonly prisma: PrismaService) {}

  async getVaccinationHistory(patientUuid: string) {
    return this.prisma.vaccination.findMany({
      where: { patient_uuid: patientUuid },
      orderBy: { created_at: 'desc' },
    });
  }

  async addVaccination(patientUuid: string, vaccinationData: any) {
    return this.prisma.vaccination.create({
      data: {
        patient_uuid: patientUuid,
        ...vaccinationData,
      },
    });
  }

  async updateVaccination(vaccinationId: string, data: any) {
    const vaccination = await this.prisma.vaccination.findUnique({
      where: { id: vaccinationId },
    });

    if (!vaccination) {
      throw new NotFoundException('Vaccination record not found');
    }

    return this.prisma.vaccination.update({
      where: { id: vaccinationId },
      data,
    });
  }
}
