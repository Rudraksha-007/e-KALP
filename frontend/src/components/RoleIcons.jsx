import { ROLES } from "../config/roles";

function CitizenIcon(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" {...props}>
      <circle cx="24" cy="16" r="7" stroke="currentColor" strokeWidth="2.4" />
      <path d="M10 39c1.6-8 7-12.5 14-12.5S36.4 31 38 39" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

function UniversityIcon(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" {...props}>
      <path d="M24 9 44 18 24 27 4 18 24 9Z" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M13 22.5V32c0 2.8 5 6 11 6s11-3.2 11-6v-9.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M44 18v11" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

function IndustryIcon(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" {...props}>
      <path d="M6 40V23l11 7v-7l11 7v-7l14 9v11H6Z" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M14 40v-7M24 40v-7M34 40v-7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

function AdminIcon(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" {...props}>
      <path d="M24 5 40 11v11c0 11-7 18.5-16 21-9-2.5-16-10-16-21V11L24 5Z" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M18 24l4 4 8-9" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export const ROLE_ICONS = {
  [ROLES.CITIZEN]: CitizenIcon,
  [ROLES.UNI_SPOC]: UniversityIcon,
  [ROLES.INDUSTRY_SPOC]: IndustryIcon,
  [ROLES.ADMIN_GOV]: AdminIcon,
};
