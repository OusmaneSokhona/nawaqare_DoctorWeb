import { ApexOptions } from "apexcharts";

export interface DropdownProps {
  placeholder?: React.ReactNode;
  data?: { label: string; value: string }[];
  className?: string;
  onSelect?: (value: string) => void;
  value?: string;
}

export interface DropdownItem {
  name: string;
  icon: string;
  color: string;
  hoverBg: string;
  hoverText: string;
  link?: string;
}
export interface HeaderProfileDropDownProps {
  profileitems?: {
    name: string;
    icon: string;
    color: string;
    hoverBg: string;
    hoverText: string;
    link?: string;
  }[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dropdownItems?: DropdownItem[];
  placeholder?: React.ReactNode;
  className?: string;
}

export type PaginatedData = Array<any>;
export type DropDownOptions = Array<any>;

export interface Notification {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  unread: boolean;
}
export interface ContactUs {
  id: string;
  subject: string;
  title: string;
  email: string;
  desc: string;
  Ticket: string;
  Date: string;
  Status: string;
  Type: string;
  To: string;
  Priority: string;
}
export interface Partner {
  Partner: string;
  title: string;
  Primary: string;
  Deliveries: string;
  Last: string;
  Status: string;
  id: string;
}
export interface Reveiws {
  id: string;
  patientName: string;
  doctorName: string;
  consultationType: string;
  comments: number;
  rating: number;
  Status: string;
  Date: string;
}
export interface payments {
  id: number;
  paidBy: string;
  Date: string;
  img: string;
  Activity: string;
  Description: string;
  dsc: string;
  From: string;
  Order: string;
  Amount: number;
  Status?: string;
  Method?: string;
  transactionID?: string;
}
export interface paymentss {
  id: number;
  paidBy: string;
  Date: string;
  img: string;
  Activity: string;
  Description: string;
  dsc: string;
  From: string;
  Order: string;
  Amount: number;
  Status?: string;
  Method?: string;
  Patient?: string;
  Type?: string;
  Platform?: string;
  Commission?: string;
}

export interface paymentsss {
  id: number;
  paidBy: string;
  Date: string;
  img: string;
  Activity: string;
  Description: string;
  dsc: string;
  From: string;
  Order: string;
  Amount: number;
  Status?: string;
  Method?: string;
  Patient?: string;
  Type?: string;
  Platform?: string;
  Commission?: string;
}
// export interface PaymentRow {
//   id: string | number;
//   Patient?: string;
//   paidBy?: string;
//   Date: string;
//   img?: string;
//   Activity?: string;
//   Description?: string;
//   dsc?: string;
//   Method?: string;
//   Order?: string;
//   Amount?: string;
//   Status?: string;
//   Type?: string;
//   Platform?: string;
//   Commission?: string;
// }
export interface PaymentRow {
  id?: string | number; // ✅ optional
  Patient?: string;
  paidBy?: string;
  Date: string;
  img?: string;
  Activity?: string;
  Description?: string;
  dsc?: string;
  Method?: string;
  Order?: string;
  Amount?: string;
  Status?: string;
  Type?: string;
  Platform?: string;
  Commission?: string;
}

export interface InternalContacts {
  Name: string;
  Role: string;
  Phone: string;
  Email: string;
  id: string;
}
export interface DelivereyHistory {
  Name: string;
  Role: string;
  Phone: string;
  Email: string;
  id: string;
  Status: string;
}

// export interface pharmacy {
//   id: number,
//   paidBy: string;
//   Date: string;
//   img: string;
//   Activity: string;
//   Description: string;
//   dsc: string;
//   From: string;
//   Order: string;
//   Amount: number;
//   Status?: string;
//   Method?: string;
//   Patient?: string;
//   Pharmacy?: string;
//   Responsible?: string;
//   Location?: string;
//   Total?: string;
//   Acceptance?: string;
// }
export interface pharmacy {
  id: number;
  Pharmacy: string;
  Responsible: string;
  Location: string;
  Status: string;
  Patient: string;
  Date: string;
  Total: string;
  Acceptance: string;
  paidBy?: string;
  img?: string;
  Activity?: string;
  Description?: string;
  From?: string;
  Order?: string;
  Amount?: string;
  Type?: string;
}

export interface devlivered {
  id: number;
  paidBy: string;
  Date: string;
  img: string;
  Activity: string;
  Description: string;
  dsc: string;
  From: string;
  Order: string;
  Amount: number;
  Status?: string;
  Method?: string;
  Patient?: string;
  ID?: string;
  Medication?: string;
  Pharmacy?: string;
  Doctor?: string;
  Delivery?: string;
  tracking?: string;
  Proof?: string;
}
export interface pending {
  id: number;
  paidBy: string;
  Date: string;
  img: string;
  Activity: string;
  Description: string;
  dsc: string;
  From: string;
  Order: string;
  Amount: number;
  Status?: string;
  Method?: string;
  Patient?: string;
  ID?: string;
  Medication?: string;
  Pharmacy?: string;
  Doctor?: string;
  Delivery?: string;
  name?: string;
  Includes?: string;
  Category?: string;
}
export interface prescription {
  id: number;
  paidBy: string;
  Date: string;
  img: string;
  Activity: string;
  Description: string;
  dsc: string;
  From: string;
  Order: string;
  Amount: number;
  Status?: string;
  Method?: string;
  Patient?: string;
  Medication?: string;
  Pharmacy?: string;
  Doctor?: string;
  Prescription?: string;
  validation?: string;
  delivery?: string;
  consumerId?: string;
  date?: string;
  type?: string;
  consultation?: string;
}
export interface care {
  id: number;
  dsc: string;
  medicalCondition: string;
  Price: string;
  Description: string;
  Image: string;
  Action: string;
}
export interface MedicalCondition {
  title: string;
  desc: string;
  Price: string;
  image: string;
  Action: string;
}

export interface AllPatients {
  fname?: string;
  Idx?: string;
  idx?: string;
  city?: string;
  gender?: string;
  phone?: string;
  email?: string;
  Badges?: string;
  consultations?: string;
  verification?: string;
  tags?: string;
  id?: string;
  Status?: string;
}
export interface DocPatient {
  fname?: string;
  Idx?: string;
  address?: string;
  gender?: string;
  phone?: string;
  email?: string;
  date?: string;
  id?: string;
  Status?: string;
}

export interface AllDoctorsType {
  fname?: string;
  login?: string;
  Specialty?: string;
  phoneNo?: string;
  email?: string;
  consultationType?: string;
  gender?: string;
  consulCompleted?: string;
  cStatus?: string;
  Rating?: string;
  speciality?: string;
  languages?: string[];
  services?: string;
  id?: string;
  status?: string;
}

export interface BookingsType {
  patientName?: string;
  doctorName?: string;
  consultationType?: string;
  condition?: string;
  Schedule?: string;
  Status?: string;
  id?: string;
  Time?: string;
}

export interface viewType {
  Name: string;
  ID: string;
  Date: string;
  Period: string;
  Consultations: string;
  Time: string;
  id: string;
}

export interface ConsultationType {
  Name: string;
  Period: string;
  consultationType: string;
  Qty: string;
  Price: string;
  Status: string;
  Specialty: string;
  Renewal: string;
  On: string;
  id: string;
}

export interface SubscriptonsType {
  plan?: string;
  fee?: string;
  sdate?: string;
  edate?: string;
  status?: string;
  id?: string;
}

export interface ConsultationsTYpe {
  patientName?: string;
  doctorName?: string;
  consultationType?: string;
  medicalCondition?: string;
  Specialty?: string;
  Duration?: string;
  Fee?: string;
  links?: string;
  actions?: string;
  consultationDate?: string;
  Status?: string;
  id?: string;
}

export interface DocTYpe {
  patientName?: string;
  doctorName?: string;
  consultationType?: string;
  medicalCondition?: string;
  Specialty?: string;
  Duration?: string;
  Fee?: string;
  consultationDate?: string;
  Status?: string;
  id?: string;
}

export interface PrescriptionTYpe {
  patientName?: string;
  doctorName?: string;
  consultationType?: string;
  prescriptionType?: string;
  medicalCondition?: string;
  Specialty?: string;
  Duration?: string;
  Fee?: string;
  assignPhar?: string;
  consultationDate?: string;
  Status?: string;
  id?: string;
  update?: string;
  Medications?: string;
  Pharmacy?: string;
  noteType?: string;
  Appointment?: string;
  Method?: string;
  Scop?: string;
  consentType?: string;
}

interface BankAccount {
  bankName: string;
  currency: string;
  iban: string;
  accountHolderName: string;
  default: boolean;
}

export interface BankAccountCardProps {
  bankAccounts: BankAccount[];
}

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  styling?: string;
}

export interface ChatWithDoctorModalProps {
  lastMessages: ChatMessage[];
  isOpen: boolean;
  onClose: () => void;
}

export interface ChatMessage {
  name: string;
  timestamp: string;
  isDoctor: boolean;
  text: string;
  attachment?: {
    name: string;
    url: string;
    size: string;
  };
}

export interface ChatBoxProps {
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

export interface StatsCardProps {
  title?: string;
  value: string;
  subTitle?: string;
  percentage?: string;
  reverse?: boolean;
  icon?: string;
  data?: {
    xAxis: string[];
    yAxis: number[];
  };
  lineColor?: string;
  styling?: string;
  negative?: boolean;
}

export interface StatsSummaryCardProps {
  titleLeft?: string;
  titleRight?: string;
  styling?: string;
  statsData: {
    lineColor: string | undefined;
    title: string;
    value: string;
    percentage: string;
    xAxis: string[];
    yAxis: number[];
    negative?: boolean;
  }[];
}

type Step = {
  label: string;
  title: string;
  date: string;
  time: string;
};

export type StepperProps = {
  steps: Step[];
  activeStep: number;
};

export interface SubscriptionCardProps {
  data: {
    last4: string;
    expiry: string;
    brand: string;
  };
}

export interface SuccessModalProps {
  title: string;
  description: string;
  buttonText: string;
  nextPageLink?: string;
  skipBtnText?: string;
  skipBtnLink?: string;
  onClick?: () => void;
}

export interface AreaChartProps {
  seriesData?: Array<{
    name: string;
    data: number[];
  }>;
  categoriesData: string[];
  showDollarSign?: boolean;
  label?: string;
  showLegend?: boolean;
  height?: any;
  className?: string;
}

export interface ChartData {
  series: { data: number[] }[];
  options: ApexOptions;
}
export interface BarChartProps {
  data: number[];
  labels: string[];
  roundedBar?: boolean;
  tenSeries?: boolean;
  height?: number;
}

export interface ApexChartProps {
  series: number[];
  labels: string[];
  legendTop?: boolean;
  legendBottomAlign?: boolean;
  width?: any;
}

interface ChartDataLine {
  xAxis: string[];
  yAxis: number[];
}

export interface BasicLineChartProps {
  data: ChartDataLine;
  lineColor?: string;
  width?: any;
}

export interface DonutChartProps {
  height?: any;
  data: {
    female?: any;
    male?: any;
    name: string;
    value: number;
    color: string;
  }[];
  isCompleteDataset?: boolean;
  insideLabel?: string;
}

export interface SingleAreaChartProps {
  seriesData?: Array<{
    name: string;
    data: number[];
  }>;
  categoriesData?: string[];
  showDollarSign?: boolean;
  label?: string;
  showLegend?: boolean;
  className?: string;
  chartColor?: string;
}

export interface VerticlBarChartProps {
  bmi?: boolean;
  offsetY?: any;
  seriesData: { data: number[] }[];
  categories: any[];
  horizontal?: boolean;
  label?: string;
  hieght?: any;
  showLegend?: boolean;
  borderRadius?: number;
  borderRadiusApplication?: any;
}

type ClinicDetail = {
  clinicname?: string;
  email?: string;
  address?: string;
  phone?: string;
  drRegistrationNo?: string;
};

type PatientDetail = {
  patientname?: string;
  dob?: string;
  email?: string;
  address?: string;
  phone?: string;
};

type Drug = {
  id: string;
  nameofdrug: string;
  strength: string;
  formulation: string;
  doseinstruction: string;
  qty: string;
  unitprice: string;
  totalprice: string;
  status: string;
  isAvailable: boolean;
  icon: string;
};

export type FormDetails = {
  clinic_details: ClinicDetail[];
  patient_details: PatientDetail[];
  drugs: Drug[];
  date: string;
  time?: string;
  patientid?: string;
  prescriptionno?: string;
  order_no?: string;
  status?: string;
  patient?: string;
  clinic?: string;
};
