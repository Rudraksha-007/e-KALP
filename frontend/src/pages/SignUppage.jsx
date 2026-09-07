// import { useState } from "react";
// import { useSearchParams, Link } from "react-router-dom";
// import { getRoleByValue } from "../config/roles";

// /**
//  * Used for /citizen/signup, /university/signup and /industry/signup alike.
//  * The route itself doesn't carry role-specific logic — the `role` query
//  * param does, so one component covers all three account types instead of
//  * three near-identical files.
//  */
// export default function SignupPage() {
//   const [searchParams] = useSearchParams();
//   const role = searchParams.get("role");
//   const roleConfig = getRoleByValue(role);

//   const [form, setForm] = useState({ name: "", email: "", password: "" });
//   const [status, setStatus] = useState("idle"); // idle | submitting | success | error

//   function handleChange(event) {
//     const { name, value } = event.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   }

//   async function handleSubmit(event) {
//     event.preventDefault();
//     setStatus("submitting");

//     const payload = { ...form, role }; // { name, email, password, role }

//     try {
//       // Replace with your real endpoint.
//       await fetch("/api/auth/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//       setStatus("success");
//     } catch (err) {
//       setStatus("error");
//     }
//   }

//   return (
//     <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12">
//       <div className="w-full max-w-md rounded-[20px] border border-slate-200 bg-white p-10 shadow-xl shadow-slate-900/5">
//         <Link to="/" className="mb-6 inline-block text-sm text-slate-500 hover:text-slate-900">
//           ← Choose a different account type
//         </Link>

//         <h1 className="mb-1 text-2xl font-semibold text-slate-900">
//           Create your {roleConfig ? roleConfig.name : "account"}
//         </h1>
//         <p className="mb-7 text-sm text-slate-500">
//           Signing up as <strong className="font-medium text-slate-700">{role}</strong>
//         </p>

//         <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
//           <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-900">
//             Full name
//             <input
//               type="text"
//               name="name"
//               value={form.name}
//               onChange={handleChange}
//               required
//               autoComplete="name"
//               className="rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
//             />
//           </label>

//           <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-900">
//             Email
//             <input
//               type="email"
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//               required
//               autoComplete="email"
//               className="rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
//             />
//           </label>

//           <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-900">
//             Password
//             <input
//               type="password"
//               name="password"
//               value={form.password}
//               onChange={handleChange}
//               required
//               autoComplete="new-password"
//               minLength={8}
//               className="rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
//             />
//           </label>

//           <input type="hidden" name="role" value={role || ""} />

//           <button
//             type="submit"
//             disabled={status === "submitting"}
//             className="mt-1 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
//           >
//             {status === "submitting" ? "Creating account…" : "Create account"}
//           </button>

//           {status === "success" && (
//             <p className="text-sm text-emerald-600">Account created. Check your email to verify.</p>
//           )}
//           {status === "error" && (
//             <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
//           )}
//         </form>
//       </div>
//     </main>
//   );
// }


import { Link } from "react-router-dom";
import RoleCard from "../components/RoleCard";
import { roles, ROLES } from "../config/roles";
import { ROLE_ICONS } from "../components/RoleIcons";

/**
 * "Choose account type to register" step. Admin/Govt is intentionally
 * excluded — those accounts are provisioned, not self-registered.
 */
export default function SignUppage() {
  const registrableRoles = roles.filter((role) => role.value !== ROLES.ADMIN_GOV);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black-50 px-6 py-16">
      <div className="relative w-full max-w-4xl">
        <header className="mx-auto mb-12 max-w-lg text-center">
          <h1 className="mb-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Create your account
          </h1>
          <p className="text-base leading-relaxed text-slate-500">
            Choose the type of account you want to create to get started.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {registrableRoles.map((role) => (
            <RoleCard key={role.value} role={{ ...role, Icon: ROLE_ICONS[role.value] }} to={role.registerRoute} />
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link to="/" className="font-semibold text-slate-900 hover:underline">
            Log in instead
          </Link>
        </p>
      </div>
    </main>
  );
}
