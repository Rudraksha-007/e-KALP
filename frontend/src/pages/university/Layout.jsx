import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Search, Bell, LayoutGrid, CheckCircle2, Building2, Folder, User, LogOut } from "lucide-react";
import Logo from "../../components/Logo";
import { useAuth } from "../../context/AuthContext";

/**
 * ------------------------------------------------------------------
 *  SHARED NAV CONFIG
 *  Badge counts are derived from live data at render time (see
 *  UniversityDashboard). This config stays static.
 * ------------------------------------------------------------------
 */
export const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", path: "/university/dashboard", icon: LayoutGrid, badge: null },
  { id: "approvals", label: "Team Assign", path: "/university/approvals", icon: CheckCircle2, badge: null },
  { id: "industry", label: "Industry", path: "/university/industry", icon: Building2, badge: null },
  { id: "projects", label: "Projects", path: "/university/projects", icon: Folder, badge: null },
];

function initialsFromName(name) {
  return (
    name
      ?.split(/\s+/)
      .map((p) => p[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U"
  );
}

function Sidebar({ navItems, user }) {
  return (
    <aside className="w-60 shrink-0 border-r border-neutral-200 bg-white flex flex-col h-screen sticky top-0">
      <div className="flex items-center justify-center px-5 py-4 border-b border-neutral-200">
        <Logo height={26} tile />
      </div>

      <div className="px-5 mt-6 mb-2">
        <span className="text-[11px] font-medium tracking-wide text-neutral-400">
          Navigation
        </span>
      </div>

      <nav className="flex-1 px-3 space-y-0.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.id}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-orange-50 text-orange-600 font-medium"
                    : "text-neutral-600 hover:bg-neutral-50"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </span>
                  {item.badge != null && (
                    <span
                      className={`text-xs font-medium rounded-full min-w-[20px] h-5 px-1.5 flex items-center justify-center ${
                        isActive
                          ? "bg-orange-200 text-orange-700"
                          : "bg-neutral-100 text-neutral-500"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      <NavLink
        to="/university/profile"
        title="View profile"
        className={({ isActive }) =>
          `border-t border-neutral-200 px-4 py-3.5 flex items-center gap-2.5 transition-colors ${
            isActive ? "bg-orange-50" : "hover:bg-neutral-50"
          }`
        }
      >
        <div className="w-8 h-8 rounded-full bg-neutral-800 text-white text-xs font-semibold flex items-center justify-center shrink-0">
          {user.avatarInitials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-neutral-900 truncate">{user.name}</p>
        </div>
        <User className="w-4 h-4 text-neutral-400 shrink-0" />
      </NavLink>
    </aside>
  );
}

function TopBar({ pageTitle }) {
  const { logout } = useAuth();
  return (
    <header className="flex items-center justify-between px-8 py-5 border-b border-neutral-200 bg-white">
      <h1 className="text-xl font-semibold text-neutral-900">{pageTitle}</h1>
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-9 pr-14 py-2 rounded-lg border border-neutral-200 bg-neutral-50 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-orange-200"
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-neutral-400 border border-neutral-200 rounded px-1.5 py-0.5">
            ⌘K
          </kbd>
        </div>
        <button className="relative w-9 h-9 rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-neutral-50">
          <Bell className="w-4 h-4 text-neutral-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-orange-500" />
        </button>
        <button
          onClick={logout}
          title="Log out"
          className="w-9 h-9 rounded-lg border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-neutral-50 hover:text-orange-600"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}

/**
 * Layout wraps every page: sidebar + topbar stay fixed, `children`
 * is the routed page content. Use it like:
 *
 *   <Layout pageTitle="Dashboard">
 *     <DashboardContent />
 *   </Layout>
 */
export default function Layout({ pageTitle, children }) {
  const { user } = useAuth();

  const sidebarUser = {
    name: user?.name ?? "—",
    avatarInitials: initialsFromName(user?.name),
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex text-neutral-900 font-sans">
      <Sidebar navItems={NAV_ITEMS} user={sidebarUser} />
      <div className="flex-1 min-w-0">
        <TopBar pageTitle={pageTitle} />
        <main className="px-8 py-6 space-y-6 max-w-[1400px]">{children}</main>
      </div>
    </div>
  );
}

/** Small helper so pages can programmatically navigate (e.g. buttons, row clicks) */
export function useAppNavigate() {
  return useNavigate();
}
