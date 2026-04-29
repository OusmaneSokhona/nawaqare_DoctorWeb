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

export interface LoginPasswordPayload {
  identifier: string;
  password: string;
}

export interface LoginPasswordResponse {
  message: string;
  access_token: string;
  refresh_token: string;
  user: UserProfile;
}

/** Connexion par email ou téléphone + mot de passe (comptes seed : voir backend prisma/seed) */
export const loginWithPassword = async (
  payload: LoginPasswordPayload,
): Promise<LoginPasswordResponse> => {
  const response = await axiosClient.post("/api/v1/auth/login-password", {
    identifier: payload.identifier.trim(),
    password: payload.password,
  });
  const raw = response.data as { data?: LoginPasswordResponse } | LoginPasswordResponse;
  const parsed =
    raw && typeof raw === "object" && "data" in raw && raw.data
      ? raw.data
      : (raw as LoginPasswordResponse);
  if (
    !parsed?.access_token ||
    typeof parsed.access_token !== "string" ||
    parsed.access_token.split(".").length < 3
  ) {
    throw new Error("Réponse de connexion invalide (token manquant)");
  }
  return parsed;
};

// Get current user profile
export const getMe = async (): Promise<UserProfile> => {
  const response = await axiosClient.get("/api/v1/auth/me");
  const raw = response.data as { data?: { user?: UserProfile } } | { user?: UserProfile };
  const envelope = raw && typeof raw === "object" && "data" in raw && raw.data ? raw.data : raw;
  const user = (envelope as { user?: UserProfile })?.user;
  if (user && typeof user === "object" && "id" in user) {
    return user as UserProfile;
  }
  if (envelope && typeof envelope === "object" && "id" in envelope) {
    return envelope as UserProfile;
  }
  throw new Error("Profil utilisateur introuvable dans la réponse");
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
