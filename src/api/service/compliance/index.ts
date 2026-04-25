import { axiosClient } from "@/api/base";
import { ComplianceStatus, ComplianceItem, ComplianceDocUpload } from "@/api/api-types";

const API_BASE = "https://api.nawaqare.sn";
const API_VERSION = "v1";

// Get compliance status for a doctor
export const getComplianceStatus = async (doctorId: string): Promise<ComplianceStatus> => {
  try {
    const response = await axiosClient.get(
      `/api/v1/doctors/${doctorId}/compliance`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching compliance status:", error);
    throw error;
  }
};

// Upload compliance document
export const uploadComplianceDocument = async (
  data: ComplianceDocUpload,
): Promise<ComplianceItem> => {
  try {
    const formData = new FormData();
    formData.append("type", data.type);
    formData.append("file", data.file);
    if (data.expiryDate) {
      formData.append("expiryDate", data.expiryDate);
    }

    const response = await axiosClient.post(
      `/api/v1/compliance/documents`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading compliance document:", error);
    throw error;
  }
};

// Get compliance items for a doctor
export const getComplianceItems = async (doctorId: string): Promise<ComplianceItem[]> => {
  try {
    const response = await axiosClient.get(
      `/api/v1/doctors/${doctorId}/compliance/items`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching compliance items:", error);
    throw error;
  }
};
