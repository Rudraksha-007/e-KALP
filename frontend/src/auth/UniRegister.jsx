import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthCard, { FormField, SubmitButton } from "../components/AuthCard";
import { authApi } from "../services/api";

// Two university account types. Forms below collect exactly the fields the
// backend pydantic schemas require:
//   SpocSignup      -> uni_name, name, email, subject_expertise, password
//   TeamLeadSignup  -> name, email, password, uni_id, team_members, workspace
const TYPES = {
  spocuni: {
    id: "spocuni",
    title: "Register as a SPOC",
    subtitle: "Set up your university's single point of contact account.",
    register: authApi.spocRegister,
    login: authApi.spocLogin,
    me: authApi.spocMe,
    dashboard: "/university/dashboard",
  },
  teamlead: {
    id: "teamlead",
    title: "Register as Team Lead",
    subtitle: "Join a university to manage engineering projects.",
    register: authApi.teamLeadRegister,
    login: authApi.teamLeadLogin,
    me: authApi.teamLeadMe,
    dashboard: "/university/projects",
  },
};

const OPTIONS = [
  {
    ...TYPES.teamlead,
    kicker: "TEAM LEAD",
    tagline: "Manage your project and its progress",
  },
  {
    ...TYPES.spocuni,
    kicker: "SPOC",
    tagline: "Oversee university problems & students",
  },
];

const INITIAL_FORM = {
  name: "",
  email: "",
  uni_name: "",
  uni_id: "",
  teamMembers: "",
  password: "",
  confirmPassword: "",
};

// Canonical subject categories — values match the backend's category set
// (see backend/services/nlp/category_prototypes.py) and are sent as
// `subject_expertise` in the SpocSignup payload.
const SUBJECT_CATEGORIES = [
  { value: "EDUCATION", label: "Education" },
  { value: "HEALTHCARE", label: "Healthcare" },
  { value: "AGRICULTURE", label: "Agriculture" },
  { value: "WATER_MANAGEMENT", label: "Water management" },
  { value: "SANITATION", label: "Sanitation" },
  { value: "ENVIRONMENT", label: "Environment" },
  { value: "RURAL_LIVELIHOODS", label: "Rural livelihoods" },
  { value: "ACCESSIBILITY", label: "Accessibility" },
  { value: "URBAN_INFRASTRUCTURE", label: "Urban infrastructure" },
  { value: "PUBLIC_SERVICE_DELIVERY", label: "Public service delivery" },
];

function TypePicker({ onSelect }) {
  return (
    <div className="flex flex-col gap-3">
      {OPTIONS.map((opt) => (
        <button
          key={opt.id}
          type="button"
          onClick={() => onSelect(opt.id)}
          className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4 text-left transition-colors hover:border-violet-500 hover:bg-violet-50"
        >
          <span>
            <span className="block font-mono text-[10px] tracking-[0.2em] text-slate-400">
              {opt.kicker}
            </span>
            <span className="mt-0.5 block text-sm font-semibold text-slate-900">
              {opt.title}
            </span>
            <span className="mt-0.5 block text-xs text-slate-500">{opt.tagline}</span>
          </span>
          <span className="text-lg text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-violet-500">
            →
          </span>
        </button>
      ))}
    </div>
  );
}

export default function UniversityRegister() {
  const navigate = useNavigate();

  const [mode, setMode] = useState(null);
  const [form, setForm] = useState(INITIAL_FORM);
  const [selectedExpertise, setSelectedExpertise] = useState([]);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const type = mode ? TYPES[mode] : null;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function toggleExpertise(value) {
    setSelectedExpertise((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  }

  // Build the POST body for whichever account type is selected, matching the
  // backend pydantic schemas exactly.
  function buildPayload() {
    if (mode === "spocuni") {
      return {
        uni_name: form.uni_name.trim(),
        name: form.name.trim(),
        email: form.email.trim(),
        subject_expertise: selectedExpertise,
        password: form.password,
      };
    }
    return {
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
      uni_id: Number(form.uni_id),
      team_members: form.teamMembers
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      workspace: null,
    };
  }

  // Auto-login after signup with the same credentials, persist the session,
  // then land on the matching dashboard.
  async function autoLogin() {
    const { data: tokens } = await type.login({
      email: form.email.trim(),
      password: form.password,
    });
    localStorage.setItem("token", tokens.access_token);
    const { data: profile } = await type.me();
    localStorage.setItem("user", JSON.stringify({ ...profile, type: profile.role }));
    navigate(type.dashboard, { replace: true });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (mode === "teamlead" && !/^\d+$/.test(form.uni_id.trim())) {
      setError("University Registration Number must be a number.");
      return;
    }

    setSubmitting(true);
    try {
      await type.register(buildPayload());
      try {
        await autoLogin();
      } catch {
        // Signup succeeded but auto-login failed — land on the login page.
        navigate("/auth/university/login", { replace: true, state: { mode } });
      }
    } catch (err) {
      setError(
        err.response?.data?.detail?.map?.((d) => d.msg).join(", ") ||
        err.response?.data?.detail ||
        err.response?.data?.message ||
        "Could not create account. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthCard
      title={type ? type.title : "Register with your University"}
      subtitle={type ? type.subtitle : "Choose the account type you want to create."}
      error={error}
      footer={
        <>
          Already registered?{" "}
          <Link
            to="/auth/university/login"
            className="font-semibold text-slate-900 hover:underline"
          >
            Log in
          </Link>
        </>
      }
    >
      {!mode ? (
        <TypePicker onSelect={setMode} />
      ) : (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <button
            type="button"
            onClick={() => setMode(null)}
            className="text-left text-xs text-slate-500 hover:text-slate-900"
          >
            ← Choose a different account type
          </button>

          {mode === "spocuni" && (
            <>
              <FormField
                label="University name"
                type="text"
                name="uni_name"
                value={form.uni_name}
                onChange={handleChange}
                required
                autoComplete="organization"
              />
              <FormField
                label="SPOC full name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                autoComplete="name"
              />
              <FormField
                label="Email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />

              <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-900">
                Subject expertise (select all that apply)
                <div className="flex flex-wrap gap-2">
                  {SUBJECT_CATEGORIES.map((cat) => {
                    const selected = selectedExpertise.includes(cat.value);
                    return (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() => toggleExpertise(cat.value)}
                        className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                          selected
                            ? "border-violet-600 bg-violet-600 text-white"
                            : "border-slate-200 bg-white text-slate-600 hover:border-violet-400 hover:text-violet-600"
                        }`}
                      >
                        {selected ? "✓ " : "+ "}{cat.label}
                      </button>
                    );
                  })}
                </div>
              </label>
            </>
          )}

          {mode === "teamlead" && (
            <>
              <FormField
                label="Full name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                autoComplete="name"
              />
              <FormField
                label="Email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
              <FormField
                label="University Registration Number"
                type="number"
                name="uni_id"
                value={form.uni_id}
                onChange={handleChange}
                required
                min="0"
                placeholder="e.g. 3250412345"
              />
              <FormField
                label="Team members (comma-separated names)"
                type="text"
                name="teamMembers"
                value={form.teamMembers}
                onChange={handleChange}
                placeholder="Amit, Sara, Rohan"
              />
            </>
          )}

          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={8}
              autoComplete="new-password"
            />
            <FormField
              label="Confirm password"
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              minLength={8}
              autoComplete="new-password"
            />
          </div>

          <SubmitButton submitting={submitting}>Create account</SubmitButton>
        </form>
      )}
    </AuthCard>
  );
}