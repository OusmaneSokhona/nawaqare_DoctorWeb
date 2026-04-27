import { axiosClient } from "@/api/base";

export interface UserProfile {
  id: string;
  phone: string;
  email?: string;
  role: string;
  is_active: boolean;
  profile?: {
    first_name: string;
    last_name: string;
    date_of_birth?: string;
    gender?: string;
    nationality?: string;
    address?: string;
    city?: string;
    languages?: string[];
    about?: string;
    profile_picture?: string;
    id_number?: string;
    id_type?: string;
    id_expiry?: string;
    phone_whatsapp?: string;
    area?: string;
  };
  doctor?: {
    specialization?: string;
    license_number?: string;
  };
}

// Get current user profile
export const getMe = async (): Promise<UserProfile> => {
  const response = await axiosClient.get("/api/v1/auth/me");
  return response.data?.user ?? response.data?.data ?? response.data;
};

// Update user profile
export const updateProfile = async (
  userId: string,
  data: Partial<{
    first_name: string;
    last_name: string;
    email: string;
    city: string;
    area: string;
    address: string;
    gender: string;
    nationality: string;
    about: string;
    date_of_birth: string;
    phone_whatsapp: string;
    languages: string[];
  }>
): Promise<UserProfile> => {
  const response = await axiosClient.put(`/api/v1/users/${userId}`, data);
  return response.data?.data ?? response.data;
};

// Change password
export const changePassword = async (data: {
  old_password: string;
  new_password: string;
}): Promise<void> => {
  await axiosClient.post("/api/v1/auth/change-password", data);
};
