import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthCard, { FormField, SubmitButton } from "../components/AuthCard";
import { useAuth } from "../context/AuthContext";
import { ROLES, getDashboardPath } from "../config/roles";

export default function IndustryLogin() {
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
      const user = await login(ROLES.INDUSTRY_SPOC, form);
      navigate(getDashboardPath(user.type), { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Invalid phone number or password.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthCard
      title="Industry SPOC Login"
      subtitle="Log in to manage your organization's collaborations."
      error={error}
      footer={
        <>
          New here?{" "}
          <Link to="/auth/industry/register" className="font-semibold text-slate-900 hover:underline">
            Register your organization
          </Link>
        </>
      }
    >
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <FormField
          label="Phone number"
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
          autoComplete="tel"
          placeholder="9876543210"
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
