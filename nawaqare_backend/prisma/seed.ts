/**
 * NawaQare — Script de seed (données initiales)
 * Usage: npx ts-node prisma/seed.ts
 */

import { PrismaClient, UserRole, ConsultationMode } from '@prisma/client';
import * as crypto from 'crypto';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding NawaQare database...\n');

  // ─── 1. Créer un médecin de test ─────────────────────────────────────────
  const doctorUser = await prisma.user.upsert({
    where: { phone: '+221771000001' },
    update: {},
    create: {
      phone: '+221771000001',
      email: 'dr.diallo@nawaqare.sn',
      role: UserRole.DOCTOR,
      is_active: true,
      profile: {
        create: {
          first_name: 'Mamadou',
          last_name: 'Diallo',
          gender: 'M',
          blood_group: 'O+',
        },
      },
    },
  });

  const doctor = await prisma.doctor.upsert({
    where: { user_id: doctorUser.id },
    update: {},
    create: {
      user_id: doctorUser.id,
      onmc_number: 'ONMC-2024-00001',
      specialty: 'Médecine générale',
      tarif_xof: 15000,
      bio: 'Médecin généraliste avec 10 ans d\'expérience à Dakar.',
      is_verified: true,
      languages: ['français', 'wolof'],
      consultation_modes: [ConsultationMode.VIDEO, ConsultationMode.IN_PERSON],
    },
  });

  console.log(`✅ Médecin créé: Dr. ${doctorUser.id} — ONMC ${doctor.onmc_number}`);

  // ─── 2. Créer un médecin spécialiste ─────────────────────────────────────
  const specialistUser = await prisma.user.upsert({
    where: { phone: '+221771000002' },
    update: {},
    create: {
      phone: '+221771000002',
      email: 'dr.ndiaye@nawaqare.sn',
      role: UserRole.DOCTOR,
      is_active: true,
      profile: {
        create: {
          first_name: 'Fatou',
          last_name: 'Ndiaye',
          gender: 'F',
        },
      },
    },
  });

  await prisma.doctor.upsert({
    where: { user_id: specialistUser.id },
    update: {},
    create: {
      user_id: specialistUser.id,
      onmc_number: 'ONMC-2024-00002',
      specialty: 'Cardiologie',
      tarif_xof: 25000,
      bio: 'Cardiologue, ancienne résidente à l\'Hôpital Principal de Dakar.',
      is_verified: true,
      languages: ['français', 'wolof', 'anglais'],
      consultation_modes: [ConsultationMode.VIDEO, ConsultationMode.IN_PERSON],
    },
  });

  console.log(`✅ Spécialiste créé: Dr. Fatou Ndiaye — Cardiologie`);

  // ─── 3. Créer un patient de test ──────────────────────────────────────────
  const patientUser = await prisma.user.upsert({
    where: { phone: '+221701000001' },
    update: {},
    create: {
      phone: '+221701000001',
      email: 'patient.test@nawaqare.sn',
      role: UserRole.PATIENT,
      is_active: true,
      profile: {
        create: {
          first_name: 'Aissatou',
          last_name: 'Ba',
          gender: 'F',
          birth_date: new Date('1990-05-15'),
          blood_group: 'A+',
          emergency_contact_name: 'Mamadou Ba',
          emergency_contact_phone: '+221701000002',
        },
      },
    },
  });

  console.log(`✅ Patient créé: Aissatou Ba`);

  // ─── 4. Créer des créneaux pour le médecin ────────────────────────────────
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(9, 0, 0, 0);

  for (let i = 0; i < 8; i++) {
    const start = new Date(tomorrow);
    start.setMinutes(i * 30);
    const end = new Date(start);
    end.setMinutes(end.getMinutes() + 30);

    await prisma.timeSlot.create({
      data: {
        doctor_id: doctor.id,
        start_time: start,
        end_time: end,
        is_available: true,
        consultation_mode: i % 2 === 0 ? ConsultationMode.VIDEO : ConsultationMode.IN_PERSON,
      },
    });
  }

  console.log(`✅ 8 créneaux créés pour Dr. Diallo`);

  // ─── 5. Créer des items de conformité pour le médecin ────────────────────
  const complianceItems = [
    { item_type: 'ONMC_LICENSE', status: 'VERIFIED' as const, expires_at: new Date('2026-12-31') },
    { item_type: 'MALPRACTICE_INSURANCE', status: 'EXPIRING_SOON' as const, expires_at: new Date('2026-06-30') },
    { item_type: 'CME_CREDITS', status: 'VERIFIED' as const, expires_at: new Date('2026-09-30') },
    { item_type: 'ID_VERIFICATION', status: 'VERIFIED' as const, expires_at: null },
  ];

  for (const item of complianceItems) {
    await prisma.complianceItem.create({
      data: {
        doctor_id: doctor.id,
        item_type: item.item_type,
        status: item.status,
        expires_at: item.expires_at,
        verified_at: item.status === 'VERIFIED' ? new Date() : null,
      },
    });
  }

  console.log(`✅ Items de conformité créés`);

  // ─── 6. Créer un admin ────────────────────────────────────────────────────
  await prisma.user.upsert({
    where: { phone: '+221700000000' },
    update: {},
    create: {
      phone: '+221700000000',
      email: 'admin@nawaqare.sn',
      role: UserRole.ADMIN,
      is_active: true,
      profile: {
        create: {
          first_name: 'Admin',
          last_name: 'NawaQare',
          gender: 'M',
        },
      },
    },
  });

  console.log(`✅ Admin créé`);

  // ─── Résumé ───────────────────────────────────────────────────────────────
  const counts = await Promise.all([
    prisma.user.count(),
    prisma.doctor.count(),
    prisma.timeSlot.count(),
    prisma.complianceItem.count(),
  ]);

  console.log(`\n📊 Base de données:
  → ${counts[0]} utilisateurs
  → ${counts[1]} médecins
  → ${counts[2]} créneaux
  → ${counts[3]} items conformité\n`);

  console.log('🎉 Seed terminé avec succès!');
  console.log('\n🔑 Comptes de test:');
  console.log('   Médecin:     +221771000001 (Dr. Mamadou Diallo — Médecine générale)');
  console.log('   Spécialiste: +221771000002 (Dr. Fatou Ndiaye — Cardiologie)');
  console.log('   Patient:     +221701000001 (Aissatou Ba)');
  console.log('   Admin:       +221700000000');
  console.log('\n   Flux de connexion: POST /api/v1/auth/login → OTP → POST /api/v1/auth/verify-login-otp');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
