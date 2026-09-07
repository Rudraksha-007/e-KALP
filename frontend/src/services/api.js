import axios from "axios";

/**
 * Central API client.
 *
 * - Attaches the JWT (if present) to every request.
 * - Redirects to /role-selection on a 401 (expired/invalid token) so the
 *   user isn't left staring at a broken dashboard.
 * - All endpoint calls the app needs are grouped below so components never
 *   hand-roll a fetch/axios call — they import `authApi`, `problemApi`, etc.
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

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

export default api;

/* ------------------------------------------------------------------ */
/* Grouped endpoint helpers                                            */
/* Maps 1:1 to the `user` table's `type` enum:                         */
/*   citizen | uni_spoc | industry_spoc | admin_gov                    */
/* ------------------------------------------------------------------ */

export const authApi = {
  // Citizen
  citizenLogin: (payload) => api.post("/auth/citizen/login", payload),
  citizenRegister: (payload) => api.post("/auth/citizen/register", payload),

  // University SPOC
  universityLogin: (payload) => api.post("/auth/university/login", payload),
  universityRegister: (payload) => api.post("/auth/university/register", payload),

  // Industry SPOC
  industryLogin: (payload) => api.post("/auth/industry/login", payload),
  industryRegister: (payload) => api.post("/auth/industry/register", payload),

  // Admin / Govt — typically provisioned, not self-registered, but a
  // register endpoint is included in case invite-based signup is added later.
  adminLogin: (payload) => api.post("/auth/admin/login", payload),
  adminRegister: (payload) => api.post("/auth/admin/register", payload),

  me: () => api.get("/auth/me"),
  logout: () => api.post("/auth/logout"),
};

export const problemApi = {
  list: (params) => api.get("/problem-statements", { params }),
  get: (id) => api.get(`/problem-statements/${id}`),
  create: (payload) => api.post("/problem-statements", payload),
  update: (id, payload) => api.put(`/problem-statements/${id}`, payload),
  assign: (id, assignedTo) =>
    api.patch(`/problem-statements/${id}/assign`, { assigned_to: assignedTo }),
};

export const workspaceApi = {
  list: (params) => api.get("/project-workspaces", { params }),
  get: (id) => api.get(`/project-workspaces/${id}`),
  create: (payload) => api.post("/project-workspaces", payload),
  update: (id, payload) => api.put(`/project-workspaces/${id}`, payload),
};

export const studentApi = {
  list: (params) => api.get("/students", { params }),
  create: (payload) => api.post("/students", payload),
};
