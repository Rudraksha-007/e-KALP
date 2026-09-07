import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthCard, { FormField, SubmitButton } from "../components/AuthCard";
import { useAuth } from "../context/AuthContext";
import { ROLES, getDashboardPath } from "../config/roles";

// `user` columns + `spoc_university` columns (address, location/city, proj_fields)
const INITIAL_FORM = {
  name: "",
  age: "",
  gender: "",
  phone: "",
  password: "",
  confirmPassword: "",
  address: "",
  city: "",
  projFields: "", // comma-separated, e.g. "education, agriculture"
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
      const { confirmPassword, projFields, ...rest } = form;
      const payload = {
        ...rest,
        age: Number(rest.age),
        proj_fields: projFields
          .split(",")
          .map((f) => f.trim())
          .filter(Boolean),
      };
      const user = await register(ROLES.UNI_SPOC, payload);
      navigate(getDashboardPath(user.type), { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Could not create account. Please try again.");
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
        <FormField label="SPOC full name" type="text" name="name" value={form.name} onChange={handleChange} required autoComplete="name" />

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Age" type="number" name="age" min="1" value={form.age} onChange={handleChange} required />
          <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-900">
            Gender
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              required
              className="rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="" disabled>Select</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
          </label>
        </div>

        <FormField label="Phone number" type="tel" name="phone" value={form.phone} onChange={handleChange} required autoComplete="tel" />
        <FormField label="University address" type="text" name="address" value={form.address} onChange={handleChange} required />
        <FormField label="City / location" type="text" name="city" value={form.city} onChange={handleChange} required />
        <FormField
          label="Project fields (comma-separated)"
          type="text"
          name="projFields"
          value={form.projFields}
          onChange={handleChange}
          placeholder="education, agriculture"
        />

        <FormField label="Password" type="password" name="password" value={form.password} onChange={handleChange} required minLength={8} autoComplete="new-password" />
        <FormField label="Confirm password" type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required minLength={8} autoComplete="new-password" />

        <SubmitButton submitting={submitting}>Create account</SubmitButton>
      </form>
    </AuthCard>
  );
}
