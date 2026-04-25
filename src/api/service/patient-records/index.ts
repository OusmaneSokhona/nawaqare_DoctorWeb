import { axiosClient } from "@/api/base";
import {
  PatientRecord,
  TimelineFilters,
  TimelineEvent,
  Vaccination,
  PatientOverview,
} from "@/api/api-types";

const API_BASE = "https://api.nawaqare.sn";
const API_VERSION = "v1";

// Get patient records
export const getPatientRecords = async (patientId: string): Promise<PatientRecord> => {
  try {
    const response = await axiosClient.get(
      `${API_BASE}/api/${API_VERSION}/patients/${patientId}/records`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching patient records:", error);
    throw error;
  }
};

// Get patient timeline with optional filters
export const getPatientTimeline = async (
  patientId: string,
  filters?: TimelineFilters,
): Promise<TimelineEvent[]> => {
  try {
    const params = new URLSearchParams();
    if (filters?.startDate) params.append("startDate", filters.startDate);
    if (filters?.endDate) params.append("endDate", filters.endDate);
    if (filters?.eventType) params.append("eventType", filters.eventType);

    const queryString = params.toString();
    const url =
      queryString.length > 0
        ? `${API_BASE}/api/${API_VERSION}/patients/${patientId}/records/timeline?${queryString}`
        : `${API_BASE}/api/${API_VERSION}/patients/${patientId}/records/timeline`;

    const response = await axiosClient.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching patient timeline:", error);
    throw error;
  }
};

// Get patient vaccinations
export const getPatientVaccinations = async (patientId: string): Promise<Vaccination[]> => {
  try {
    const response = await axiosClient.get(
      `${API_BASE}/api/${API_VERSION}/patients/${patientId}/records/vaccinations`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching patient vaccinations:", error);
    throw error;
  }
};

// Get patient overview
export const getPatientOverview = async (patientId: string): Promise<PatientOverview> => {
  try {
    const response = await axiosClient.get(
      `${API_BASE}/api/${API_VERSION}/patients/${patientId}/records/overview`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching patient overview:", error);
    throw error;
  }
};
