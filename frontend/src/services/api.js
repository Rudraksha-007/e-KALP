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

export default api;

/* ------------------------------------------------------------------ */
/* Grouped endpoint helpers                                            */
/* Maps 1:1 to the `user` table's `type` enum:                         */
/*   citizen | uni_spoc | industry_spoc | admin_gov                    */
/* ------------------------------------------------------------------ */

export const authApi = {
  // Citizen
  citizenLogin: (payload) => api.post("/auth/citizen/login", payload),
  citizenRegister: (payload) => api.post("/auth/citizen/signup", payload),
  citizenMe: () => api.get("/user/citizen/me"),

  // University — SPOC (single point of contact)
  universityLogin: (payload) => api.post("/auth/university/login", payload),
  universityRegister: (payload) => api.post("/auth/university/register", payload),
  spocLogin: (payload) => api.post("/auth/spocuni/login", payload),
  spocRegister: (payload) => api.post("/auth/spocuni/signup", payload),
  spocMe: () => api.get("/user/spocuni/me"),

  // University — Team Lead
  teamLeadLogin: (payload) => api.post("/auth/teamlead/login", payload),
  teamLeadRegister: (payload) => api.post("/auth/teamlead/signup", payload),
  teamLeadMe: () => api.get("/user/teamlead/me"),

  // Industry SPOC
  industryLogin: (payload) => api.post("/auth/industry/login", payload),
  industryRegister: (payload) => api.post("/auth/industry/register", payload),

  // Admin / Govt — typically provisioned, not self-registered, but a
  // register endpoint is included in case invite-based signup is added later.
  adminLogin: (payload) => api.post("/auth/admin/login", payload),
  adminRegister: (payload) => api.post("/auth/admin/register", payload),

  me: (role) => api.get(`/user/${role}/me`),
  logout: () => api.post("/auth/logout"),
};

// University SPOC endpoints (backend/routes/univ.py). `evaluate` lists the
// SPOC's pitches (problem + assigned team lead); `pitch` assigns a team lead
// token to a problem. Both require a spocuni JWT.
export const univApi = {
  evaluate: () => api.get("/univ/evaluate"),
  teamLeads: () => api.get("/univ/team-leads"),
  pitch: (payload) => api.post("/univ/pitch", payload),
  problems: (params) => api.get("/problems", { params }),
};

export const problemApi = {
  list: (params) => api.get("/problems", { params }),
  get: (id) => api.get(`/problems/${id}`),
  create: (payload) => api.post("/problems", payload),
  update: (id, payload) => api.put(`/problems/${id}`, payload),
  assign: (id, assignedTo) =>
    api.patch(`/problems/${id}/assign`, { assigned_to: assignedTo }),
};

// Citizen-facing endpoints (backend/routes/peasant.py).
export const citizenApi = {
  reportProblem: (payload) => api.post("/citizen/reportProblem", payload),
  myProblems: (params) => api.get("/citizen/myProblems", { params }),
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
