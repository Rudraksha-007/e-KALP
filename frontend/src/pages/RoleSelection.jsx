

// import { Link } from "react-router-dom";
// import RoleCard from "../components/RoleCard";
// import { roles } from "../config/roles";
// import { ROLE_ICONS } from "../components/RoleIcons";

// /**
//  * Landing step of the auth flow. Each card links straight to that role's
//  * login page; a "Register" link underneath goes to sign-up instead.
//  */
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
//             Welcome to the Portal
//           </h1>
//           <p className="text-base leading-relaxed text-slate-500">
//             Select your account type to log in, or create a new account.
//           </p>
//         </header>

//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
//           {roles.map((role) => (
//             <div key={role.value} className="flex flex-col gap-3">
//               <RoleCard role={{ ...role, Icon: ROLE_ICONS[role.value] }} to={role.loginRoute} />
//               {role.value !== "admin_gov" && (
//                 <Link
//                   to={role.registerRoute}
//                   className="text-center text-xs font-medium text-slate-400 hover:text-slate-600"
//                 >
//                   New {role.name.toLowerCase()}? Register instead
//                 </Link>
//               )}
//             </div>
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

export default function RoleSelection() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f7f5] text-[#111111]">

      {/* Background grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(17,17,17,0.055) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(17,17,17,0.055) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Top orange line */}
      <div className="absolute left-0 top-0 h-[3px] w-full bg-[#ff5a00]" />

      {/* Decorative orange blocks */}
      <div className="absolute right-[8%] top-[18%] h-2 w-2 bg-[#ff5a00]" />
      <div className="absolute left-[5%] bottom-[15%] h-2 w-2 bg-[#ff5a00]" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-[1500px] flex-col px-6 py-8 sm:px-10 lg:px-14">

        {/* ================= HEADER ================= */}
        <header className="flex items-center justify-between border-b border-black/10 pb-5">

          <div className="flex items-center gap-4">
            <div className="flex h-8 w-8 items-center justify-center border border-black">
              <span className="text-[10px] font-black">eK</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-lg font-black tracking-tight">
                e-KALP
              </span>

              <span className="hidden h-4 w-px bg-black/20 sm:block" />

              <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-black/50 sm:block">
                Civic · Intelligence
              </span>
            </div>
          </div>

          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-black/50">
            AUTH / 01
          </div>
        </header>

        {/* ================= MAIN ================= */}
        <section className="grid flex-1 items-center gap-12 py-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">

          {/* LEFT SIDE */}
          <div>

            <div className="mb-7 flex items-center gap-3">
              <span className="h-2 w-2 bg-[#ff5a00]" />

              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.35em] text-[#ff5a00]">
                The Network
              </span>

              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-black/30">
                / Node Selection
              </span>
            </div>

            <h1 className="max-w-[760px] text-[clamp(4rem,8vw,8rem)] font-black uppercase leading-[0.84] tracking-[-0.065em]">
              One
              <br />
              Problem.
              <br />
              Four
              <br />
              Perspectives.
            </h1>

            <div className="mt-10 max-w-xl border-l-2 border-[#ff5a00] pl-5">
              <p className="text-xl font-medium leading-snug sm:text-2xl">
                Different perspectives.
                <br />
                Shared problems.
                <br />
                Better outcomes.
              </p>
            </div>

            <p className="mt-7 max-w-lg text-sm leading-7 text-black/55 sm:text-base">
              Connect citizens, institutions, industry and government
              through one civic intelligence network. Select your role
              to continue.
            </p>

            <div className="mt-10 flex items-center gap-4 font-mono text-[9px] uppercase tracking-[0.25em] text-black/35">
              <span>LATENT</span>
              <span>·</span>
              <span>VERIFIED</span>
              <span>·</span>
              <span>MAPPED</span>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="relative">

            {/* Connecting lines */}
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-black/[0.08]" />
            <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-black/[0.08]" />

            <div className="relative grid grid-cols-2 border border-black/10">

              {roles.map((role, index) => {
                const Icon = ROLE_ICONS[role.value];

                return (
                  <div
                    key={role.value}
                    className={`group relative min-h-[250px] border-black/10 p-6 transition-colors duration-300 hover:bg-white sm:p-8 ${
                      index === 0
                        ? "border-b border-r"
                        : index === 1
                        ? "border-b"
                        : index === 2
                        ? "border-r"
                        : ""
                    }`}
                  >

                    {/* Node number */}
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-black/30">
                        N.0{index + 1} · NODE
                      </span>

                      <span className="h-2 w-2 bg-[#ff5a00] opacity-70 transition-opacity group-hover:opacity-100" />
                    </div>

                    {/* Icon */}
                    <div className="mt-9 flex h-10 w-10 items-center justify-center border border-black/10">
                      <Icon className="h-5 w-5" />
                    </div>

                    {/* Role */}
                    <h2 className="mt-6 text-xl font-black uppercase tracking-[-0.03em] sm:text-2xl">
                      {role.name}
                    </h2>

                    <div className="mt-3 font-mono text-[9px] uppercase tracking-[0.2em] text-black/35">
                      {index === 0 && "Community / Ground"}
                      {index === 1 && "Knowledge / Research"}
                      {index === 2 && "Engineering / Scale"}
                      {index === 3 && "Policy / Governance"}
                    </div>

                    {/* Actual navigation */}
                    <Link
                      to={role.loginRoute}
                      aria-label={`Login as ${role.name}`}
                      className="absolute inset-0 z-10"
                    />

                    {/* Arrow */}
                    <div className="absolute bottom-6 right-6 text-sm opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                      →
                    </div>
                  </div>
                );
              })}

            </div>

            {/* Core catalyst */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-black/10 bg-[#f7f7f5] sm:h-36 sm:w-36">
              <div className="text-center">
                <div className="mx-auto mb-3 h-2 w-2 bg-[#ff5a00]" />

                <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-black/40">
                  Core Catalyst
                </p>

                <p className="mt-2 text-sm font-black uppercase leading-tight">
                  Civic
                  <br />
                  Intelligence
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FOOTER ================= */}
        <footer className="flex flex-col gap-3 border-t border-black/10 pt-5 font-mono text-[9px] uppercase tracking-[0.22em] text-black/35 sm:flex-row sm:items-center sm:justify-between">

          <span>
            Civic Intelligence Platform
          </span>

          <span>
            Select your node to continue →
          </span>

        </footer>
      </div>
    </main>
  );
}