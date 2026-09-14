import axios from "axios";

/**
 * Central API client configured for the deployed e-KALP backend.
 *
 * The deployed backend (FastAPI) exposes:
 *   - POST /auth/{role}/signup   role ∈ { citizen, spocuni, teamlead }
 *   - POST /auth/{role}/login
 *   - GET  /problems             (list problem statements)
 *
 * There is NO `/api` prefix and no /auth/me, /auth/logout,
 * /project-workspaces, /students or problem create/update/assign routes,
 * so helpers for those have been dropped rather than left 404ing.
 *
 * The frontend uses its own role vocabulary
 *   citizen | uni_spoc | industry_spoc | admin_gov
 * while the backend understands
 *   citizen | spocuni   | teamlead
 * `toBackendRole` maps the overlap and throws a clear error for the roles
 * the deployed backend does not implement yet (industry_spoc, admin_gov).
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// ---- Request interceptor: attach token ----
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ---- Response interceptor: handle auth failures globally ----
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      if (window.location.pathname !== "/") {
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);

const BACKEND_ROLES = {
  citizen: "citizen",
  uni_spoc: "spocuni",
};

export function toBackendRole(frontendRole) {
  if (frontendRole === "industry_spoc" || frontendRole === "admin_gov") {
    throw new Error(
      `The deployed backend does not support the "${frontendRole}" account type yet. ` +
        "Only citizen, spocuni (university) and teamlead accounts exist."
    );
  }
  const backendRole = BACKEND_ROLES[frontendRole];
  if (!backendRole) throw new Error(`Unknown role: ${frontendRole}`);
  return backendRole;
}

export const authApi = {
  /** POST /auth/{role}/login — returns { access_token, refresh_token, token_type } */
  login: (role, payload) => api.post(`/auth/${toBackendRole(role)}/login`, payload),
  /** POST /auth/{role}/signup — returns { status, message, data } */
  signup: (role, payload) => api.post(`/auth/${toBackendRole(role)}/signup`, payload),
};

export const problemApi = {
  /** GET /problems — returns { total, limit, offset, items } */
  list: (params) => api.get("/problems", { params }),
};

export default api;