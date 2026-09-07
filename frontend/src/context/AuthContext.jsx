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
  const [user, setUser] = useState(null); // { id, name, type, ... }
  const [loading, setLoading] = useState(true); // true while we re-hydrate from localStorage/API

  // Re-hydrate on first load (page refresh) from localStorage, then confirm
  // the token is still valid against the backend.
  useEffect(() => {
    const storedUser = localStorage.getItem(USER_KEY);
    const token = localStorage.getItem(TOKEN_KEY);

    if (!token || !storedUser) {
      setLoading(false);
      return;
    }

    setUser(JSON.parse(storedUser));

    authApi
      .me()
      .then((res) => {
        setUser(res.data.user);
        localStorage.setItem(USER_KEY, JSON.stringify(res.data.user));
      })
      .catch(() => {
        // Token expired/invalid — the api.js response interceptor already
        // clears storage and redirects; just clear local state here.
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const persistSession = useCallback((token, userData) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
    setUser(userData);
  }, []);

  /**
   * @param {"citizen"|"uni_spoc"|"industry_spoc"|"admin_gov"} role
   * @param {{phone: string, password: string}} credentials
   */
  const login = useCallback(
    async (role, credentials) => {
      const loginFn = {
        citizen: authApi.citizenLogin,
        uni_spoc: authApi.universityLogin,
        industry_spoc: authApi.industryLogin,
        admin_gov: authApi.adminLogin,
      }[role];

      if (!loginFn) throw new Error(`Unknown role: ${role}`);

      const { data } = await loginFn(credentials);
      persistSession(data.token, data.user);
      return data.user;
    },
    [persistSession]
  );

  /**
   * @param {"citizen"|"uni_spoc"|"industry_spoc"|"admin_gov"} role
   * @param {object} formData role-specific registration payload
   */
  const register = useCallback(
    async (role, formData) => {
      const registerFn = {
        citizen: authApi.citizenRegister,
        uni_spoc: authApi.universityRegister,
        industry_spoc: authApi.industryRegister,
        admin_gov: authApi.adminRegister,
      }[role];

      if (!registerFn) throw new Error(`Unknown role: ${role}`);

      const { data } = await registerFn(formData);
      // Auto-login after successful registration if the API returns a token.
      if (data.token) {
        persistSession(data.token, data.user);
      }
      return data.user;
    },
    [persistSession]
  );

  const logout = useCallback(() => {
    authApi.logout().catch(() => {
      /* best-effort — clear local state regardless */
    });
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
