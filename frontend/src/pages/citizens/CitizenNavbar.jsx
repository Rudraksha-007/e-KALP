import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { DUMMY_USER } from "./dummyProblems";

const navItems = [
  { to: "/citizen/dashboard", label: "Dashboard", icon: DashboardIcon },
  { to: "/citizen/explore", label: "Explore", icon: SearchIcon },
  { to: "/citizen/my-reports", label: "My Reports", icon: ReportsIcon },
  { to: "/citizen/profile", label: "Profile", icon: ProfileIcon },
];

export default function CitizenNavbar() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const displayName = user?.name ?? DUMMY_USER.name;
  const initial = (displayName || "U").trim().charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-30 border-b border-neutral-700/40 bg-neutral-900">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-white">
            <PinIcon className="h-4.5 w-4.5" />
          </span>
          <span className="text-[15px] font-bold tracking-tight text-white">SocioLens</span>
          <span className="hidden rounded-md border border-neutral-700 px-2 py-0.5 text-[11px] font-medium text-neutral-400 sm:inline">
            Jharkhand
          </span>
        </div>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? "bg-neutral-800 text-orange-400" : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
                }`
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
          <button
            onClick={() => navigate("/citizen/report")}
            className="ml-2 flex items-center gap-1.5 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
          >
            <PlusIcon className="h-4 w-4" />
            Report Problem
          </button>
        </nav>

        <button
          onClick={() => navigate("/citizen/profile")}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500/20 text-sm font-semibold text-orange-400 ring-1 ring-orange-500/30"
          aria-label="Profile"
        >
          {initial}
        </button>
      </div>

      {/* Mobile nav */}
      <div className="flex items-center gap-1 overflow-x-auto border-t border-neutral-800 px-4 py-2 md:hidden">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium ${
                isActive ? "bg-neutral-800 text-orange-400" : "text-neutral-400"
              }`
            }
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </NavLink>
        ))}
      </div>
    </header>
  );
}

function PinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" />
    </svg>
  );
}
function DashboardIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <rect x="3" y="3" width="8" height="8" rx="1.5" />
      <rect x="13" y="3" width="8" height="8" rx="1.5" />
      <rect x="3" y="13" width="8" height="8" rx="1.5" />
      <rect x="13" y="13" width="8" height="8" rx="1.5" />
    </svg>
  );
}
function SearchIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" strokeLinecap="round" />
    </svg>
  );
}
function ReportsIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" strokeLinejoin="round" />
      <path d="M9 12h6M9 16h6" strokeLinecap="round" />
    </svg>
  );
}
function ProfileIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c1.2-3.6 4-5.5 7-5.5s5.8 1.9 7 5.5" strokeLinecap="round" />
    </svg>
  );
}
function PlusIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" {...props}>
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  );
}