import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreatePatientProfileDto } from './dto/create-patient-profile.dto';

@Injectable()
export class PatientsService {
  constructor(private readonly prisma: PrismaService) {}

  async getPatientProfile(userId: string) {
    const userProfile = await this.prisma.userProfile.findUnique({
      where: { user_id: userId },
    });

    if (!userProfile) {
      throw new NotFoundException('Patient profile not found');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    return {
      id: userProfile.id,
      user_id: userProfile.user_id,
      first_name: userProfile.first_name,
      last_name: userProfile.last_name,
      phone: user?.phone,
      email: user?.email,
      birth_date: userProfile.birth_date,
      gender: userProfile.gender,
      address: userProfile.address_encrypted,
      blood_group: userProfile.blood_group,
      emergency_contact_name: userProfile.emergency_contact_name,
      emergency_contact_phone: userProfile.emergency_contact_phone,
      profile_photo_url: userProfile.profile_photo_url,
      created_at: userProfile.created_at,
    };
  }

  async updatePatientProfile(userId: string, updateDto: CreatePatientProfileDto) {
    const userProfile = await this.prisma.userProfile.findUnique({
      where: { user_id: userId },
    });

    if (!userProfile) {
      throw new NotFoundException('Patient profile not found');
    }

    const updated = await this.prisma.userProfile.update({
      where: { user_id: userId },
      data: {
        ...(updateDto.date_of_birth && { birth_date: updateDto.date_of_birth }),
        ...(updateDto.gender && { gender: updateDto.gender }),
        ...(updateDto.blood_type && { blood_group: updateDto.blood_type }),
        ...(updateDto.emergency_contact_name && {
          emergency_contact_name: updateDto.emergency_contact_name,
        }),
        ...(updateDto.emergency_contact_phone && {
          emergency_contact_phone: updateDto.emergency_contact_phone,
        }),
      },
    });

    return updated;
  }

  async getPatientBookings(patientUuid: string) {
    return this.prisma.booking.findMany({
      where: { patient_uuid: patientUuid },
      include: { doctor: true, time_slot: true },
      orderBy: { created_at: 'desc' },
    });
  }

  async getPatientConsultations(patientUuid: string) {
    return this.prisma.consultation.findMany({
      where: { patient_uuid: patientUuid },
      include: { booking: true, doctor: true },
      orderBy: { created_at: 'desc' },
    });
  }

  async getPatientMedicalRecord(patientUuid: string) {
    const patientProfile = await this.prisma.userProfile.findFirst({
      where: { id: patientUuid },
    });

    if (!patientProfile) {
      throw new NotFoundException('Patient not found');
    }

    const [consultations, vaccinations, prescriptions] = await Promise.all([
      this.prisma.consultation.findMany({
        where: { patient_uuid: patientUuid },
        include: { booking: true, soap_note: true, prescriptions: { include: { prescription_lines: true } } },
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.vaccination.findMany({
        where: { patient_uuid: patientUuid },
        orderBy: { date_given: 'desc' },
      }),
      this.prisma.prescription.findMany({
        where: {
          patient_uuid: patientUuid,
          status: { notIn: ['REJECTED', 'DELIVERED'] },
        },
        include: { prescription_lines: true },
        orderBy: { created_at: 'desc' },
      }),
    ]);

    return {
      patient: {
        id: patientProfile.id,
        firstName: patientProfile.first_name,
        lastName: patientProfile.last_name,
        birthDate: patientProfile.birth_date,
        gender: patientProfile.gender,
        bloodGroup: patientProfile.blood_group,
      },
      allergies: [],
      activeMedications: prescriptions,
      medicalHistory: consultations,
      vaccinations,
    };
  }

  async getPatientTimeline(
    patientUuid: string,
    filters?: { startDate?: string; endDate?: string; eventType?: string },
  ) {
    const patientProfile = await this.prisma.userProfile.findFirst({
      where: { id: patientUuid },
    });

    if (!patientProfile) {
      throw new NotFoundException('Patient not found');
    }

    const startDate = filters?.startDate ? new Date(filters.startDate) : null;
    const endDate = filters?.endDate ? new Date(filters.endDate) : null;

    const consultations = await this.prisma.consultation.findMany({
      where: {
        patient_uuid: patientUuid,
        ...(startDate && { created_at: { gte: startDate } }),
        ...(endDate && { created_at: { lte: endDate } }),
      },
      include: { doctor: true, soap_note: true },
      orderBy: { created_at: 'desc' },
    });

    const vaccinations = await this.prisma.vaccination.findMany({
      where: {
        patient_uuid: patientUuid,
        ...(startDate && { date_given: { gte: startDate } }),
        ...(endDate && { date_given: { lte: endDate } }),
      },
      orderBy: { date_given: 'desc' },
    });

    const prescriptions = await this.prisma.prescription.findMany({
      where: {
        patient_uuid: patientUuid,
        ...(startDate && { created_at: { gte: startDate } }),
        ...(endDate && { created_at: { lte: endDate } }),
      },
      include: { prescription_lines: true },
      orderBy: { created_at: 'desc' },
    });

    const timeline = [];

    if (!filters?.eventType || filters.eventType === 'consultation') {
      timeline.push(
        ...consultations.map((c) => ({
          id: c.id,
          type: 'consultation',
          date: c.created_at,
          title: `Consultation`,
          description: c.soap_note?.assessment || 'No assessment recorded',
          details: {
            doctorId: c.doctor_id,
            soapNote: c.soap_note,
          },
        })),
      );
    }

    if (!filters?.eventType || filters.eventType === 'vaccination') {
      timeline.push(
        ...vaccinations.map((v) => ({
          id: v.id,
          type: 'vaccination',
          date: v.date_given,
          title: `${v.vaccine_name} Vaccination (Dose ${v.dose_number}/${v.total_doses})`,
          description: `Status: ${v.status}${v.next_due ? ` - Next due: ${v.next_due.toLocaleDateString()}` : ''}`,
          details: v,
        })),
      );
    }

    if (!filters?.eventType || filters.eventType === 'prescription') {
      timeline.push(
        ...prescriptions.map((p) => ({
          id: p.id,
          type: 'prescription',
          date: p.created_at,
          title: `Prescription (${p.prescription_lines?.length || 0} medications)`,
          description: `Status: ${p.status}`,
          details: {
            lines: p.prescription_lines,
            status: p.status,
          },
        })),
      );
    }

    return timeline.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  async getPatientVaccinations(patientUuid: string) {
    const patientProfile = await this.prisma.userProfile.findFirst({
      where: { id: patientUuid },
    });

    if (!patientProfile) {
      throw new NotFoundException('Patient not found');
    }

    const vaccinations = await this.prisma.vaccination.findMany({
      where: { patient_uuid: patientUuid },
      orderBy: { date_given: 'desc' },
    });

    const completed = vaccinations.filter((v) => v.status === 'COMPLETED');
    const pending = vaccinations.filter((v) => v.status === 'PENDING');
    const overdue = vaccinations.filter((v) => v.status === 'OVERDUE');

    return {
      patient: {
        id: patientProfile.id,
        firstName: patientProfile.first_name,
        lastName: patientProfile.last_name,
      },
      summary: {
        total: vaccinations.length,
        completed: completed.length,
        pending: pending.length,
        overdue: overdue.length,
      },
      vaccinations: {
        completed,
        pending,
        overdue,
      },
    };
  }

  async getPatientOverview(patientUuid: string) {
    const patientProfile = await this.prisma.userProfile.findFirst({
      where: { id: patientUuid },
    });

    if (!patientProfile) {
      throw new NotFoundException('Patient not found');
    }

    const [consultations, vaccinations, prescriptions] = await Promise.all([
      this.prisma.consultation.findMany({
        where: { patient_uuid: patientUuid },
        include: { soap_note: true, doctor: true },
        orderBy: { created_at: 'desc' },
        take: 1,
      }),
      this.prisma.vaccination.findMany({
        where: { patient_uuid: patientUuid, status: 'COMPLETED' },
      }),
      this.prisma.prescription.findMany({
        where: {
          patient_uuid: patientUuid,
          status: { notIn: ['REJECTED', 'DELIVERED'] },
        },
      }),
    ]);

    const lastConsultation = consultations[0] || null;
    const age = this.calculateAge(patientProfile.birth_date);

    const allConsultations = await this.prisma.consultation.count({
      where: { patient_uuid: patientUuid },
    });

    return {
      profile: {
        firstName: patientProfile.first_name,
        lastName: patientProfile.last_name,
        age,
        bloodGroup: patientProfile.blood_group,
        gender: patientProfile.gender,
      },
      lastConsultation: lastConsultation
        ? {
            date: lastConsultation.created_at,
            doctorName: `Dr.`,
            assessment: lastConsultation.soap_note?.assessment || 'No assessment',
            diagnosis: lastConsultation.soap_note?.diagnosis_label || 'No diagnosis',
          }
        : null,
      stats: {
        totalConsultations: allConsultations,
        upToDateVaccinations: vaccinations.length,
        activeMedications: prescriptions.length,
      },
    };
  }

  private calculateAge(birthDate: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}
