import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthCard, { FormField, SubmitButton } from "../components/AuthCard";
import { useAuth } from "../context/AuthContext";
import { ROLES, getDashboardPath } from "../config/roles";

/**
 * Admin/Govt accounts are provisioned by an existing admin (not
 * self-registered), so there's no AdminRegister page — only login.
 * Kept in auth/ alongside the other role logins for consistency.
 */
export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ phone: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const user = await login(ROLES.ADMIN_GOV, form);
      navigate(getDashboardPath(user.type), { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Invalid phone number or password.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthCard title="Admin / Govt Login" subtitle="Restricted access for department administrators." error={error}>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <FormField
          label="Phone number"
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
          autoComplete="tel"
        />
        <FormField
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
          autoComplete="current-password"
        />
        <SubmitButton submitting={submitting}>Log in</SubmitButton>
      </form>
    </AuthCard>
  );
}
