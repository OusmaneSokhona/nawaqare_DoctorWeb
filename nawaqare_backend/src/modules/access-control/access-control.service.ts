import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateAccessRequestDto, EmergencyAccessDto, UpdateConsentDto } from './dto/access-request.dto';
import { AuditAction, ConsentType, Prisma } from '@prisma/client';

function auditDetailsObject(details: Prisma.JsonValue | null | undefined): Record<string, unknown> {
  if (details == null || typeof details !== 'object' || Array.isArray(details)) {
    return {};
  }
  return details as Record<string, unknown>;
}

export interface AuthorizedActor {
  id: string;
  name: string;
  email: string;
  role: string;
  accessType: string;
  grantedAt: Date;
  accessLevel: 'READ' | 'READ_WRITE';
  scope: string[];
}

export interface AccessHistoryEntry {
  id: string;
  timestamp: Date;
  action: string;
  actor: {
    id: string;
    name?: string;
    role: string;
  };
  resourceType: string;
  details: any;
  ipAddress?: string;
  userAgent?: string;
  isEmergency?: boolean;
}

export interface AccessLevel {
  level: 'NONE' | 'READ' | 'READ_WRITE' | 'EMERGENCY';
  grantedAt?: Date;
  expiresAt?: Date;
  scope?: string[];
  reason?: string;
}

@Injectable()
export class AccessControlService {
  constructor(private readonly prisma: PrismaService) {}

  async getAuthorizedActors(userId: string): Promise<AuthorizedActor[]> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Get all READ and WRITE audits for this patient in the last 90 days
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 90);

    const auditLogs = await this.prisma.auditLog.findMany({
      where: {
        target_uuid: userId,
        action: {
          in: [AuditAction.READ, AuditAction.WRITE, AuditAction.EXPORT],
        },
        created_at: { gte: cutoffDate },
      },
      include: {
        actor: {
          include: {
            profile: true,
            doctor: true,
          },
        },
      },
      orderBy: { created_at: 'desc' },
    });

    // Get active consents
    const consents = await this.prisma.consent.findMany({
      where: {
        user_id: userId,
        granted: true,
        revoked_at: null,
      },
    });

    // Build map of unique actors
    const actorsMap = new Map<string, AuthorizedActor>();

    auditLogs.forEach((log) => {
      if (!actorsMap.has(log.actor_uuid)) {
        const consentType = consents.find(
          (c) =>
            c.consent_type === ConsentType.MEDICAL_RECORD_ACCESS ||
            c.consent_type === ConsentType.DATA_PROCESSING,
        );

        actorsMap.set(log.actor_uuid, {
          id: log.actor_uuid,
          name: log.actor.profile ? `${log.actor.profile.first_name} ${log.actor.profile.last_name}` : 'Unknown',
          email: log.actor.email || 'N/A',
          role: log.actor.role,
          accessType: this.mapActionToAccessType(log.action),
          grantedAt: consentType?.granted_at || log.created_at,
          accessLevel: this.determineAccessLevel(auditLogs.filter((l) => l.actor_uuid === log.actor_uuid)),
          scope: this.extractScope(log.details),
        });
      }
    });

    return Array.from(actorsMap.values());
  }

  async getAccessHistory(userId: string, filters?: { limit?: number; offset?: number; action?: AuditAction }): Promise<AccessHistoryEntry[]> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const limit = filters?.limit || 50;
    const offset = filters?.offset || 0;

    const auditLogs = await this.prisma.auditLog.findMany({
      where: {
        target_uuid: userId,
        ...(filters?.action && { action: filters.action }),
      },
      include: {
        actor: {
          include: {
            profile: true,
          },
        },
      },
      orderBy: { created_at: 'desc' },
      take: limit,
      skip: offset,
    });

    return auditLogs.map((log) => ({
      id: log.id,
      timestamp: log.created_at,
      action: log.action,
      actor: {
        id: log.actor_uuid,
        name: log.actor.profile ? `${log.actor.profile.first_name} ${log.actor.profile.last_name}` : 'Unknown',
        role: log.actor.role,
      },
      resourceType: log.resource_type,
      details: log.details || {},
      ipAddress: log.ip_address ?? undefined,
      userAgent: log.user_agent ?? undefined,
      isEmergency: log.action === AuditAction.EMERGENCY_ACCESS,
    }));
  }

  async getMyConsents(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const consents = await this.prisma.consent.findMany({
      where: { user_id: userId },
      orderBy: { created_at: 'desc' },
    });

    return consents.map((consent) => ({
      id: consent.id,
      type: consent.consent_type,
      granted: consent.granted,
      grantedAt: consent.granted_at,
      revokedAt: consent.revoked_at,
      version: consent.version,
      isActive: consent.granted && !consent.revoked_at,
    }));
  }

  async updateConsent(userId: string, consentType: ConsentType, updateDto: UpdateConsentDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    let consent = await this.prisma.consent.findFirst({
      where: {
        user_id: userId,
        consent_type: consentType,
      },
    });

    if (!consent) {
      // Create new consent if it doesn't exist
      consent = await this.prisma.consent.create({
        data: {
          user_id: userId,
          consent_type: consentType,
          granted: updateDto.granted,
          granted_at: updateDto.granted ? new Date() : null,
          version: '1.0',
        },
      });
    } else {
      // Update existing consent
      consent = await this.prisma.consent.update({
        where: { id: consent.id },
        data: {
          granted: updateDto.granted,
          granted_at: updateDto.granted ? new Date() : consent.granted_at,
          revoked_at: !updateDto.granted ? new Date() : null,
        },
      });
    }

    return {
      id: consent.id,
      type: consent.consent_type,
      granted: consent.granted,
      grantedAt: consent.granted_at,
      revokedAt: consent.revoked_at,
      isActive: consent.granted && !consent.revoked_at,
    };
  }

  async getActiveSessions(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const sessions = await this.prisma.session.findMany({
      where: {
        user_id: userId,
        is_active: true,
      },
      orderBy: { last_active: 'desc' },
    });

    return sessions.map((session) => ({
      id: session.id,
      deviceInfo: session.device_info,
      ipAddress: session.ip_address,
      lastActive: session.last_active,
      createdAt: session.created_at,
    }));
  }

  async revokeSession(userId: string, sessionId: string) {
    const session = await this.prisma.session.findFirst({
      where: {
        id: sessionId,
        user_id: userId,
      },
    });

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    await this.prisma.session.update({
      where: { id: sessionId },
      data: { is_active: false },
    });

    return { message: 'Session revoked successfully' };
  }

  async requestAccess(doctorId: string, createAccessRequestDto: CreateAccessRequestDto) {
    const doctor = await this.prisma.user.findUnique({ where: { id: doctorId } });
    if (!doctor || doctor.role !== 'DOCTOR') {
      throw new BadRequestException('Invalid doctor');
    }

    const patient = await this.prisma.user.findUnique({ where: { id: createAccessRequestDto.patientId } });
    if (!patient || patient.role !== 'PATIENT') {
      throw new BadRequestException('Invalid patient');
    }

    // Create an audit log entry for this access request
    await this.prisma.auditLog.create({
      data: {
        actor_uuid: doctorId,
        target_uuid: createAccessRequestDto.patientId,
        action: AuditAction.READ, // Treat initial request as READ
        resource_type: 'ACCESS_REQUEST',
        details: {
          accessType: createAccessRequestDto.accessType,
          scope: createAccessRequestDto.scope || [],
          reason: createAccessRequestDto.reason,
          duration: createAccessRequestDto.duration,
          status: 'PENDING',
          requestedAt: new Date().toISOString(),
        },
      },
    });

    return {
      message: 'Access request submitted',
      patientId: createAccessRequestDto.patientId,
      accessType: createAccessRequestDto.accessType,
      status: 'PENDING',
    };
  }

  async getMyAccessRequests(doctorId: string) {
    const doctor = await this.prisma.user.findUnique({ where: { id: doctorId } });
    if (!doctor || doctor.role !== 'DOCTOR') {
      throw new BadRequestException('Invalid doctor');
    }

    const auditLogs = await this.prisma.auditLog.findMany({
      where: {
        actor_uuid: doctorId,
        resource_type: 'ACCESS_REQUEST',
      },
      include: {
        actor: {
          include: {
            profile: true,
          },
        },
      },
      orderBy: { created_at: 'desc' },
    });

    return auditLogs.map((log) => {
      const d = auditDetailsObject(log.details);
      return {
        id: log.id,
        patientId: log.target_uuid,
        accessType: d['accessType'],
        scope: (Array.isArray(d['scope']) ? d['scope'] : []) as string[],
        reason: d['reason'],
        duration: d['duration'],
        status: (d['status'] as string) || 'PENDING',
        requestedAt: log.created_at,
      };
    });
  }

  async checkMyAccess(doctorId: string, patientId: string): Promise<AccessLevel> {
    const doctor = await this.prisma.user.findUnique({ where: { id: doctorId } });
    if (!doctor || doctor.role !== 'DOCTOR') {
      throw new BadRequestException('Invalid doctor');
    }

    const patient = await this.prisma.user.findUnique({ where: { id: patientId } });
    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    // Check if there's an active consent
    const consent = await this.prisma.consent.findFirst({
      where: {
        user_id: patientId,
        consent_type: ConsentType.MEDICAL_RECORD_ACCESS,
        granted: true,
        revoked_at: null,
      },
    });

    if (!consent) {
      return {
        level: 'NONE',
      };
    }

    // Check access type based on audit logs
    const recentAccess = await this.prisma.auditLog.findFirst({
      where: {
        actor_uuid: doctorId,
        target_uuid: patientId,
        action: {
          in: [AuditAction.READ, AuditAction.WRITE],
        },
        created_at: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
        },
      },
      orderBy: { created_at: 'desc' },
    });

    if (!recentAccess) {
      return {
        level: 'NONE',
      };
    }

    const accessLevel = recentAccess.action === AuditAction.WRITE ? 'READ_WRITE' : 'READ';

    const d = auditDetailsObject(recentAccess.details);
    const scopeRaw = d['scope'];
    return {
      level: accessLevel as 'READ' | 'READ_WRITE',
      grantedAt: consent.granted_at || new Date(),
      scope: (Array.isArray(scopeRaw) ? scopeRaw : []) as string[],
    };
  }

  async requestEmergencyAccess(doctorId: string, emergencyAccessDto: EmergencyAccessDto) {
    const doctor = await this.prisma.user.findUnique({ where: { id: doctorId } });
    if (!doctor || doctor.role !== 'DOCTOR') {
      throw new BadRequestException('Invalid doctor');
    }

    const patient = await this.prisma.user.findUnique({ where: { id: emergencyAccessDto.patientId } });
    if (!patient || patient.role !== 'PATIENT') {
      throw new NotFoundException('Patient not found');
    }

    if (!emergencyAccessDto.justification || emergencyAccessDto.justification.trim().length < 10) {
      throw new BadRequestException('Justification must be at least 10 characters long');
    }

    // Create emergency access audit log
    const auditLog = await this.prisma.auditLog.create({
      data: {
        actor_uuid: doctorId,
        target_uuid: emergencyAccessDto.patientId,
        action: AuditAction.EMERGENCY_ACCESS,
        resource_type: 'MEDICAL_RECORD',
        details: {
          justification: emergencyAccessDto.justification,
          timestamp: new Date().toISOString(),
          breachType: 'BREAK_GLASS',
        },
      },
    });

    return {
      id: auditLog.id,
      message: 'Emergency access granted - action logged for audit',
      patientId: emergencyAccessDto.patientId,
      accessType: 'EMERGENCY_READ',
      grantedAt: new Date(),
      justification: emergencyAccessDto.justification,
    };
  }

  // Helper methods

  private mapActionToAccessType(action: AuditAction): string {
    switch (action) {
      case AuditAction.READ:
        return 'READ';
      case AuditAction.WRITE:
        return 'READ_WRITE';
      case AuditAction.EXPORT:
        return 'EXPORT';
      case AuditAction.EMERGENCY_ACCESS:
        return 'EMERGENCY';
      default:
        return 'UNKNOWN';
    }
  }

  private determineAccessLevel(logs: any[]): 'READ' | 'READ_WRITE' {
    const hasWrite = logs.some((log) => log.action === AuditAction.WRITE);
    return hasWrite ? 'READ_WRITE' : 'READ';
  }

  private extractScope(details: any): string[] {
    if (!details || !details.scope) {
      return ['GENERAL'];
    }
    return Array.isArray(details.scope) ? details.scope : ['GENERAL'];
  }
}
