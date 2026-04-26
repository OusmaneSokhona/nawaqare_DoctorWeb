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

  async getSoapNotes(consultationId: string) {
    return this.prisma.soapNote.findMany({
      where: { consultation_id: consultationId },
    });
  }

  async getExamOrders(consultationId: string) {
    return this.prisma.examOrder.findMany({
      where: { consultation_id: consultationId },
    });
  }

  async createReferenceLetter(
    consultationId: string,
    referenceLetterData: any,
    doctorId: string,
  ) {
    return this.prisma.referenceLettre.create({
      data: {
        consultation_id: consultationId,
        from_doctor_id: doctorId,
        ...referenceLetterData,
      },
    });
  }

  async getReferenceLetters(consultationId: string) {
    return this.prisma.referenceLettre.findMany({
      where: { consultation_id: consultationId },
    });
  }

  async createCertificate(
    consultationId: string,
    certificateData: any,
    doctorId: string,
  ) {
    return this.prisma.medicalCertificate.create({
      data: {
        consultation_id: consultationId,
        doctor_id: doctorId,
        ...certificateData,
      },
    });
  }

  async getCertificates(consultationId: string) {
    return this.prisma.medicalCertificate.findMany({
      where: { consultation_id: consultationId },
    });
  }

  async createFollowUpPlan(
    consultationId: string,
    followUpPlanData: any,
  ) {
    return this.prisma.followUpPlan.create({
      data: {
        consultation_id: consultationId,
        ...followUpPlanData,
      },
    });
  }

  async getFollowUpPlans(consultationId: string) {
    return this.prisma.followUpPlan.findMany({
      where: { consultation_id: consultationId },
    });
  }
}
