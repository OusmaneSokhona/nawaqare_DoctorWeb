import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { AuditAction, PrescriptionStatus } from '@prisma/client';
import { PharmacyDispenseDto, PharmacyRejectDto, PharmacySubstitutionDto, UpdatePharmacyProfileDto } from './dto/pharmacy-dispense.dto';

@Injectable()
export class PharmacyService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Crée un log d'audit pour chaque action
   */
  private async createAuditLog(
    actorUuid: string,
    action: AuditAction,
    resourceType: string,
    resourceId?: string,
    details?: any,
    targetUuid?: string,
  ) {
    return this.prisma.auditLog.create({
      data: {
        actor_uuid: actorUuid,
        action,
        resource_type: resourceType,
        resource_id: resourceId,
        target_uuid: targetUuid,
        details,
      },
    });
  }

  /**
   * Récupère les prescriptions accessibles à la pharmacie avec filtres
   */
  async getPrescriptions(
    pharmacyUserId: string,
    filters?: { status?: PrescriptionStatus; startDate?: Date; endDate?: Date },
  ) {
    const where: any = {
      status: { not: PrescriptionStatus.REJECTED },
      valid_until: { gt: new Date() }, // Non expirée
    };

    if (filters?.status) {
      where.status = filters.status;
    }

    if (filters?.startDate || filters?.endDate) {
      where.created_at = {};
      if (filters.startDate) where.created_at.gte = filters.startDate;
      if (filters.endDate) where.created_at.lte = filters.endDate;
    }

    const prescriptions = await this.prisma.prescription.findMany({
      where,
      include: {
        prescription_lines: true,
        doctor: {
          select: {
            id: true,
            user: {
              select: {
                id: true,
              },
            },
          },
        },
      },
      orderBy: { created_at: 'desc' },
    });

    // Log READ pour chaque prescription
    for (const rx of prescriptions) {
      await this.createAuditLog(
        pharmacyUserId,
        AuditAction.READ,
        'PRESCRIPTION',
        rx.id,
        { description: 'Pharmacy viewed prescription list' },
      );
    }

    return prescriptions.map((rx) => this.formatPrescriptionForPharmacy(rx));
  }

  /**
   * Récupère une prescription par QR code
   */
  async getPrescriptionByQrToken(pharmacyUserId: string, qrToken: string) {
    const prescription = await this.prisma.prescription.findUnique({
      where: { qr_code_token: qrToken },
      include: {
        prescription_lines: true,
        doctor: {
          select: {
            id: true,
            user: {
              select: {
                id: true,
              },
            },
          },
        },
        consultation: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!prescription) {
      throw new NotFoundException('Prescription not found');
    }

    if (prescription.valid_until < new Date()) {
      throw new BadRequestException('Prescription has expired');
    }

    // Log READ
    await this.createAuditLog(
      pharmacyUserId,
      AuditAction.READ,
      'PRESCRIPTION',
      prescription.id,
      { qrToken, description: 'Pharmacy accessed prescription via QR code' },
    );

    return this.formatPrescriptionForPharmacy(prescription);
  }

  /**
   * Cherche prescriptions par ID patient
   */
  async getPrescriptionsByPatient(pharmacyUserId: string, patientId: string) {
    const prescriptions = await this.prisma.prescription.findMany({
      where: {
        patient_uuid: patientId,
        valid_until: { gt: new Date() },
      },
      include: {
        prescription_lines: true,
        doctor: {
          select: {
            id: true,
            user: {
              select: {
                id: true,
              },
            },
          },
        },
      },
      orderBy: { created_at: 'desc' },
    });

    // Log READ
    for (const rx of prescriptions) {
      await this.createAuditLog(
        pharmacyUserId,
        AuditAction.READ,
        'PRESCRIPTION',
        rx.id,
        { patientId, description: 'Pharmacy searched prescriptions by patient' },
      );
    }

    return prescriptions.map((rx) => this.formatPrescriptionForPharmacy(rx));
  }

  /**
   * MISSION 6: Récupère le détail d'une prescription avec sécurité
   * Masque intentionnellement le diagnostic et les notes SOAP
   */
  async getPrescriptionDetail(pharmacyUserId: string, prescriptionId: string) {
    const prescription = await this.prisma.prescription.findUnique({
      where: { id: prescriptionId },
      include: {
        prescription_lines: true,
        doctor: {
          select: {
            id: true,
            specialty: true,
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
        },
        consultation: {
          select: {
            id: true,
            // INTENTIONALLY NOT INCLUDED: soap_note with diagnosis/assessment
          },
        },
      },
    });

    if (!prescription) {
      throw new NotFoundException('Prescription not found');
    }

    if (prescription.valid_until < new Date()) {
      throw new BadRequestException('Prescription has expired');
    }

    // Log READ
    await this.createAuditLog(
      pharmacyUserId,
      AuditAction.READ,
      'PRESCRIPTION',
      prescriptionId,
      { description: 'Pharmacy viewed prescription detail' },
    );

    return this.formatPrescriptionDetailForPharmacy(prescription);
  }

  /**
   * MISSION 6: Formate le détail d'une prescription pour la pharmacie
   * Masque les données sensibles (diagnostic, notes SOAP)
   */
  private formatPrescriptionDetailForPharmacy(prescription: any) {
    return {
      id: prescription.id,
      status: prescription.status,
      qrCodeToken: prescription.qr_code_token,
      prescriber: prescription.doctor
        ? {
            id: prescription.doctor.id,
            name: prescription.doctor.user?.profile
              ? `Dr. ${prescription.doctor.user.profile.first_name} ${prescription.doctor.user.profile.last_name}`
              : 'Unknown',
            specialty: prescription.doctor.specialty,
          }
        : null,
      createdAt: prescription.created_at,
      validUntil: prescription.valid_until,
      isExpired: prescription.valid_until < new Date(),
      securityAlerts: this.calculateSecurityAlerts(prescription),
      lines: prescription.prescription_lines.map((line: any) => ({
        id: line.id,
        drugName: line.drug_name,
        dosage: line.dosage,
        frequency: line.frequency,
        durationDays: line.duration_days,
        quantity: line.quantity,
        dci: line.dci,
        instructions: line.instructions,
      })),
      pharmacyNotes: prescription.pharmacy_notes,
      // INTENTIONALLY MASKED: diagnosis, assessment, soap_note details
    };
  }

  /**
   * MISSION 6: Calcule les alertes de sécurité pour la prescription
   */
  private calculateSecurityAlerts(prescription: any): string[] {
    const alerts: string[] = [];

    // Vérifier l'expiration
    if (prescription.valid_until < new Date()) {
      alerts.push('PRESCRIPTION_EXPIRED');
    }

    // Alerte sur les longues durées
    const longDurations = prescription.prescription_lines.filter(
      (line: any) => line.duration_days > 90,
    );
    if (longDurations.length > 0) {
      alerts.push('LONG_DURATION_MEDICATION');
    }

    // Alerte si pas signé
    if (!prescription.is_signed) {
      alerts.push('PRESCRIPTION_NOT_SIGNED');
    }

    return alerts;
  }

  /**
   * Valide la prescription et marque RECEIVED
   */
  async validatePrescription(pharmacyUserId: string, prescriptionId: string) {
    const prescription = await this.prisma.prescription.findUnique({
      where: { id: prescriptionId },
      include: { prescription_lines: true },
    });

    if (!prescription) {
      throw new NotFoundException('Prescription not found');
    }

    if (prescription.valid_until < new Date()) {
      throw new BadRequestException('Prescription has expired');
    }

    const updated = await this.prisma.prescription.update({
      where: { id: prescriptionId },
      data: {
        status: PrescriptionStatus.RECEIVED,
      },
      include: {
        prescription_lines: true,
        doctor: {
          select: {
            id: true,
            user: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });

    // Log WRITE
    await this.createAuditLog(
      pharmacyUserId,
      AuditAction.WRITE,
      'PRESCRIPTION',
      prescriptionId,
      { status: PrescriptionStatus.RECEIVED, description: 'Pharmacy validated and received prescription' },
    );

    return this.formatPrescriptionForPharmacy(updated);
  }

  /**
   * Enregistre la délivrance complète
   */
  async dispensePrescription(pharmacyUserId: string, prescriptionId: string, dto: PharmacyDispenseDto) {
    const prescription = await this.prisma.prescription.findUnique({
      where: { id: prescriptionId },
      include: { prescription_lines: true },
    });

    if (!prescription) {
      throw new NotFoundException('Prescription not found');
    }

    if (prescription.valid_until < new Date()) {
      throw new BadRequestException('Prescription has expired');
    }

    // Vérifier que toutes les lignes sont délivrées
    const requestedLineIds = new Set(dto.lines.map((l) => l.prescriptionLineId));
    const allLineIds = new Set(prescription.prescription_lines.map((l) => l.id));

    if (requestedLineIds.size !== allLineIds.size || ![...requestedLineIds].every((id) => allLineIds.has(id))) {
      throw new BadRequestException('Not all prescription lines are being dispensed');
    }

    const updated = await this.prisma.prescription.update({
      where: { id: prescriptionId },
      data: {
        status: PrescriptionStatus.DELIVERED,
        pharmacy_notes: dto.lines.map((l) => l.pharmacistNotes).filter(Boolean).join('; '),
      },
      include: {
        prescription_lines: true,
        doctor: {
          select: {
            id: true,
            user: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });

    // Log WRITE
    await this.createAuditLog(
      pharmacyUserId,
      AuditAction.WRITE,
      'PRESCRIPTION',
      prescriptionId,
      {
        status: PrescriptionStatus.DELIVERED,
        dispensedLines: dto.lines.length,
        description: 'Pharmacy dispensed complete prescription',
      },
    );

    return this.formatPrescriptionForPharmacy(updated);
  }

  /**
   * Enregistre une délivrance partielle
   */
  async dispensePartial(pharmacyUserId: string, prescriptionId: string, dto: PharmacyDispenseDto) {
    const prescription = await this.prisma.prescription.findUnique({
      where: { id: prescriptionId },
      include: { prescription_lines: true },
    });

    if (!prescription) {
      throw new NotFoundException('Prescription not found');
    }

    if (prescription.valid_until < new Date()) {
      throw new BadRequestException('Prescription has expired');
    }

    if (dto.lines.length === 0) {
      throw new BadRequestException('At least one line must be dispensed');
    }

    const updated = await this.prisma.prescription.update({
      where: { id: prescriptionId },
      data: {
        status: PrescriptionStatus.PARTIAL,
        pharmacy_notes: dto.lines.map((l) => l.pharmacistNotes).filter(Boolean).join('; '),
      },
      include: {
        prescription_lines: true,
        doctor: {
          select: {
            id: true,
            user: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });

    // Log WRITE
    await this.createAuditLog(
      pharmacyUserId,
      AuditAction.WRITE,
      'PRESCRIPTION',
      prescriptionId,
      {
        status: PrescriptionStatus.PARTIAL,
        dispensedLines: dto.lines.length,
        totalLines: prescription.prescription_lines.length,
        description: 'Pharmacy dispensed partial prescription',
      },
    );

    return this.formatPrescriptionForPharmacy(updated);
  }

  /**
   * Rejette une prescription
   */
  async rejectPrescription(pharmacyUserId: string, prescriptionId: string, dto: PharmacyRejectDto) {
    const prescription = await this.prisma.prescription.findUnique({
      where: { id: prescriptionId },
    });

    if (!prescription) {
      throw new NotFoundException('Prescription not found');
    }

    const updated = await this.prisma.prescription.update({
      where: { id: prescriptionId },
      data: {
        status: PrescriptionStatus.REJECTED,
        pharmacy_notes: dto.reason,
      },
      include: {
        prescription_lines: true,
        doctor: {
          select: {
            id: true,
            user: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });

    // Log WRITE
    await this.createAuditLog(
      pharmacyUserId,
      AuditAction.WRITE,
      'PRESCRIPTION',
      prescriptionId,
      {
        status: PrescriptionStatus.REJECTED,
        reason: dto.reason,
        description: 'Pharmacy rejected prescription',
      },
    );

    return this.formatPrescriptionForPharmacy(updated);
  }

  /**
   * Enregistre une substitution générique
   */
  async substituteDrug(pharmacyUserId: string, prescriptionId: string, dto: PharmacySubstitutionDto) {
    const prescription = await this.prisma.prescription.findUnique({
      where: { id: prescriptionId },
      include: { prescription_lines: true },
    });

    if (!prescription) {
      throw new NotFoundException('Prescription not found');
    }

    const line = prescription.prescription_lines.find((l) => l.id === dto.originalLineId);
    if (!line) {
      throw new NotFoundException('Prescription line not found');
    }

    if (!dto.patientConsented) {
      throw new BadRequestException('Patient must consent to drug substitution');
    }

    // Mettre à jour la ligne de prescription avec la substitution
    // Note: Dans un vrai système, on créerait une table de substitution
    const updated = await this.prisma.prescription.update({
      where: { id: prescriptionId },
      data: {
        pharmacy_notes: `Substitution: ${line.drug_name} (DCI: ${line.dci}) replaced with ${dto.substitutedDrugName} (DCI: ${dto.substitutedDci}) - Patient consented`,
      },
      include: {
        prescription_lines: true,
        doctor: {
          select: {
            id: true,
            user: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });

    // Log WRITE
    await this.createAuditLog(
      pharmacyUserId,
      AuditAction.WRITE,
      'PRESCRIPTION_LINE',
      dto.originalLineId,
      {
        originalDrug: line.drug_name,
        originalDci: line.dci,
        substitutedDrug: dto.substitutedDrugName,
        substitutedDci: dto.substitutedDci,
        patientConsented: true,
        description: 'Pharmacy recorded generic substitution',
      },
    );

    return this.formatPrescriptionForPharmacy(updated);
  }

  /**
   * Récupère l'historique des délivrances de cette pharmacie
   */
  async getPharmacyHistory(_pharmacyUserId: string, limit: number = 50) {
    const prescriptions = await this.prisma.prescription.findMany({
      where: {
        status: { in: [PrescriptionStatus.DELIVERED, PrescriptionStatus.PARTIAL] },
      },
      include: {
        prescription_lines: true,
        doctor: {
          select: {
            id: true,
            user: {
              select: {
                id: true,
              },
            },
          },
        },
      },
      orderBy: { updated_at: 'desc' },
      take: limit,
    });

    return prescriptions.map((rx) => this.formatPrescriptionForPharmacy(rx));
  }

  /**
   * Récupère le log d'accès de cette pharmacie
   */
  async getAccessLog(pharmacyUserId: string, limit: number = 100) {
    const logs = await this.prisma.auditLog.findMany({
      where: {
        actor_uuid: pharmacyUserId,
        resource_type: { in: ['PRESCRIPTION', 'PRESCRIPTION_LINE'] },
      },
      orderBy: { created_at: 'desc' },
      take: limit,
    });

    return logs;
  }

  /**
   * Récupère le profil de la pharmacie courante
   */
  async getPharmacyProfile(pharmacyUserId: string) {
    const pharmacy = await this.prisma.pharmacy.findUnique({
      where: { user_id: pharmacyUserId },
      include: {
        user: {
          select: {
            id: true,
            phone: true,
            email: true,
            created_at: true,
          },
        },
      },
    });

    if (!pharmacy) {
      throw new NotFoundException('Pharmacy not found');
    }

    return pharmacy;
  }

  /**
   * Met à jour le profil de la pharmacie
   */
  async updatePharmacyProfile(pharmacyUserId: string, dto: UpdatePharmacyProfileDto) {
    const pharmacy = await this.prisma.pharmacy.findUnique({
      where: { user_id: pharmacyUserId },
    });

    if (!pharmacy) {
      throw new NotFoundException('Pharmacy not found');
    }

    const updated = await this.prisma.pharmacy.update({
      where: { id: pharmacy.id },
      data: {
        name: dto.name ?? pharmacy.name,
        address: dto.address ?? pharmacy.address,
      },
      include: {
        user: {
          select: {
            id: true,
            phone: true,
            email: true,
            created_at: true,
          },
        },
      },
    });

    // Log WRITE
    await this.createAuditLog(
      pharmacyUserId,
      AuditAction.WRITE,
      'PHARMACY',
      pharmacy.id,
      {
        updates: dto,
        description: 'Pharmacy updated profile',
      },
    );

    return updated;
  }

  /**
   * Formate une prescription pour la pharmacie (masque les données sensibles)
   * MISSION 6: Sécurité - masque intentionnellement le diagnostic et notes SOAP
   */
  private formatPrescriptionForPharmacy(prescription: any) {
    return {
      id: prescription.id,
      status: prescription.status,
      qrCodeToken: prescription.qr_code_token,
      patientInitials: prescription.patient_uuid.substring(0, 2).toUpperCase(),
      patientId: prescription.patient_uuid,
      doctorId: prescription.doctor_id,
      doctorName: prescription.doctor?.user?.id,
      prescriber: prescription.doctor
        ? {
            id: prescription.doctor.id,
            specialty: prescription.doctor.specialty,
          }
        : null,
      createdAt: prescription.created_at,
      validUntil: prescription.valid_until,
      isExpired: prescription.valid_until < new Date(),
      lines: prescription.prescription_lines.map((line: any) => ({
        id: line.id,
        drugName: line.drug_name,
        dosage: line.dosage,
        frequency: line.frequency,
        durationDays: line.duration_days,
        quantity: line.quantity,
        dci: line.dci,
        instructions: line.instructions,
      })),
      pharmacyNotes: prescription.pharmacy_notes,
      // INTENTIONALLY MASKED: diagnosis, assessment, soap_note - never exposed to pharmacy
    };
  }
}
