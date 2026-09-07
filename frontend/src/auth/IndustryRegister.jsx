import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthCard, { FormField, SubmitButton } from "../components/AuthCard";
import { useAuth } from "../context/AuthContext";
import { ROLES, getDashboardPath } from "../config/roles";

// `user` columns + `spoc_industry` columns
// (industry_name, address, city/location, industry_type, collab_type)
const INITIAL_FORM = {
  name: "",
  age: "",
  gender: "",
  phone: "",
  password: "",
  confirmPassword: "",
  industryName: "",
  address: "",
  city: "",
  industryType: "",
  collabType: "", // nullable in schema, so not required here
};

export default function IndustryRegister() {
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
      const { confirmPassword, industryName, industryType, collabType, ...rest } = form;
      const payload = {
        ...rest,
        age: Number(rest.age),
        industry_name: industryName,
        industry_type: industryType,
        collab_type: collabType || null,
      };
      const user = await register(ROLES.INDUSTRY_SPOC, payload);
      navigate(getDashboardPath(user.type), { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Could not create account. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthCard
      title="Register your Industry"
      subtitle="Set up your organization's SPOC (single point of contact) account."
      error={error}
      footer={
        <>
          Already registered?{" "}
          <Link to="/auth/industry/login" className="font-semibold text-slate-900 hover:underline">
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
        <FormField label="Organization / industry name" type="text" name="industryName" value={form.industryName} onChange={handleChange} required />
        <FormField label="Address" type="text" name="address" value={form.address} onChange={handleChange} required />
        <FormField label="City / location" type="text" name="city" value={form.city} onChange={handleChange} required />
        <FormField label="Industry type" type="text" name="industryType" value={form.industryType} onChange={handleChange} required placeholder="e.g. manufacturing, IT" />
        <FormField
          label="Collaboration type (optional)"
          type="text"
          name="collabType"
          value={form.collabType}
          onChange={handleChange}
          placeholder="e.g. funding, mentoring"
        />

        <FormField label="Password" type="password" name="password" value={form.password} onChange={handleChange} required minLength={8} autoComplete="new-password" />
        <FormField label="Confirm password" type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required minLength={8} autoComplete="new-password" />

        <SubmitButton submitting={submitting}>Create account</SubmitButton>
      </form>
    </AuthCard>
  );
}
