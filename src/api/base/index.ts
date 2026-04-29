import axios, { AxiosHeaders, InternalAxiosRequestConfig } from "axios";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.nawaqare.sn";

export const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

/**
 * Call immediately after login so the Bearer token is available on the very
 * first request, regardless of localStorage timing (works across full reloads).
 */
export function setAuthBearer(accessToken: string | null | undefined): void {
  const defaults = axiosClient.defaults.headers as {
    common?: Record<string, string>;
    Authorization?: string;
    authorization?: string;
  };
  if (accessToken) {
    if (!defaults.common) defaults.common = {};
    defaults.common.Authorization = `Bearer ${accessToken}`;
  } else {
    if (defaults.common) {
      delete defaults.common.Authorization;
      delete defaults.common.authorization;
    }
    delete defaults.Authorization;
    delete defaults.authorization;
  }
}

/** Re-sync defaults from storage (e.g. after Fast Refresh or new tab). */
export function syncAuthBearerFromStorage(): void {
  if (typeof window === "undefined") return;
  const t =
    localStorage.getItem("access_token") ||
    sessionStorage.getItem("access_token");
  setAuthBearer(t || null);
}

const AUTH_PUBLIC_PATH =
  /\/api\/v1\/auth\/(login-password|login|register|verify-otp|verify-login-otp|refresh)(\?|$)/i;

function requestLooksLikePublicAuth(config: InternalAxiosRequestConfig): boolean {
  const raw = config.url ?? "";
  if (AUTH_PUBLIC_PATH.test(raw)) return true;
  const base = (config.baseURL as string) || API_BASE_URL || "";
  try {
    const abs = raw.startsWith("http")
      ? raw
      : `${base.replace(/\/$/, "")}${raw.startsWith("/") ? "" : "/"}${raw}`;
    const path = new URL(abs).pathname + new URL(abs).search;
    return AUTH_PUBLIC_PATH.test(path);
  } catch {
    return false;
  }
}

// Read stored token on every request; skip on public auth routes.
axiosClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (typeof window === "undefined") return config;

  const headers = AxiosHeaders.from(config.headers ?? {});
  config.headers = headers;

  if (requestLooksLikePublicAuth(config)) {
    headers.delete("Authorization");
    return config;
  }

  const token =
    localStorage.getItem("access_token") ||
    sessionStorage.getItem("access_token");

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return config;
});

function requestHadAuthorization(error: {
  config?: { headers?: unknown };
}): boolean {
  const headers = error.config?.headers;
  if (!headers || typeof headers !== "object") return false;

  // AxiosHeaders instance (Axios ≥ 1.x)
  if (typeof (headers as AxiosHeaders).get === "function") {
    return Boolean((headers as AxiosHeaders).get("Authorization"));
  }

  // Plain object fallback
  const h = headers as Record<string, string | undefined>;
  return Boolean(h["Authorization"] ?? h["authorization"]);
}

// Only force-logout when a genuinely authenticated request is rejected.
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      typeof window !== "undefined" &&
      requestHadAuthorization(error)
    ) {
      localStorage.removeItem("access_token");
      sessionStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      sessionStorage.removeItem("refresh_token");
      setAuthBearer(null);
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);
