import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { authApi } from "../services/api";
import { getDashboardPath } from "../config/roles";

const AuthContext = createContext(null);

const TOKEN_KEY = "token";
const USER_KEY = "user";

/**
 * AuthProvider wraps the whole app (see App.jsx) and is the single place
 * that knows about the logged-in user, their role (`user.type`), and the
 * JWT. ProtectedRoute reads `role` from here to gate pages.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { type, ... }
  const [loading, setLoading] = useState(true); // true while we re-hydrate from localStorage

  // Re-hydrate on first load (page refresh) from localStorage. The deployed
  // backend has no /auth/me endpoint, so we trust the cached session; any
  // real API call that returns 401 is handled globally by api.js.
  useEffect(() => {
    const storedUser = localStorage.getItem(USER_KEY);
    const token = localStorage.getItem(TOKEN_KEY);

    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      }
    }
    setLoading(false);
  }, []);

  const persistSession = useCallback((token, userData) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
    setUser(userData);
  }, []);

  /**
   * Login against the deployed backend.
   *
   * @param {"citizen"|"uni_spoc"|"industry_spoc"|"admin_gov"} role
   * @param {{phone?: string, phone_number?: string, password: string}} credentials
   * @param {Record<string, unknown>} [extraUser] merged into the stored user object
   */
  const login = useCallback(
    async (role, credentials, extraUser = {}) => {
      const payload = {
        phone_number: credentials.phone_number ?? credentials.phone,
        password: credentials.password,
      };
      const { data } = await authApi.login(role, payload);

      const token =
        data.access_token ??
        data.token ??
        (data.tokens && data.tokens.access_token);
      if (!token) throw new Error("Backend returned no access token.");

      const userData = { type: role, name: credentials.name || extraUser.name || null };
      persistSession(token, userData);
      return userData;
    },
    [persistSession]
  );

  /**
   * Build the role-specific payload the deployed backend schema expects.
   * Currency check: both citizen and spocuni signups require exactly the
   * fields below (the backend forbids unknown keys).
   */
  const buildSignupPayload = useCallback((role, formData) => {
    if (role === "citizen") {
      return {
        name: formData.name,
        phone_number: formData.phone_number ?? formData.phone,
        password: formData.password,
        location: formData.location,
        occupation: formData.occupation,
        age: Number(formData.age),
        gender: (formData.gender || "").toUpperCase(),
      };
    }
    if (role === "uni_spoc") {
      return {
        uni_name: formData.uniName,
        name: formData.name,
        subject_expertise: formData.subjectExpertise ?? [],
        problems_proposal: formData.problemsProposal ?? [],
        phone_number: formData.phone_number ?? formData.phone,
        password: formData.password,
      };
    }
    throw new Error(
      `The deployed backend does not support registration for "${role}".`
    );
  }, []);

  /**
   * Register, then immediately log in so the user lands on their dashboard.
   * (Signup returns no tokens — only the login endpoint issues them.)
   */
  const register = useCallback(
    async (role, formData) => {
      const payload = buildSignupPayload(role, formData);
      await authApi.signup(role, payload);
      return login(role, {
        phone: payload.phone_number,
        password: payload.password,
        name: payload.name,
      });
    },
    [buildSignupPayload, login]
  );

  const logout = useCallback(() => {
    // The backend has no /auth/logout route; clearing tokens locally is all.
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
  }, []);

  const value = {
    user,
    role: user?.type ?? null,
    isAuthenticated: !!user,
    loading,
    login,
    register,
    logout,
    dashboardPath: user ? getDashboardPath(user.type) : "/",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}