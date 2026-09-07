// import { useNavigate } from "react-router-dom";
// import { getSignupPath } from "../config/roles";

// /**
//  * A single role card. The whole card is clickable and keyboard-operable
//  * (Enter / Space), not just the CTA at the bottom.
//  */
// export default function RoleCard({ role }) {
//   const navigate = useNavigate();
//   const { Icon } = role;

//   function handleSelect() {
//     navigate(getSignupPath(role));
//   }

//   function handleKeyDown(event) {
//     if (event.key === "Enter" || event.key === " ") {
//       event.preventDefault();
//       handleSelect();
//     }
//   }

//   return (
//     <div
//       role="button"
//       tabIndex={0}
//       aria-label={`Continue as ${role.name}`}
//       onClick={handleSelect}
//       onKeyDown={handleKeyDown}
//       className={`group relative flex w-full cursor-pointer flex-col items-start gap-3.5 rounded-[20px] border border-slate-200 bg-white p-8 pb-7 shadow-sm outline-none transition-all duration-200 ease-out hover:-translate-y-1.5 hover:shadow-xl hover:shadow-slate-900/10 focus-visible:-translate-y-1.5 focus-visible:ring-2 focus-visible:ring-offset-2 ${role.ring}`}
//     >
//       <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${role.iconWrap}`}>
//         <Icon className="h-6 w-6" />
//       </span>

//       <h2 className="m-0 text-xl font-semibold text-slate-900">{role.name}</h2>
//       <p className="m-0 min-h-[3.3rem] text-[0.95rem] leading-relaxed text-slate-500">
//         {role.description}
//       </p>

//       <span className={`mt-1 inline-flex items-center gap-1.5 text-sm font-semibold ${role.ctaText}`}>
//         Continue
//         <svg
//           className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
//           viewBox="0 0 20 20"
//           fill="none"
//           aria-hidden="true"
//         >
//           <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
//         </svg>
//       </span>
//     </div>
//   );
// }



import { useNavigate } from "react-router-dom";

/**
 * A single role card. The whole card is clickable and keyboard-operable
 * (Enter / Space), not just the CTA at the bottom.
 *
 * `to` is the path to navigate to on select — RoleSelection decides
 * whether that's a login or register route.
 */
export default function RoleCard({ role, to }) {
  const navigate = useNavigate();
  const { Icon } = role;

  function handleSelect() {
    navigate(to);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleSelect();
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Continue as ${role.name}`}
      onClick={handleSelect}
      onKeyDown={handleKeyDown}
      className={`group relative flex w-full cursor-pointer flex-col items-start gap-3.5 rounded-[20px] border border-slate-200 bg-white p-8 pb-7 shadow-sm outline-none transition-all duration-200 ease-out hover:-translate-y-1.5 hover:shadow-xl hover:shadow-slate-900/10 focus-visible:-translate-y-1.5 focus-visible:ring-2 focus-visible:ring-offset-2 ${role.ring}`}
    >
      <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${role.iconWrap}`}>
        <Icon className="h-6 w-6" />
      </span>

      <h2 className="m-0 text-xl font-semibold text-slate-900">{role.name}</h2>
      <p className="m-0 min-h-[3.3rem] text-[0.95rem] leading-relaxed text-slate-500">{role.description}</p>

      <span className={`mt-1 inline-flex items-center gap-1.5 text-sm font-semibold ${role.ctaText}`}>
        Continue
        <svg
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  );
}
