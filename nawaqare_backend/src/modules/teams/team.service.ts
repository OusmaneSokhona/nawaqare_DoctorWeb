import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class TeamService {
  constructor(private readonly prisma: PrismaService) {}

  async getTeamMembers(doctorId: string) {
    return this.prisma.teamMember.findMany({
      where: { doctor_id: doctorId },
      orderBy: { created_at: 'desc' },
    });
  }

  async inviteTeamMember(
    doctorId: string,
    memberUserId: string,
    role: string,
    permissions: any,
  ) {
    return this.prisma.teamMember.create({
      data: {
        doctor_id: doctorId,
        member_user_id: memberUserId,
        role,
        permissions,
        status: 'PENDING',
      },
    });
  }

  async updateTeamMemberStatus(teamMemberId: string, status: string) {
    const teamMember = await this.prisma.teamMember.findUnique({
      where: { id: teamMemberId },
    });

    if (!teamMember) {
      throw new NotFoundException('Team member not found');
    }

    return this.prisma.teamMember.update({
      where: { id: teamMemberId },
      data: {
        status,
        ...(status === 'ACCEPTED' && { joined_at: new Date() }),
      },
    });
  }

  async updateTeamMemberPermissions(teamMemberId: string, permissions: any) {
    const teamMember = await this.prisma.teamMember.findUnique({
      where: { id: teamMemberId },
    });

    if (!teamMember) {
      throw new NotFoundException('Team member not found');
    }

    return this.prisma.teamMember.update({
      where: { id: teamMemberId },
      data: { permissions },
    });
  }

  async removeTeamMember(teamMemberId: string) {
    const teamMember = await this.prisma.teamMember.findUnique({
      where: { id: teamMemberId },
    });

    if (!teamMember) {
      throw new NotFoundException('Team member not found');
    }

    return this.prisma.teamMember.delete({
      where: { id: teamMemberId },
    });
  }
}
