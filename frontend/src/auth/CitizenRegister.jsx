import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthCard, { FormField, SubmitButton } from "../components/AuthCard";
import { authApi } from "../services/api";

// Maps 1:1 onto the backend `CitizenSignup` schema (schemas/schemas.py):
//   name, phone, password, longitude, latitude, occupation, age, gender.
const INITIAL_FORM = {
  name: "",
  age: "",
  gender: "",
  occupation: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

const OCCUPATION_STUDENT = "student";

// Resolve the user's position, asking the browser for location permission.
// Returns a Promise<{longitude, latitude, accuracy}>.
function requestLocation() {
  return new Promise((resolve, reject) => {
    if (!("geolocation" in navigator)) {
      reject(new Error("Geolocation is not supported by this browser."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) =>
        resolve({
          longitude: pos.coords.longitude,
          latitude: pos.coords.latitude,
          accuracy: pos.coords.accuracy,
        }),
      (err) => {
        const messages = {
          1: "Location access was denied. Please allow location permission and try again.",
          2: "Your position is currently unavailable.",
          3: "Location request timed out. Please try again.",
        };
        reject(new Error(messages[err.code] || "Could not fetch your location."));
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  });
}

export default function CitizenRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState(INITIAL_FORM);
  const [uniToken, setUniToken] = useState("");
  const [location, setLocation] = useState(null); // {longitude, latitude, accuracy}
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null); // API response data, received back
  const [autoLoginFailed, setAutoLoginFailed] = useState(false);

  const isStudent = form.occupation.trim().toLowerCase() === OCCUPATION_STUDENT;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleGetLocation() {
    setLocating(true);
    setLocationError("");
    try {
      const coords = await requestLocation();
      setLocation(coords);
    } catch (err) {
      setLocationError(err.message);
      setLocation(null);
    } finally {
      setLocating(false);
    }
  }

  function validate() {
    if (form.password !== form.confirmPassword) {
      return "Passwords do not match.";
    }
    if (!location) {
      return "Please share your location before continuing.";
    }
    if (form.occupation !== form.occupation.toLowerCase() || /\s/.test(form.occupation)) {
      return "Occupation must be lowercase with no spaces (e.g. 'farmer').";
    }
    if (isStudent && !uniToken.trim()) {
      return "As a student you must provide your University Registration Number.";
    }
    if (isStudent && !/^\d+$/.test(uniToken.trim())) {
      return "University Registration Number must be a number.";
    }
    return "";
  }

  // Builds the exact POST body the backend `CitizenSignup` pydantic schema expects.
  const buildPayload = () => ({
    name: form.name,
    phone: form.phone,
    password: form.password,
    longitude: location.longitude,
    latitude: location.latitude,
    occupation: form.occupation.trim().toLowerCase(),
    age: Number(form.age),
    gender: form.gender,
    // citizens.uni_token — only sent for students.
    uni_token: isStudent ? Number(uniToken.trim()) : null,
  });

  // Auto-login after signup: POST /auth/citizen/login with the same
  // credentials, persist the JWT + profile, then open the dashboard.
  async function autoLogin() {
    const { data: tokens } = await authApi.citizenLogin({
      phone: form.phone,
      password: form.password,
    });
    localStorage.setItem("token", tokens.access_token);
    const { data: profile } = await authApi.citizenMe();
    localStorage.setItem("user", JSON.stringify({ ...profile, type: profile.role }));
    navigate("/citizen/dashboard", { replace: true });
  }

  // Sends the POST and keeps the data returned by the backend on screen.
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setAutoLoginFailed(false);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);
    try {
      const res = await authApi.citizenRegister(buildPayload());
      setResult(res.data); // {status, message, data}
      try {
        await autoLogin();
      } catch {
        // Signup succeeded but auto-login failed — offer manual login below.
        setAutoLoginFailed(true);
      }
    } catch (err) {
      setError(err.response?.data?.detail?.map?.((d) => d.msg).join(", ") ||
        err.response?.data?.detail ||
        err.response?.data?.message ||
        "Could not create account. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  // -------- Success screen: show the data the backend returned ---------
  if (result) {
    const { data } = result;
    return (
      <AuthCard title="Account created" subtitle={result.message || "Citizen registered successfully"} footer={
        autoLoginFailed ? (
          <>
            <span className="text-amber-600 text-xs block mb-2">
              Auto-login failed. Log in with your credentials to continue.
            </span>
            <button
              onClick={() => navigate("/auth/citizen/login")}
              className="font-semibold text-slate-900 hover:underline"
            >
              Continue to log in →
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/auth/citizen/login")}
            className="font-semibold text-slate-900 hover:underline"
          >
            Continue to log in →
          </button>
        )
      }>
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          <p className="font-semibold mb-2">What the server returned:</p>
          <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-emerald-800">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Create your Citizen account"
      subtitle="Join your community and start contributing."
      error={error}
      footer={
        <>
          Already have an account?{" "}
          <Link to="/auth/citizen/login" className="font-semibold text-slate-900 hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <FormField label="Full name" type="text" name="name" value={form.name} onChange={handleChange} required autoComplete="name" />

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Age" type="number" name="age" min="1" max="129" value={form.age} onChange={handleChange} required />
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
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </label>
        </div>

        <FormField label="Occupation" type="text" name="occupation" value={form.occupation} onChange={handleChange} required autoComplete="occupation" placeholder={isStudent ? "student" : "farmer"} />

        {isStudent && (
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <FormField
              label="University Registration Number"
              type="number"
              name="uniToken"
              value={uniToken}
              onChange={(e) => setUniToken(e.target.value)}
              required
              min="0"
              placeholder="e.g. 3250412345"
            />
            <p className="mt-2 text-xs text-blue-600">
              Sent as <code>uni_token</code> to link your citizen account to your university.
            </p>
          </div>
        )}

        <FormField label="Phone number" type="tel" name="phone" value={form.phone} onChange={handleChange} required autoComplete="tel" placeholder="9876543210" pattern="[0-9]{10}" />

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Password" type="password" name="password" value={form.password} onChange={handleChange} required minLength={8} autoComplete="new-password" />
          <FormField label="Confirm password" type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required minLength={8} autoComplete="new-password" />
        </div>

        {/* Location permission + coordinates */}
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-medium text-slate-900">Your location</p>
          <p className="mt-0.5 mb-3 text-xs text-slate-500">
            Your longitude and latitude are sent with your registration.
          </p>

          <button
            type="button"
            onClick={handleGetLocation}
            disabled={locating || !!location}
            className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {locating ? "Locating…" : location ? "Location granted ✓" : "Allow location access"}
          </button>

          {location && (
            <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
                <span className="block text-slate-400 font-semibold">LATITUDE</span>
                <span className="font-mono text-slate-800">{location.latitude.toFixed(6)}</span>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
                <span className="block text-slate-400 font-semibold">LONGITUDE</span>
                <span className="font-mono text-slate-800">{location.longitude.toFixed(6)}</span>
              </div>
              <span className="col-span-2 text-slate-400">
                Precision ±{Math.round(location.accuracy)} m
              </span>
            </div>
          )}
          {locationError && <p className="mt-3 text-xs text-red-600">{locationError}</p>}
        </div>

        <SubmitButton submitting={submitting || locating}>Create account</SubmitButton>
      </form>
    </AuthCard>
  );
}