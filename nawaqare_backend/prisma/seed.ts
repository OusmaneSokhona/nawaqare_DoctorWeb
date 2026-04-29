/**
 * NawaQare — Script de seed (données initiales)
 * Usage: npx ts-node prisma/seed.ts
 */

import {
  PrismaClient,
  UserRole,
  ConsultationMode,
  BookingStatus,
  PaymentMethod,
  PaymentStatus,
  PrescriptionStatus,
} from '@prisma/client';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

/** Mot de passe des comptes seed (overridable via SEED_TEST_PASSWORD) — utiliser login-password */
const SEED_PLAIN_PASSWORD = process.env.SEED_TEST_PASSWORD ?? 'TestNawaqare2024!';

async function main() {
  console.log('🌱 Seeding NawaQare database...\n');

  const password_hash = await bcrypt.hash(SEED_PLAIN_PASSWORD, 10);

  // ─── 1. Créer un médecin de test ─────────────────────────────────────────
  const doctorUser = await prisma.user.upsert({
    where: { phone: '+221771000001' },
    update: { password_hash },
    create: {
      phone: '+221771000001',
      email: 'dr.diallo@nawaqare.sn',
      password_hash,
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
    update: { password_hash },
    create: {
      phone: '+221771000002',
      email: 'dr.ndiaye@nawaqare.sn',
      password_hash,
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
    update: { password_hash },
    create: {
      phone: '+221701000001',
      email: 'patient.test@nawaqare.sn',
      password_hash,
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

  // Stocker le premier créneau pour la réservation de test
  let firstSlotId: string | null = null;

  for (let i = 0; i < 8; i++) {
    const start = new Date(tomorrow);
    start.setMinutes(i * 30);
    const end = new Date(start);
    end.setMinutes(end.getMinutes() + 30);

    const slot = await prisma.timeSlot.create({
      data: {
        doctor_id: doctor.id,
        start_time: start,
        end_time: end,
        is_available: i === 0 ? false : true, // Le premier sera réservé
        consultation_mode: i % 2 === 0 ? ConsultationMode.VIDEO : ConsultationMode.IN_PERSON,
      },
    });

    if (i === 0) {
      firstSlotId = slot.id;
    }
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
    update: { password_hash },
    create: {
      phone: '+221700000000',
      email: 'admin@nawaqare.sn',
      password_hash,
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

  // =========================================================================
  // SECTION ENRICHISSEMENT — Données de test complémentaires
  // =========================================================================

  // ─── A. Pharmacie de test ─────────────────────────────────────────────────
  const pharmacyUser = await prisma.user.upsert({
    where: { phone: '+221338200001' },
    update: { password_hash },
    create: {
      phone: '+221338200001',
      email: 'pharmacie.plateau@nawaqare.sn',
      password_hash,
      role: UserRole.PHARMACIST,
      is_active: true,
      profile: {
        create: {
          first_name: 'Pharmacie',
          last_name: 'Plateau',
          gender: 'M',
        },
      },
    },
  });

  await prisma.pharmacy.upsert({
    where: { user_id: pharmacyUser.id },
    update: {},
    create: {
      user_id: pharmacyUser.id,
      name: 'Pharmacie Plateau',
      address: 'Avenue Léopold Sédar Senghor, Plateau, Dakar',
      ninea: 'NINEA-PH-2024-001',
      subscription_status: 'ACTIVE',
      is_verified: true,
    },
  });

  console.log(`✅ Pharmacie créée: Pharmacie Plateau`);

  // ─── B. Super Admin ───────────────────────────────────────────────────────
  // UserRole ne contient pas SUPER_ADMIN — on utilise ADMIN
  await prisma.user.upsert({
    where: { phone: '+221700000001' },
    update: { password_hash },
    create: {
      phone: '+221700000001',
      email: 'superadmin@nawaqare.sn',
      password_hash,
      role: UserRole.ADMIN,
      is_active: true,
      profile: {
        create: {
          first_name: 'Super',
          last_name: 'Admin',
          gender: 'M',
        },
      },
    },
  });

  console.log(`✅ Super Admin créé`);

  // ─── C. Réservation confirmée ─────────────────────────────────────────────
  // Utilise le premier créneau créé (i=0, VIDEO)
  const bookingIdempotencyKey = `seed_booking_aissatou_diallo_slot0`;

  const booking = await prisma.booking.upsert({
    where: { idempotency_key: bookingIdempotencyKey },
    update: {},
    create: {
      patient_uuid: patientUser.id,
      doctor_id: doctor.id,
      slot_id: firstSlotId!,
      status: BookingStatus.CONFIRMED,
      consultation_mode: ConsultationMode.VIDEO,
      notes_patient: 'Maux de tête et fatigue depuis 3 jours.',
      idempotency_key: bookingIdempotencyKey,
    },
  });

  console.log(`✅ Réservation confirmée créée`);

  // ─── D. Consultation + SoapNote ──────────────────────────────────────────
  // Consultation liée à la réservation
  const existingConsultation = await prisma.consultation.findUnique({
    where: { booking_id: booking.id },
  });

  const consultation = existingConsultation ?? await prisma.consultation.create({
    data: {
      booking_id: booking.id,
      patient_uuid: patientUser.id,
      doctor_id: doctor.id,
      status: 'COMPLETED',
      started_at: new Date(Date.now() - 60 * 60 * 1000), // il y a 1h
      ended_at: new Date(Date.now() - 30 * 60 * 1000),   // il y a 30 min
      janus_room_id: `room_${crypto.randomUUID()}`,
    },
  });

  // SoapNote liée à la consultation
  const existingSoapNote = await prisma.soapNote.findUnique({
    where: { consultation_id: consultation.id },
  });

  if (!existingSoapNote) {
    await prisma.soapNote.create({
      data: {
        consultation_id: consultation.id,
        subjective: 'Patiente se plaint de maux de tête et fatigue depuis 3 jours',
        objective: 'TA 120/80, T° 37.2°C, FR 18/min',
        assessment: 'Céphalées de tension — J00 (ICD-10)',
        diagnosis_code: 'J00',
        diagnosis_label: 'Rhinopharyngite aiguë',
        plan: 'Paracétamol 1g x3/j pendant 5 jours, repos, hydratation',
        follow_up_days: 7,
        is_signed: true,
        signed_at: new Date(),
        signed_by: doctor.user_id,
      },
    });
  }

  console.log(`✅ Consultation COMPLETED + SoapNote créées`);

  // ─── E. Prescription + lignes ─────────────────────────────────────────────
  const qrToken = crypto.randomUUID();
  const validUntil = new Date();
  validUntil.setDate(validUntil.getDate() + 30); // valable 30 jours

  const prescription = await prisma.prescription.create({
    data: {
      consultation_id: consultation.id,
      doctor_id: doctor.id,
      patient_uuid: patientUser.id,
      status: PrescriptionStatus.VALIDATED,
      valid_until: validUntil,
      qr_code_token: qrToken,
      is_signed: true,
      signed_at: new Date(),
      prescription_lines: {
        create: [
          {
            drug_name: 'Paracétamol 1g',
            dosage: '1 comprimé',
            frequency: '3 fois par jour',
            duration_days: 5,
            quantity: 15,
            instructions: 'À prendre pendant ou après les repas',
            dci: 'Paracétamol',
          },
          {
            drug_name: 'Vitamine C 500mg',
            dosage: '1 comprimé',
            frequency: '1 fois par jour',
            duration_days: 10,
            quantity: 10,
            instructions: 'À prendre le matin',
            dci: 'Acide ascorbique',
          },
        ],
      },
    },
  });

  console.log(`✅ Prescription créée (QR token: ${prescription.qr_code_token})`);

  // ─── F. Paiement lié à la réservation ────────────────────────────────────
  // PaymentMethod disponibles : ORANGE_MONEY, WAVE, VISA_MASTERCARD
  // Pas de MOBILE_MONEY dans l'enum — on utilise ORANGE_MONEY
  const paymentIdempotencyKey = `seed_payment_booking_${booking.id}`;

  await prisma.payment.upsert({
    where: { booking_id: booking.id },
    update: {},
    create: {
      booking_id: booking.id,
      amount: 15000,
      currency: 'XOF',
      method: PaymentMethod.ORANGE_MONEY,
      status: PaymentStatus.SUCCESS,
      idempotency_key: paymentIdempotencyKey,
      external_ref: `OM-${crypto.randomUUID().substring(0, 8).toUpperCase()}`,
      webhook_received_at: new Date(),
    },
  });

  console.log(`✅ Paiement 15 000 XOF (Orange Money) créé`);

  // ─── G. Vaccination pour la patiente ─────────────────────────────────────
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const sixMonthsFromNow = new Date();
  sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);

  // Pas de contrainte unique sur Vaccination — on crée seulement si absent
  const existingVaccination = await prisma.vaccination.findFirst({
    where: {
      patient_uuid: patientUser.id,
      vaccine_name: 'Vaccin anti-tétanique',
      dose_number: 1,
    },
  });

  if (!existingVaccination) {
    await prisma.vaccination.create({
      data: {
        patient_uuid: patientUser.id,
        vaccine_name: 'Vaccin anti-tétanique',
        dose_number: 1,
        total_doses: 3,
        date_given: sixMonthsAgo,
        next_due: sixMonthsFromNow,
        status: 'COMPLETED',
        administered_by: doctor.id,
      },
    });
  }

  console.log(`✅ Vaccination anti-tétanique (dose 1) enregistrée`);

  // ─── Résumé ───────────────────────────────────────────────────────────────
  const counts = await Promise.all([
    prisma.user.count(),
    prisma.doctor.count(),
    prisma.pharmacy.count(),
    prisma.timeSlot.count(),
    prisma.booking.count(),
    prisma.consultation.count(),
    prisma.prescription.count(),
    prisma.payment.count(),
    prisma.vaccination.count(),
    prisma.complianceItem.count(),
  ]);

  console.log(`\n📊 Base de données:
  → ${counts[0]} utilisateurs
  → ${counts[1]} médecins
  → ${counts[2]} pharmacies
  → ${counts[3]} créneaux
  → ${counts[4]} réservations
  → ${counts[5]} consultations
  → ${counts[6]} prescriptions
  → ${counts[7]} paiements
  → ${counts[8]} vaccinations
  → ${counts[9]} items conformité\n`);

  console.log('🎉 Seed terminé avec succès!');
  console.log('\n🔑 Comptes de test:');
  console.log('   Médecin:     +221771000001 (Dr. Mamadou Diallo — Médecine générale)');
  console.log('   Spécialiste: +221771000002 (Dr. Fatou Ndiaye — Cardiologie)');
  console.log('   Patient:     +221701000001 (Aissatou Ba)');
  console.log('   Admin:       +221700000000');
  console.log('   Pharmacie:   +221338200001 (Pharmacie Plateau)');
  console.log('   Super Admin: +221700000001');
  console.log(`\n   Mot de passe (tous les comptes seed): ${SEED_PLAIN_PASSWORD}`);
  console.log('   Web / API: POST /api/v1/auth/login-password { "identifier": "<email ou +221...>", "password": "..." }');
  console.log('\n   Flux mobile (OTP): POST /api/v1/auth/login → OTP → POST /api/v1/auth/verify-login-otp');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
