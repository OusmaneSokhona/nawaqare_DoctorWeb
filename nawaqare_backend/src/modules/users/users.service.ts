import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CurrentUserDto } from '@/common/decorators/current-user.decorator';
import { PaginationDto } from '@/common/dto/pagination.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers(pagination: PaginationDto) {
    const { skip, take } = pagination;

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        skip,
        take,
        include: {
          profile: true,
        },
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.user.count(),
    ]);

    return {
      data: users.map((user) => ({
        id: user.id,
        phone: user.phone,
        email: user.email,
        role: user.role,
        is_active: user.is_active,
        profile: user.profile,
        created_at: user.created_at,
      })),
      pagination: {
        page: pagination.page || 1,
        page_size: pagination.page_size || 20,
        total_count: total,
        total_pages: Math.ceil(total / (pagination.page_size || 20)),
      },
    };
  }

  async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        profile: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user.id,
      phone: user.phone,
      email: user.email,
      role: user.role,
      is_active: user.is_active,
      profile: user.profile,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }

  async getUserProfile(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { profile: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const profile: any = {
      id: user.id,
      phone: user.phone,
      email: user.email,
      role: user.role,
      is_active: user.is_active,
      profile: user.profile,
      created_at: user.created_at,
    };

    if (user.role === 'DOCTOR') {
      const doctorProfile = await this.prisma.doctor.findUnique({
        where: { user_id: id },
      });
      if (doctorProfile) {
        profile.doctor = doctorProfile;
      }
    }

    return profile;
  }

  async updateUserProfile(id: string, updateUserDto: UpdateUserDto, currentUser: CurrentUserDto) {
    if (currentUser.id !== id && currentUser.role !== 'ADMIN') {
      throw new ForbiddenException('Cannot update other users profile');
    }

    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { profile: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Update UserProfile, not User directly
    if (user.profile) {
      await this.prisma.userProfile.update({
        where: { user_id: id },
        data: {
          ...(updateUserDto.first_name && { first_name: updateUserDto.first_name }),
          ...(updateUserDto.last_name && { last_name: updateUserDto.last_name }),
        },
      });
    }

    // Update User if needed
    const updated = await this.prisma.user.update({
      where: { id },
      data: {
        ...(updateUserDto.is_active !== undefined && { is_active: updateUserDto.is_active }),
      },
      include: { profile: true },
    });

    return {
      id: updated.id,
      phone: updated.phone,
      email: updated.email,
      role: updated.role,
      is_active: updated.is_active,
      profile: updated.profile,
      updated_at: updated.updated_at,
    };
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto, currentUser: CurrentUserDto) {
    return this.updateUserProfile(id, updateUserDto, currentUser);
  }

  async isUserActive(userId: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { is_active: true },
    });
    return user?.is_active || false;
  }
}
