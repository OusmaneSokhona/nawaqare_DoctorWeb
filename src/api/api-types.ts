// Add types for api functions (Request & Response) here...

/** GET /api/v1/doctors/dashboard/stats */
export interface DashboardStats {
  today_appointments: number;
  total_patients: number;
  pending_bookings: number;
  completed_consultations: number;
}

export type Country = {
  name: string;
  code: string;
  flag: string;
};
export interface AddNewCardRequest {
  paymentMethodId: string;
  lastDigits: string;
  brand: string;
  billingAddress: {
    region: string;
    stateOrProvince: string;
    city: string;
    address: string;
    postalCode: string;
  };
}

// Clinical API Types
export interface SOAPNotes {
  id: string;
  consultationId: string;
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
  createdAt: string;
  updatedAt: string;
}

export interface SOAPData {
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
}

export interface ICD10Result {
  code: string;
  description: string;
}

export interface ExamOrder {
  id: string;
  consultationId: string;
  name: string;
  type: string;
  status: ExamOrderStatus;
  createdAt: string;
  completedAt?: string;
}

export type ExamOrderStatus = "pending" | "in_progress" | "completed" | "cancelled";

export interface NewExamOrder {
  name: string;
  type: string;
}

export interface ReferenceLetterInput {
  patientName: string;
  referralReason: string;
  speciality: string;
  priority: "normal" | "urgent";
  notes?: string;
}

export interface ReferenceLetterResult {
  id: string;
  consultationId: string;
  patientName: string;
  referralReason: string;
  speciality: string;
  priority: string;
  status: string;
  createdAt: string;
  documentUrl?: string;
}

export interface CertificateData {
  type: "sick_leave" | "fitness_certificate" | "medical_report";
  startDate: string;
  endDate: string;
  notes?: string;
}

export interface CertificateResult {
  id: string;
  consultationId: string;
  type: string;
  status: string;
  createdAt: string;
  documentUrl?: string;
}

// Patient Records API Types
export interface PatientRecord {
  id: string;
  patientId: string;
  medicalHistory: string;
  allergies: string[];
  medications: string[];
  conditions: string[];
}

export interface TimelineFilters {
  startDate?: string;
  endDate?: string;
  eventType?: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  type: string;
  title: string;
  description?: string;
  details?: Record<string, any>;
}

export interface Vaccination {
  id: string;
  name: string;
  date: string;
  nextDueDate?: string;
  status: "completed" | "pending";
}

export interface PatientOverview {
  id: string;
  name: string;
  age: number;
  gender: string;
  bloodType?: string;
  lastVisit?: string;
  activeConditions: string[];
  upcomingAppointments: number;
}

// Team API Types
export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: Permissions;
  status: "active" | "suspended" | "inactive";
  joinedAt: string;
}

export interface Permissions {
  canViewPatients: boolean;
  canEditPatients: boolean;
  canViewRecords: boolean;
  canEditRecords: boolean;
  canCreatePrescriptions: boolean;
  isAdmin: boolean;
}

export interface InviteData {
  email: string;
  name: string;
  role: string;
  permissions?: Partial<Permissions>;
}

// Compliance API Types
export interface ComplianceStatus {
  doctorId: string;
  overallStatus: "compliant" | "non_compliant" | "pending_review";
  completionPercentage: number;
  lastReviewDate?: string;
  items: ComplianceItem[];
}

export interface ComplianceItem {
  id: string;
  name: string;
  status: "complete" | "incomplete" | "expired" | "pending";
  dueDate?: string;
  documentUrl?: string;
  uploadedAt?: string;
}

export interface ComplianceDocUpload {
  type: string;
  file: File;
  expiryDate?: string;
}
