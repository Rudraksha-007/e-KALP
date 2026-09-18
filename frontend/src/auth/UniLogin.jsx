import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthCard, { FormField, SubmitButton } from "../components/AuthCard";
import { authApi } from "../services/api";

// Two university account types — each maps to its own backend login + profile
// endpoints and its own dashboard.
const TYPES = {
  spocuni: {
    id: "spocuni",
    title: "Login as a SPOC",
    subtitle: "Oversee your university's problems and students.",
    login: authApi.spocLogin,
    me: authApi.spocMe,
    dashboard: "/university/dashboard",
  },
  teamlead: {
    id: "teamlead",
    title: "Login as Team Lead",
    subtitle: "Manage your project and its progress.",
    login: authApi.teamLeadLogin,
    me: authApi.teamLeadMe,
    dashboard: "/university/projects",
  },
};

const OPTIONS = [
  {
    ...TYPES.teamlead,
    kicker: "TEAM LEAD",
    tagline: "Manage your project",
  },
  {
    ...TYPES.spocuni,
    kicker: "SPOC",
    tagline: "Oversee university problems & students",
  },
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

export default function UniversityLogin() {
  const navigate = useNavigate();

  const [mode, setMode] = useState(null);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const type = mode ? TYPES[mode] : null;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const { data: tokens } = await type.login(form);
      localStorage.setItem("token", tokens.access_token);
      const { data: profile } = await type.me();
      localStorage.setItem("user", JSON.stringify({ ...profile, type: profile.role }));
      navigate(type.dashboard, { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.detail?.map?.((d) => d.msg).join(", ") ||
        err.response?.data?.detail ||
        "Invalid email or password."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthCard
      title={type ? type.title : "University Login"}
      subtitle={type ? type.subtitle : "Choose how you want to log in."}
      error={error}
      footer={
        <>
          New here?{" "}
          <Link
            to="/auth/university/register"
            className="font-semibold text-slate-900 hover:underline"
          >
            Register your university account
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
      )}
    </AuthCard>
  );
}