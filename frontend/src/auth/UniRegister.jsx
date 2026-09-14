import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthCard, { FormField, SubmitButton } from "../components/AuthCard";
import { useAuth } from "../context/AuthContext";
import { ROLES, getDashboardPath } from "../config/roles";

// Matches the deployed backend's `spocuni` signup schema:
// { uni_name, name, subject_expertise, problems_proposal, phone_number, password }
const INITIAL_FORM = {
  uniName: "",
  name: "",
  phone: "",
  password: "",
  confirmPassword: "",
  subjectExpertise: "", // comma-separated, e.g. "electronics, agriculture"
};

export default function UniversityRegister() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState(INITIAL_FORM);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        uniName: form.uniName,
        name: form.name,
        subjectExpertise: form.subjectExpertise
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        phone: form.phone,
        password: form.password,
      };
      const user = await register(ROLES.UNI_SPOC, payload);
      navigate(getDashboardPath(user.type), { replace: true });
    } catch (err) {
      setError(err.response?.data?.detail || err.message || "Could not create account. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthCard
      title="Register your University"
      subtitle="Set up your university's SPOC (single point of contact) account."
      error={error}
      footer={
        <>
          Already registered?{" "}
          <Link to="/auth/university/login" className="font-semibold text-slate-900 hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <FormField label="University name" type="text" name="uniName" value={form.uniName} onChange={handleChange} required autoComplete="organization" />
        <FormField label="SPOC full name" type="text" name="name" value={form.name} onChange={handleChange} required autoComplete="name" />

        <FormField label="Phone number" type="tel" name="phone" value={form.phone} onChange={handleChange} required autoComplete="tel" />
        <FormField
          label="Subject expertise (comma-separated)"
          type="text"
          name="subjectExpertise"
          value={form.subjectExpertise}
          onChange={handleChange}
          placeholder="electronics, agriculture, civil"
        />

        <FormField label="Password" type="password" name="password" value={form.password} onChange={handleChange} required minLength={8} autoComplete="new-password" />
        <FormField label="Confirm password" type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required minLength={8} autoComplete="new-password" />

        <SubmitButton submitting={submitting}>Create account</SubmitButton>
      </form>
    </AuthCard>
  );
}