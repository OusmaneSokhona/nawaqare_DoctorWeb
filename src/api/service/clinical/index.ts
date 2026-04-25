import { axiosClient } from "@/api/base";
import {
  SOAPNotes,
  SOAPData,
  ICD10Result,
  ExamOrder,
  ExamOrderStatus,
  NewExamOrder,
  ReferenceLetterInput,
  ReferenceLetterResult,
  CertificateData,
  CertificateResult,
} from "@/api/api-types";

const API_BASE = "https://api.nawaqare.sn";
const API_VERSION = "v1";

// Static ICD-10 codes for local search (can be expanded or fetched from backend)
const ICD10_CODES: ICD10Result[] = [
  { code: "A00", description: "Cholera" },
  { code: "A01", description: "Typhoid and paratyphoid fevers" },
  { code: "A02", description: "Salmonella infection" },
  { code: "A03", description: "Shigellosis" },
  { code: "E10", description: "Type 1 diabetes mellitus" },
  { code: "E11", description: "Type 2 diabetes mellitus" },
  { code: "I10", description: "Essential hypertension" },
  { code: "I11", description: "Hypertensive heart disease" },
  { code: "J00", description: "Acute nasopharyngitis (common cold)" },
  { code: "J01", description: "Acute sinusitis" },
  { code: "J02", description: "Acute pharyngitis" },
  { code: "J03", description: "Acute tonsillitis" },
  { code: "J04", description: "Acute laryngitis and tracheitis" },
  { code: "J05", description: "Acute obstructive laryngitis (croup)" },
  { code: "K25", description: "Gastric ulcer" },
  { code: "K26", description: "Duodenal ulcer" },
  { code: "M19", description: "Unspecified osteoarthritis" },
];

// SOAP Notes
export const getSoapNotes = async (consultationId: string): Promise<SOAPNotes> => {
  try {
    const response = await axiosClient.get(
      `${API_BASE}/api/${API_VERSION}/consultations/${consultationId}/soap-notes`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching SOAP notes:", error);
    throw error;
  }
};

export const saveSoapNotes = async (
  consultationId: string,
  data: SOAPData,
): Promise<SOAPNotes> => {
  try {
    const response = await axiosClient.post(
      `${API_BASE}/api/${API_VERSION}/consultations/${consultationId}/soap-notes`,
      data,
    );
    return response.data;
  } catch (error) {
    console.error("Error saving SOAP notes:", error);
    throw error;
  }
};

// ICD-10 Search (local search for now)
export const searchICD10 = (query: string): ICD10Result[] => {
  const lowerQuery = query.toLowerCase();
  return ICD10_CODES.filter(
    (item) =>
      item.code.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery),
  );
};

// Exam Orders
export const getExamOrders = async (consultationId: string): Promise<ExamOrder[]> => {
  try {
    const response = await axiosClient.get(
      `${API_BASE}/api/${API_VERSION}/consultations/${consultationId}/exam-orders`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching exam orders:", error);
    throw error;
  }
};

export const createExamOrder = async (
  consultationId: string,
  data: NewExamOrder,
): Promise<ExamOrder> => {
  try {
    const response = await axiosClient.post(
      `${API_BASE}/api/${API_VERSION}/consultations/${consultationId}/exam-orders`,
      data,
    );
    return response.data;
  } catch (error) {
    console.error("Error creating exam order:", error);
    throw error;
  }
};

export const updateExamOrderStatus = async (
  orderId: string,
  status: ExamOrderStatus,
): Promise<ExamOrder> => {
  try {
    const response = await axiosClient.patch(
      `${API_BASE}/api/${API_VERSION}/exam-orders/${orderId}`,
      { status },
    );
    return response.data;
  } catch (error) {
    console.error("Error updating exam order status:", error);
    throw error;
  }
};

// Reference Letters
export const createReferenceLetter = async (
  consultationId: string,
  data: ReferenceLetterInput,
): Promise<ReferenceLetterResult> => {
  try {
    const response = await axiosClient.post(
      `${API_BASE}/api/${API_VERSION}/consultations/${consultationId}/reference-letters`,
      data,
    );
    return response.data;
  } catch (error) {
    console.error("Error creating reference letter:", error);
    throw error;
  }
};

export const getReferenceLetters = async (
  consultationId: string,
): Promise<ReferenceLetterResult[]> => {
  try {
    const response = await axiosClient.get(
      `${API_BASE}/api/${API_VERSION}/consultations/${consultationId}/reference-letters`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching reference letters:", error);
    throw error;
  }
};

// Certificates
export const createCertificate = async (
  consultationId: string,
  data: CertificateData,
): Promise<CertificateResult> => {
  try {
    const response = await axiosClient.post(
      `${API_BASE}/api/${API_VERSION}/consultations/${consultationId}/certificates`,
      data,
    );
    return response.data;
  } catch (error) {
    console.error("Error creating certificate:", error);
    throw error;
  }
};

export const getCertificates = async (
  consultationId: string,
): Promise<CertificateResult[]> => {
  try {
    const response = await axiosClient.get(
      `${API_BASE}/api/${API_VERSION}/consultations/${consultationId}/certificates`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching certificates:", error);
    throw error;
  }
};
