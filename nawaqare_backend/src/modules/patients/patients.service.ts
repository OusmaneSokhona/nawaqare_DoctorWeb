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
}
