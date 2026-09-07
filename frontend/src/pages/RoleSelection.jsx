// import RoleCard from "../components/RoleCard";
// import { roles } from "../config/roles";

// export default function RoleSelection() {
//   return (
//     <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-6 py-16">
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute -top-40 left-0 right-0 h-[60vh] bg-[radial-gradient(45%_60%_at_20%_20%,rgba(59,130,246,0.12),transparent_70%),radial-gradient(40%_55%_at_85%_15%,rgba(217,119,6,0.1),transparent_70%),radial-gradient(35%_45%_at_55%_45%,rgba(124,58,237,0.1),transparent_70%)]"
//       />

//       <div className="relative w-full max-w-5xl">
//         <header className="mx-auto mb-12 max-w-lg text-center">
//           <h1 className="mb-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
//             Choose your account type
//           </h1>
//           <p className="text-base leading-relaxed text-slate-500">
//             Select the type of account you want to create to get started.
//           </p>
//         </header>

//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {roles.map((role) => (
//             <RoleCard key={role.value} role={role} />
//           ))}
//         </div>
//       </div>
//     </main>
//   );
// }



import { Link } from "react-router-dom";
import RoleCard from "../components/RoleCard";
import { roles } from "../config/roles";
import { ROLE_ICONS } from "../components/RoleIcons";

/**
 * Landing step of the auth flow. Each card links straight to that role's
 * login page; a "Register" link underneath goes to sign-up instead.
 */
export default function RoleSelection() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-6 py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-0 right-0 h-[60vh] bg-[radial-gradient(45%_60%_at_20%_20%,rgba(59,130,246,0.12),transparent_70%),radial-gradient(40%_55%_at_85%_15%,rgba(217,119,6,0.1),transparent_70%),radial-gradient(35%_45%_at_55%_45%,rgba(124,58,237,0.1),transparent_70%)]"
      />

      <div className="relative w-full max-w-5xl">
        <header className="mx-auto mb-12 max-w-lg text-center">
          <h1 className="mb-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Welcome to the Portal
          </h1>
          <p className="text-base leading-relaxed text-slate-500">
            Select your account type to log in, or create a new account.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {roles.map((role) => (
            <div key={role.value} className="flex flex-col gap-3">
              <RoleCard role={{ ...role, Icon: ROLE_ICONS[role.value] }} to={role.loginRoute} />
              {role.value !== "admin_gov" && (
                <Link
                  to={role.registerRoute}
                  className="text-center text-xs font-medium text-slate-400 hover:text-slate-600"
                >
                  New {role.name.toLowerCase()}? Register instead
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
