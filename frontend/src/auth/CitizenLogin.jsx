import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthCard, { FormField, SubmitButton } from "../components/AuthCard";
import { authApi } from "../services/api";

export default function CitizenLogin() {
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
      // POST /auth/citizen/login -> { access_token, refresh_token }
      const { data } = await authApi.citizenLogin(form);
      localStorage.setItem("token", data.access_token);
      // Fetch the citizen profile back using that token and persist it so
      // page refreshes can re-hydrate the session.
      const { data: profile } = await authApi.citizenMe();
      localStorage.setItem(
        "user",
        JSON.stringify({ ...profile, type: profile.role })
      );
      navigate("/citizen/dashboard", { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.detail?.map?.((d) => d.msg).join(", ") ||
        err.response?.data?.detail ||
        "Invalid phone number or password."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthCard
      title="Citizen Login"
      subtitle="Log in to report issues and track community projects."
      error={error}
      footer={
        <>
          New here?{" "}
          <Link
            to="/auth/citizen/register"
            className="font-semibold text-slate-900 hover:underline"
          >
            Create a citizen account
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