// /**
//  * Single source of truth for every account type.
//  * RoleSelection.jsx maps over `roles` to render cards; SignupPage.jsx
//  * looks a role up by value to show the right heading/copy.
//  */

// function CitizenIcon(props) {
//   return (
//     <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" {...props}>
//       <circle cx="24" cy="16" r="7" stroke="currentColor" strokeWidth="2.4" />
//       <path d="M10 39c1.6-8 7-12.5 14-12.5S36.4 31 38 39" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
//     </svg>
//   );
// }

// function UniversityIcon(props) {
//   return (
//     <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" {...props}>
//       <path d="M24 9 44 18 24 27 4 18 24 9Z" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
//       <path d="M13 22.5V32c0 2.8 5 6 11 6s11-3.2 11-6v-9.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
//       <path d="M44 18v11" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
//     </svg>
//   );
// }

// function IndustryIcon(props) {
//   return (
//     <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" {...props}>
//       <path d="M6 40V23l11 7v-7l11 7v-7l14 9v11H6Z" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
//       <path d="M14 40v-7M24 40v-7M34 40v-7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
//     </svg>
//   );
// }

// export const roles = [
//   {
//     value: "citizen",
//     name: "Citizen",
//     route: "/citizen/signup",
//     description: "Join your community, report issues and contribute to local development.",
//     Icon: CitizenIcon,
//     // Tailwind classes per role so each card gets a distinct accent
//     // (kept together with the data instead of a switch in the component).
//     ring: "group-hover:ring-blue-500/40",
//     iconWrap: "text-blue-600 bg-blue-50",
//     ctaText: "text-blue-600",
//     borderGradient: "from-blue-500",
//   },
//   {
//     value: "university",
//     name: "University",
//     route: "/university/signup",
//     description: "Connect students, faculty and institutions with community initiatives.",
//     Icon: UniversityIcon,
//     ring: "group-hover:ring-violet-500/40",
//     iconWrap: "text-violet-600 bg-violet-50",
//     ctaText: "text-violet-600",
//     borderGradient: "from-violet-500",
//   },
//   {
//     value: "industry",
//     name: "Industry",
//     route: "/industry/signup",
//     description: "Collaborate with communities and support impactful projects.",
//     Icon: IndustryIcon,
//     ring: "group-hover:ring-amber-500/40",
//     iconWrap: "text-amber-600 bg-amber-50",
//     ctaText: "text-amber-600",
//     borderGradient: "from-amber-500",
//   },
// ];

// /** Builds "/citizen/signup?role=citizen" for a given role object. */
// export function getSignupPath(role) {
//   return `${role.route}?role=${role.value}`;
// }

// /** Look up a role definition by its value (e.g. from useSearchParams). */
// export function getRoleByValue(value) {
//   return roles.find((role) => role.value === value);
// }


/**
 * Single source of truth for account types.
 *
 * `value` MUST match the `user.type` values used by the backend/schema:
 *   citizen | uni_spoc | industry_spoc | admin_gov
 *
 * Everything else (routes, dashboard paths, labels) is derived from this
 * file so adding a new role never means hunting through the codebase.
 */

export const ROLES = {
  CITIZEN: "citizen",
  UNI_SPOC: "uni_spoc",
  INDUSTRY_SPOC: "industry_spoc",
  ADMIN_GOV: "admin_gov",
};

export const roles = [
  {
    value: ROLES.CITIZEN,
    name: "Citizen",
    loginRoute: "/auth/citizen/login",
    registerRoute: "/auth/citizen/register",
    dashboardRoute: "/citizen/dashboard",
    description: "Join your community, report issues and contribute to local development.",
    ring: "group-hover:ring-blue-500/40",
    iconWrap: "text-blue-600 bg-blue-50",
    ctaText: "text-blue-600",
  },
  {
    value: ROLES.UNI_SPOC,
    name: "University",
    loginRoute: "/auth/university/login",
    registerRoute: "/auth/university/register",
    dashboardRoute: "/university/dashboard",
    description: "Connect students, faculty and institutions with community initiatives.",
    ring: "group-hover:ring-violet-500/40",
    iconWrap: "text-violet-600 bg-violet-50",
    ctaText: "text-violet-600",
  },
  {
    value: ROLES.INDUSTRY_SPOC,
    name: "Industry",
    loginRoute: "/auth/industry/login",
    registerRoute: "/auth/industry/register",
    dashboardRoute: "/industry/dashboard",
    description: "Collaborate with communities and support impactful projects.",
    ring: "group-hover:ring-amber-500/40",
    iconWrap: "text-amber-600 bg-amber-50",
    ctaText: "text-amber-600",
  },
  {
    value: ROLES.ADMIN_GOV,
    name: "Admin / Govt",
    loginRoute: "/auth/admin/login",
    registerRoute: "/auth/admin/register",
    dashboardRoute: "/admin/dashboard",
    description: "Oversee departments, manage problem statements and track progress.",
    ring: "group-hover:ring-emerald-500/40",
    iconWrap: "text-emerald-600 bg-emerald-50",
    ctaText: "text-emerald-600",
  },
];

export function getRoleByValue(value) {
  return roles.find((role) => role.value === value);
}

export function getDashboardPath(role) {
  const config = getRoleByValue(role);
  return config ? config.dashboardRoute : "/";
}
