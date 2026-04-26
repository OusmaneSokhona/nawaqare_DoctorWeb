-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('PATIENT', 'DOCTOR', 'PHARMACIST', 'ADMIN');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('CREATED', 'CONFIRMED', 'RESCHEDULED', 'CANCELLED', 'IN_PROGRESS', 'COMPLETED', 'NO_SHOW');

-- CreateEnum
CREATE TYPE "ConsultationMode" AS ENUM ('VIDEO', 'IN_PERSON', 'HOME_VISIT');

-- CreateEnum
CREATE TYPE "PrescriptionStatus" AS ENUM ('CREATED', 'SENT', 'RECEIVED', 'VALIDATED', 'PARTIAL', 'REJECTED', 'PREPARED', 'DELIVERED');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('ORDONNANCE', 'RESULTAT_LABO', 'IMAGERIE', 'CERTIFICAT', 'ATTESTATION', 'ARRET_TRAVAIL', 'AUTRE');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('ORANGE_MONEY', 'WAVE', 'VISA_MASTERCARD');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "ConsentType" AS ENUM ('MEDICAL_RECORD_ACCESS', 'DATA_PROCESSING', 'RESEARCH_ANONYMIZED');

-- CreateEnum
CREATE TYPE "ExamOrderStatus" AS ENUM ('REQUESTED', 'SENT_TO_PATIENT', 'COMPLETED', 'RESULTS_AVAILABLE', 'REVIEWED');

-- CreateEnum
CREATE TYPE "ExamOrderType" AS ENUM ('BLOOD_TEST', 'URINE_TEST', 'IMAGING', 'BIOPSY', 'OTHER');

-- CreateEnum
CREATE TYPE "ExamPriority" AS ENUM ('ROUTINE', 'URGENT', 'STAT');

-- CreateEnum
CREATE TYPE "ReferenceStatus" AS ENUM ('SENT', 'ACCEPTED', 'RESPONDED');

-- CreateEnum
CREATE TYPE "CertificateType" AS ENUM ('MEDICAL_CERTIFICATE', 'SICK_LEAVE', 'ATTESTATION');

-- CreateEnum
CREATE TYPE "MessageCategory" AS ENUM ('TREATMENT_QUESTION', 'SIDE_EFFECTS', 'ADMINISTRATIVE', 'FOLLOW_UP');

-- CreateEnum
CREATE TYPE "ComplianceItemStatus" AS ENUM ('VERIFIED', 'EXPIRING_SOON', 'EXPIRED', 'MISSING');

-- CreateEnum
CREATE TYPE "AuditAction" AS ENUM ('READ', 'WRITE', 'EXPORT', 'DELETE', 'LOGIN', 'LOGOUT', 'EMERGENCY_ACCESS');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('SMS', 'PUSH', 'EMAIL');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'PATIENT',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_locked" BOOLEAN NOT NULL DEFAULT false,
    "failed_attempts" INTEGER NOT NULL DEFAULT 0,
    "locked_until" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_profiles" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "birth_date" TIMESTAMP(3),
    "gender" TEXT,
    "nina_encrypted" TEXT,
    "address_encrypted" TEXT,
    "blood_group" TEXT,
    "profile_photo_url" TEXT,
    "emergency_contact_name" TEXT,
    "emergency_contact_phone" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refresh_tokens" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "token_hash" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "revoked" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "device_info" TEXT,
    "ip_address" TEXT,
    "last_active" TIMESTAMP(3) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mfa_configs" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "method" TEXT NOT NULL,
    "secret_encrypted" TEXT,
    "is_enabled" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mfa_configs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "otp_codes" (
    "id" UUID NOT NULL,
    "registration_id" UUID NOT NULL,
    "phone" TEXT NOT NULL,
    "code_hash" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "otp_codes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consents" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "consent_type" "ConsentType" NOT NULL,
    "granted" BOOLEAN NOT NULL,
    "granted_at" TIMESTAMP(3),
    "revoked_at" TIMESTAMP(3),
    "ip_address" TEXT,
    "version" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "consents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "doctors" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "onmc_number" TEXT NOT NULL,
    "specialty" TEXT NOT NULL,
    "tarif_xof" INTEGER NOT NULL,
    "bio" TEXT,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "verification_status" TEXT,
    "languages" TEXT[],
    "rating" DECIMAL(3,2) NOT NULL DEFAULT 0,
    "total_consultations" INTEGER NOT NULL DEFAULT 0,
    "consultation_modes" "ConsultationMode"[] DEFAULT ARRAY[]::"ConsultationMode"[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "doctors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "doctor_structures" (
    "id" UUID NOT NULL,
    "doctor_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "doctor_structures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "time_slots" (
    "id" UUID NOT NULL,
    "doctor_id" UUID NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "is_available" BOOLEAN NOT NULL DEFAULT true,
    "consultation_mode" "ConsultationMode" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "time_slots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pharmacies" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "ninea" TEXT NOT NULL,
    "subscription_status" TEXT,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pharmacies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookings" (
    "id" UUID NOT NULL,
    "patient_uuid" UUID NOT NULL,
    "doctor_id" UUID NOT NULL,
    "slot_id" UUID NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'CREATED',
    "consultation_mode" "ConsultationMode" NOT NULL,
    "notes_patient" TEXT,
    "idempotency_key" TEXT NOT NULL,
    "cancelled_reason" TEXT,
    "cancelled_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consultations" (
    "id" UUID NOT NULL,
    "booking_id" UUID NOT NULL,
    "janus_room_id" TEXT,
    "status" TEXT NOT NULL DEFAULT 'CREATED',
    "started_at" TIMESTAMP(3),
    "ended_at" TIMESTAMP(3),
    "patient_uuid" UUID NOT NULL,
    "doctor_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "consultations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "soap_notes" (
    "id" UUID NOT NULL,
    "consultation_id" UUID NOT NULL,
    "subjective" TEXT,
    "objective" TEXT,
    "assessment" TEXT,
    "diagnosis_code" TEXT,
    "diagnosis_label" TEXT,
    "plan" TEXT,
    "follow_up_days" INTEGER,
    "is_signed" BOOLEAN NOT NULL DEFAULT false,
    "signed_at" TIMESTAMP(3),
    "signed_by" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "soap_notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prescriptions" (
    "id" UUID NOT NULL,
    "consultation_id" UUID NOT NULL,
    "doctor_id" UUID NOT NULL,
    "patient_uuid" UUID NOT NULL,
    "status" "PrescriptionStatus" NOT NULL DEFAULT 'CREATED',
    "valid_until" TIMESTAMP(3) NOT NULL,
    "qr_code_token" TEXT NOT NULL,
    "signed_hash" TEXT,
    "is_signed" BOOLEAN NOT NULL DEFAULT false,
    "signed_at" TIMESTAMP(3),
    "pharmacy_notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "prescriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prescription_lines" (
    "id" UUID NOT NULL,
    "prescription_id" UUID NOT NULL,
    "drug_name" TEXT NOT NULL,
    "dosage" TEXT NOT NULL,
    "frequency" TEXT NOT NULL,
    "duration_days" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "instructions" TEXT,
    "dci" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "prescription_lines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medical_documents" (
    "id" UUID NOT NULL,
    "patient_uuid" UUID NOT NULL,
    "uploaded_by" UUID NOT NULL,
    "doc_type" "DocumentType" NOT NULL,
    "s3_key" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "mime_type" TEXT NOT NULL,
    "size_bytes" INTEGER NOT NULL,
    "description" TEXT,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "consultation_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "medical_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" UUID NOT NULL,
    "booking_id" UUID NOT NULL,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'XOF',
    "method" "PaymentMethod" NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "external_ref" TEXT,
    "idempotency_key" TEXT NOT NULL,
    "redirect_url" TEXT,
    "webhook_received_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exam_orders" (
    "id" UUID NOT NULL,
    "consultation_id" UUID NOT NULL,
    "patient_uuid" UUID NOT NULL,
    "doctor_id" UUID NOT NULL,
    "type" "ExamOrderType" NOT NULL,
    "priority" "ExamPriority" NOT NULL DEFAULT 'ROUTINE',
    "description" TEXT NOT NULL,
    "instructions" TEXT,
    "notes_patient" TEXT,
    "status" "ExamOrderStatus" NOT NULL DEFAULT 'REQUESTED',
    "result_document_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exam_orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reference_lettres" (
    "id" UUID NOT NULL,
    "consultation_id" UUID NOT NULL,
    "from_doctor_id" UUID NOT NULL,
    "specialty_target" TEXT NOT NULL,
    "urgency" TEXT NOT NULL,
    "clinical_summary" TEXT NOT NULL,
    "referral_reason" TEXT NOT NULL,
    "status" "ReferenceStatus" NOT NULL DEFAULT 'SENT',
    "response_text" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reference_lettres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medical_certificates" (
    "id" UUID NOT NULL,
    "consultation_id" UUID NOT NULL,
    "doctor_id" UUID NOT NULL,
    "patient_uuid" UUID NOT NULL,
    "type" "CertificateType" NOT NULL,
    "content" TEXT NOT NULL,
    "duration_days" INTEGER,
    "is_signed" BOOLEAN NOT NULL DEFAULT false,
    "signed_at" TIMESTAMP(3),
    "s3_key" TEXT,
    "document_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "medical_certificates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "follow_up_plans" (
    "id" UUID NOT NULL,
    "consultation_id" UUID NOT NULL,
    "objectives" JSONB NOT NULL,
    "control_visits" JSONB NOT NULL,
    "reminders" JSONB NOT NULL,
    "red_flags" JSONB NOT NULL,
    "patient_summary_fr" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "follow_up_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conversations" (
    "id" UUID NOT NULL,
    "patient_uuid" UUID NOT NULL,
    "doctor_id" UUID NOT NULL,
    "consultation_id" UUID,
    "context_label" TEXT,
    "is_closed" BOOLEAN NOT NULL DEFAULT false,
    "closed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "conversations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" UUID NOT NULL,
    "conversation_id" UUID NOT NULL,
    "sender_uuid" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "category" "MessageCategory",
    "attachment_id" UUID,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "read_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vaccinations" (
    "id" UUID NOT NULL,
    "patient_uuid" UUID NOT NULL,
    "vaccine_name" TEXT NOT NULL,
    "date_given" TIMESTAMP(3),
    "dose_number" INTEGER NOT NULL,
    "total_doses" INTEGER NOT NULL,
    "next_due" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'SCHEDULED',
    "certificate_doc_id" TEXT,
    "administered_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vaccinations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "team_members" (
    "id" UUID NOT NULL,
    "doctor_id" UUID NOT NULL,
    "member_user_id" UUID NOT NULL,
    "role" TEXT NOT NULL,
    "permissions" JSONB NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "invited_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "joined_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "team_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "compliance_items" (
    "id" UUID NOT NULL,
    "doctor_id" UUID NOT NULL,
    "item_type" TEXT NOT NULL,
    "status" "ComplianceItemStatus" NOT NULL DEFAULT 'MISSING',
    "document_url" TEXT,
    "expires_at" TIMESTAMP(3),
    "verified_at" TIMESTAMP(3),
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "compliance_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" UUID NOT NULL,
    "actor_uuid" UUID NOT NULL,
    "target_uuid" UUID,
    "action" "AuditAction" NOT NULL,
    "resource_type" TEXT NOT NULL,
    "resource_id" TEXT,
    "ip_address" TEXT,
    "user_agent" TEXT,
    "details" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "type" "NotificationType" NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "data" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE INDEX "users_phone_idx" ON "users"("phone");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "users"("role");

-- CreateIndex
CREATE INDEX "users_is_active_idx" ON "users"("is_active");

-- CreateIndex
CREATE UNIQUE INDEX "user_profiles_user_id_key" ON "user_profiles"("user_id");

-- CreateIndex
CREATE INDEX "user_profiles_user_id_idx" ON "user_profiles"("user_id");

-- CreateIndex
CREATE INDEX "user_profiles_first_name_last_name_idx" ON "user_profiles"("first_name", "last_name");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_token_hash_key" ON "refresh_tokens"("token_hash");

-- CreateIndex
CREATE INDEX "refresh_tokens_user_id_idx" ON "refresh_tokens"("user_id");

-- CreateIndex
CREATE INDEX "refresh_tokens_token_hash_idx" ON "refresh_tokens"("token_hash");

-- CreateIndex
CREATE INDEX "refresh_tokens_revoked_idx" ON "refresh_tokens"("revoked");

-- CreateIndex
CREATE INDEX "sessions_user_id_idx" ON "sessions"("user_id");

-- CreateIndex
CREATE INDEX "sessions_is_active_idx" ON "sessions"("is_active");

-- CreateIndex
CREATE INDEX "sessions_created_at_idx" ON "sessions"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "mfa_configs_user_id_key" ON "mfa_configs"("user_id");

-- CreateIndex
CREATE INDEX "mfa_configs_user_id_idx" ON "mfa_configs"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "otp_codes_registration_id_key" ON "otp_codes"("registration_id");

-- CreateIndex
CREATE INDEX "otp_codes_phone_idx" ON "otp_codes"("phone");

-- CreateIndex
CREATE INDEX "otp_codes_expires_at_idx" ON "otp_codes"("expires_at");

-- CreateIndex
CREATE INDEX "otp_codes_used_idx" ON "otp_codes"("used");

-- CreateIndex
CREATE INDEX "consents_user_id_idx" ON "consents"("user_id");

-- CreateIndex
CREATE INDEX "consents_consent_type_idx" ON "consents"("consent_type");

-- CreateIndex
CREATE INDEX "consents_granted_idx" ON "consents"("granted");

-- CreateIndex
CREATE UNIQUE INDEX "doctors_user_id_key" ON "doctors"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "doctors_onmc_number_key" ON "doctors"("onmc_number");

-- CreateIndex
CREATE INDEX "doctors_user_id_idx" ON "doctors"("user_id");

-- CreateIndex
CREATE INDEX "doctors_specialty_idx" ON "doctors"("specialty");

-- CreateIndex
CREATE INDEX "doctors_is_verified_idx" ON "doctors"("is_verified");

-- CreateIndex
CREATE INDEX "doctors_onmc_number_idx" ON "doctors"("onmc_number");

-- CreateIndex
CREATE INDEX "doctor_structures_doctor_id_idx" ON "doctor_structures"("doctor_id");

-- CreateIndex
CREATE INDEX "time_slots_doctor_id_idx" ON "time_slots"("doctor_id");

-- CreateIndex
CREATE INDEX "time_slots_start_time_idx" ON "time_slots"("start_time");

-- CreateIndex
CREATE INDEX "time_slots_is_available_idx" ON "time_slots"("is_available");

-- CreateIndex
CREATE UNIQUE INDEX "pharmacies_user_id_key" ON "pharmacies"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "pharmacies_ninea_key" ON "pharmacies"("ninea");

-- CreateIndex
CREATE INDEX "pharmacies_user_id_idx" ON "pharmacies"("user_id");

-- CreateIndex
CREATE INDEX "pharmacies_ninea_idx" ON "pharmacies"("ninea");

-- CreateIndex
CREATE INDEX "pharmacies_is_verified_idx" ON "pharmacies"("is_verified");

-- CreateIndex
CREATE UNIQUE INDEX "bookings_slot_id_key" ON "bookings"("slot_id");

-- CreateIndex
CREATE UNIQUE INDEX "bookings_idempotency_key_key" ON "bookings"("idempotency_key");

-- CreateIndex
CREATE INDEX "bookings_patient_uuid_idx" ON "bookings"("patient_uuid");

-- CreateIndex
CREATE INDEX "bookings_doctor_id_idx" ON "bookings"("doctor_id");

-- CreateIndex
CREATE INDEX "bookings_status_idx" ON "bookings"("status");

-- CreateIndex
CREATE INDEX "bookings_created_at_idx" ON "bookings"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "consultations_booking_id_key" ON "consultations"("booking_id");

-- CreateIndex
CREATE INDEX "consultations_booking_id_idx" ON "consultations"("booking_id");

-- CreateIndex
CREATE INDEX "consultations_patient_uuid_idx" ON "consultations"("patient_uuid");

-- CreateIndex
CREATE INDEX "consultations_doctor_id_idx" ON "consultations"("doctor_id");

-- CreateIndex
CREATE INDEX "consultations_status_idx" ON "consultations"("status");

-- CreateIndex
CREATE UNIQUE INDEX "soap_notes_consultation_id_key" ON "soap_notes"("consultation_id");

-- CreateIndex
CREATE INDEX "soap_notes_consultation_id_idx" ON "soap_notes"("consultation_id");

-- CreateIndex
CREATE INDEX "soap_notes_is_signed_idx" ON "soap_notes"("is_signed");

-- CreateIndex
CREATE UNIQUE INDEX "prescriptions_qr_code_token_key" ON "prescriptions"("qr_code_token");

-- CreateIndex
CREATE INDEX "prescriptions_consultation_id_idx" ON "prescriptions"("consultation_id");

-- CreateIndex
CREATE INDEX "prescriptions_patient_uuid_idx" ON "prescriptions"("patient_uuid");

-- CreateIndex
CREATE INDEX "prescriptions_doctor_id_idx" ON "prescriptions"("doctor_id");

-- CreateIndex
CREATE INDEX "prescriptions_status_idx" ON "prescriptions"("status");

-- CreateIndex
CREATE INDEX "prescriptions_qr_code_token_idx" ON "prescriptions"("qr_code_token");

-- CreateIndex
CREATE INDEX "prescription_lines_prescription_id_idx" ON "prescription_lines"("prescription_id");

-- CreateIndex
CREATE INDEX "medical_documents_patient_uuid_idx" ON "medical_documents"("patient_uuid");

-- CreateIndex
CREATE INDEX "medical_documents_doc_type_idx" ON "medical_documents"("doc_type");

-- CreateIndex
CREATE INDEX "medical_documents_consultation_id_idx" ON "medical_documents"("consultation_id");

-- CreateIndex
CREATE INDEX "medical_documents_is_deleted_idx" ON "medical_documents"("is_deleted");

-- CreateIndex
CREATE UNIQUE INDEX "payments_booking_id_key" ON "payments"("booking_id");

-- CreateIndex
CREATE UNIQUE INDEX "payments_idempotency_key_key" ON "payments"("idempotency_key");

-- CreateIndex
CREATE INDEX "payments_booking_id_idx" ON "payments"("booking_id");

-- CreateIndex
CREATE INDEX "payments_status_idx" ON "payments"("status");

-- CreateIndex
CREATE INDEX "payments_external_ref_idx" ON "payments"("external_ref");

-- CreateIndex
CREATE INDEX "exam_orders_consultation_id_idx" ON "exam_orders"("consultation_id");

-- CreateIndex
CREATE INDEX "exam_orders_patient_uuid_idx" ON "exam_orders"("patient_uuid");

-- CreateIndex
CREATE INDEX "exam_orders_doctor_id_idx" ON "exam_orders"("doctor_id");

-- CreateIndex
CREATE INDEX "exam_orders_type_idx" ON "exam_orders"("type");

-- CreateIndex
CREATE INDEX "exam_orders_priority_idx" ON "exam_orders"("priority");

-- CreateIndex
CREATE INDEX "exam_orders_status_idx" ON "exam_orders"("status");

-- CreateIndex
CREATE INDEX "reference_lettres_consultation_id_idx" ON "reference_lettres"("consultation_id");

-- CreateIndex
CREATE INDEX "reference_lettres_from_doctor_id_idx" ON "reference_lettres"("from_doctor_id");

-- CreateIndex
CREATE INDEX "reference_lettres_status_idx" ON "reference_lettres"("status");

-- CreateIndex
CREATE INDEX "medical_certificates_consultation_id_idx" ON "medical_certificates"("consultation_id");

-- CreateIndex
CREATE INDEX "medical_certificates_doctor_id_idx" ON "medical_certificates"("doctor_id");

-- CreateIndex
CREATE INDEX "medical_certificates_patient_uuid_idx" ON "medical_certificates"("patient_uuid");

-- CreateIndex
CREATE INDEX "medical_certificates_type_idx" ON "medical_certificates"("type");

-- CreateIndex
CREATE UNIQUE INDEX "follow_up_plans_consultation_id_key" ON "follow_up_plans"("consultation_id");

-- CreateIndex
CREATE INDEX "follow_up_plans_consultation_id_idx" ON "follow_up_plans"("consultation_id");

-- CreateIndex
CREATE INDEX "conversations_patient_uuid_idx" ON "conversations"("patient_uuid");

-- CreateIndex
CREATE INDEX "conversations_doctor_id_idx" ON "conversations"("doctor_id");

-- CreateIndex
CREATE INDEX "conversations_consultation_id_idx" ON "conversations"("consultation_id");

-- CreateIndex
CREATE INDEX "conversations_is_closed_idx" ON "conversations"("is_closed");

-- CreateIndex
CREATE INDEX "messages_conversation_id_idx" ON "messages"("conversation_id");

-- CreateIndex
CREATE INDEX "messages_sender_uuid_idx" ON "messages"("sender_uuid");

-- CreateIndex
CREATE INDEX "messages_is_read_idx" ON "messages"("is_read");

-- CreateIndex
CREATE INDEX "messages_created_at_idx" ON "messages"("created_at");

-- CreateIndex
CREATE INDEX "vaccinations_patient_uuid_idx" ON "vaccinations"("patient_uuid");

-- CreateIndex
CREATE INDEX "vaccinations_vaccine_name_idx" ON "vaccinations"("vaccine_name");

-- CreateIndex
CREATE INDEX "vaccinations_status_idx" ON "vaccinations"("status");

-- CreateIndex
CREATE INDEX "team_members_doctor_id_idx" ON "team_members"("doctor_id");

-- CreateIndex
CREATE INDEX "team_members_member_user_id_idx" ON "team_members"("member_user_id");

-- CreateIndex
CREATE INDEX "team_members_status_idx" ON "team_members"("status");

-- CreateIndex
CREATE INDEX "compliance_items_doctor_id_idx" ON "compliance_items"("doctor_id");

-- CreateIndex
CREATE INDEX "compliance_items_status_idx" ON "compliance_items"("status");

-- CreateIndex
CREATE INDEX "compliance_items_expires_at_idx" ON "compliance_items"("expires_at");

-- CreateIndex
CREATE INDEX "audit_logs_actor_uuid_idx" ON "audit_logs"("actor_uuid");

-- CreateIndex
CREATE INDEX "audit_logs_target_uuid_idx" ON "audit_logs"("target_uuid");

-- CreateIndex
CREATE INDEX "audit_logs_action_idx" ON "audit_logs"("action");

-- CreateIndex
CREATE INDEX "audit_logs_resource_type_idx" ON "audit_logs"("resource_type");

-- CreateIndex
CREATE INDEX "audit_logs_created_at_idx" ON "audit_logs"("created_at");

-- CreateIndex
CREATE INDEX "notifications_user_id_idx" ON "notifications"("user_id");

-- CreateIndex
CREATE INDEX "notifications_type_idx" ON "notifications"("type");

-- CreateIndex
CREATE INDEX "notifications_is_read_idx" ON "notifications"("is_read");

-- CreateIndex
CREATE INDEX "notifications_created_at_idx" ON "notifications"("created_at");

-- AddForeignKey
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mfa_configs" ADD CONSTRAINT "mfa_configs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consents" ADD CONSTRAINT "consents_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctor_structures" ADD CONSTRAINT "doctor_structures_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_slots" ADD CONSTRAINT "time_slots_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pharmacies" ADD CONSTRAINT "pharmacies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_slot_id_fkey" FOREIGN KEY ("slot_id") REFERENCES "time_slots"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consultations" ADD CONSTRAINT "consultations_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "bookings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consultations" ADD CONSTRAINT "consultations_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "soap_notes" ADD CONSTRAINT "soap_notes_consultation_id_fkey" FOREIGN KEY ("consultation_id") REFERENCES "consultations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prescriptions" ADD CONSTRAINT "prescriptions_consultation_id_fkey" FOREIGN KEY ("consultation_id") REFERENCES "consultations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prescriptions" ADD CONSTRAINT "prescriptions_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prescription_lines" ADD CONSTRAINT "prescription_lines_prescription_id_fkey" FOREIGN KEY ("prescription_id") REFERENCES "prescriptions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical_documents" ADD CONSTRAINT "medical_documents_consultation_id_fkey" FOREIGN KEY ("consultation_id") REFERENCES "consultations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "bookings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_orders" ADD CONSTRAINT "exam_orders_consultation_id_fkey" FOREIGN KEY ("consultation_id") REFERENCES "consultations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_orders" ADD CONSTRAINT "exam_orders_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_orders" ADD CONSTRAINT "exam_orders_result_document_id_fkey" FOREIGN KEY ("result_document_id") REFERENCES "medical_documents"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reference_lettres" ADD CONSTRAINT "reference_lettres_consultation_id_fkey" FOREIGN KEY ("consultation_id") REFERENCES "consultations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reference_lettres" ADD CONSTRAINT "reference_lettres_from_doctor_id_fkey" FOREIGN KEY ("from_doctor_id") REFERENCES "doctors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical_certificates" ADD CONSTRAINT "medical_certificates_consultation_id_fkey" FOREIGN KEY ("consultation_id") REFERENCES "consultations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical_certificates" ADD CONSTRAINT "medical_certificates_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical_certificates" ADD CONSTRAINT "medical_certificates_document_id_fkey" FOREIGN KEY ("document_id") REFERENCES "medical_documents"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follow_up_plans" ADD CONSTRAINT "follow_up_plans_consultation_id_fkey" FOREIGN KEY ("consultation_id") REFERENCES "consultations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_consultation_id_fkey" FOREIGN KEY ("consultation_id") REFERENCES "consultations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "conversations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_attachment_id_fkey" FOREIGN KEY ("attachment_id") REFERENCES "medical_documents"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_member_user_id_fkey" FOREIGN KEY ("member_user_id") REFERENCES "doctors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compliance_items" ADD CONSTRAINT "compliance_items_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_actor_uuid_fkey" FOREIGN KEY ("actor_uuid") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

