import { Injectable, BadRequestException, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateDoctorProfileDto } from './dto/create-doctor-profile.dto';
import { UpdateDoctorProfileDto } from './dto/update-doctor-profile.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';

@Injectable()
export class DoctorsService {
  constructor(private readonly prisma: PrismaService) {}

  async getDoctors(pagination: PaginationDto, specialty?: string) {
    const { skip, take } = pagination;

    const where: any = { is_verified: true };
    if (specialty) {
      where.specialty = specialty;
    }

    const [doctors, total] = await Promise.all([
      this.prisma.doctor.findMany({
        where,
        skip,
        take,
        include: {
          user: {
            select: {
              phone: true,
              email: true,
              profile: {
                select: {
                  first_name: true,
                  last_name: true,
                },
              },
            },
          },
        },
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.doctor.count({ where }),
    ]);

    return {
      data: doctors.map((doc) => ({
        id: doc.id,
        user_id: doc.user_id,
        name: doc.user.profile ? `${doc.user.profile.first_name} ${doc.user.profile.last_name}` : 'N/A',
        phone: doc.user.phone,
        email: doc.user.email,
        specialty: doc.specialty,
        onmc_number: doc.onmc_number,
        rating: doc.rating,
        tarif_xof: doc.tarif_xof,
        bio: doc.bio,
        is_verified: doc.is_verified,
      })),
      pagination: {
        page: pagination.page || 1,
        page_size: pagination.page_size || 20,
        total_count: total,
        total_pages: Math.ceil(total / (pagination.page_size || 20)),
      },
    };
  }

  async searchDoctors(query: string, pagination: PaginationDto) {
    const { skip, take } = pagination;

    const [doctors, total] = await Promise.all([
      this.prisma.doctor.findMany({
        where: {
          is_verified: true,
          OR: [
            {
              user: {
                profile: {
                  OR: [
                    { first_name: { contains: query, mode: 'insensitive' } },
                    { last_name: { contains: query, mode: 'insensitive' } },
                  ],
                },
              },
            },
            { specialty: { contains: query, mode: 'insensitive' } },
          ],
        },
        skip,
        take,
        include: {
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
      }),
      this.prisma.doctor.count({
        where: {
          is_verified: true,
          OR: [
            {
              user: {
                profile: {
                  OR: [
                    { first_name: { contains: query, mode: 'insensitive' } },
                    { last_name: { contains: query, mode: 'insensitive' } },
                  ],
                },
              },
            },
            { specialty: { contains: query, mode: 'insensitive' } },
          ],
        },
      }),
    ]);

    return {
      data: doctors.map((doc) => ({
        id: doc.id,
        user_id: doc.user_id,
        name: doc.user.profile ? `${doc.user.profile.first_name} ${doc.user.profile.last_name}` : 'N/A',
        phone: doc.user.phone,
        specialty: doc.specialty,
        rating: doc.rating,
        tarif_xof: doc.tarif_xof,
      })),
      pagination: {
        page: pagination.page || 1,
        page_size: pagination.page_size || 20,
        total_count: total,
        total_pages: Math.ceil(total / (pagination.page_size || 20)),
      },
    };
  }

  async getDoctorById(id: string) {
    const doctor = await this.prisma.doctor.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            phone: true,
            email: true,
            profile: {
              select: {
                first_name: true,
                last_name: true,
              },
            },
          },
        },
      },
    });

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    return {
      id: doctor.id,
      user_id: doctor.user_id,
      name: doctor.user.profile ? `${doctor.user.profile.first_name} ${doctor.user.profile.last_name}` : 'N/A',
      phone: doctor.user.phone,
      email: doctor.user.email,
      specialty: doctor.specialty,
      onmc_number: doctor.onmc_number,
      rating: doctor.rating,
      total_consultations: doctor.total_consultations,
      tarif_xof: doctor.tarif_xof,
      bio: doctor.bio,
      languages: doctor.languages,
      consultation_modes: doctor.consultation_modes,
      is_verified: doctor.is_verified,
      created_at: doctor.created_at,
    };
  }

  async createDoctorProfile(userId: string, createDoctorProfileDto: CreateDoctorProfileDto) {
    const existingDoctor = await this.prisma.doctor.findUnique({
      where: { user_id: userId },
    });

    if (existingDoctor) {
      throw new ConflictException('Doctor profile already exists for this user');
    }

    const doctor = await this.prisma.doctor.create({
      data: {
        user_id: userId,
        onmc_number: createDoctorProfileDto.onmc_number,
        specialty: createDoctorProfileDto.specialty,
        tarif_xof: createDoctorProfileDto.tarif_xof,
        bio: createDoctorProfileDto.bio,
        languages: createDoctorProfileDto.languages || [],
        consultation_modes: (createDoctorProfileDto.consultation_modes as any) || [],
        is_verified: false,
      },
      include: {
        user: {
          select: {
            profile: {
              select: {
                first_name: true,
                last_name: true,
              },
            },
          },
        },
      },
    });

    return {
      id: doctor.id,
      name: doctor.user?.profile ? `${doctor.user.profile.first_name} ${doctor.user.profile.last_name}` : 'N/A',
      specialty: doctor.specialty,
      is_verified: doctor.is_verified,
      message: 'Doctor profile created. Waiting for admin verification.',
    };
  }

  async updateDoctorProfile(id: string, updateDoctorProfileDto: UpdateDoctorProfileDto, userId: string) {
    const doctor = await this.prisma.doctor.findUnique({
      where: { id },
    });

    if (!doctor) {
      throw new NotFoundException('Doctor profile not found');
    }

    if (doctor.user_id !== userId) {
      throw new BadRequestException('Cannot update other doctors profiles');
    }

    const updateData: any = {};
    if (updateDoctorProfileDto.bio) updateData.bio = updateDoctorProfileDto.bio;
    if (updateDoctorProfileDto.tarif_xof) updateData.tarif_xof = updateDoctorProfileDto.tarif_xof;
    if (updateDoctorProfileDto.languages) updateData.languages = updateDoctorProfileDto.languages;
    if (updateDoctorProfileDto.consultation_modes) {
      updateData.consultation_modes = updateDoctorProfileDto.consultation_modes as any;
    }

    const updated = await this.prisma.doctor.update({
      where: { id },
      data: updateData,
    });

    return updated;
  }

  async getTimeSlots(doctorId: string) {
    const doctor = await this.prisma.doctor.findUnique({
      where: { id: doctorId },
    });

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    const timeSlots = await this.prisma.timeSlot.findMany({
      where: { doctor_id: doctorId, is_available: true },
      orderBy: { start_time: 'asc' },
    });

    return {
      doctor_id: doctorId,
      time_slots: timeSlots.map((slot) => ({
        id: slot.id,
        start_time: slot.start_time,
        end_time: slot.end_time,
        consultation_mode: slot.consultation_mode,
        is_available: slot.is_available,
      })),
    };
  }

  async verifyDoctor(doctorId: string) {
    return this.prisma.doctor.update({
      where: { id: doctorId },
      data: { is_verified: true },
    });
  }
}
