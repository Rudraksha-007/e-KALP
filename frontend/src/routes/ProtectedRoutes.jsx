// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const { user, isAuthenticated } = useAuth();

//   // Not logged in
//   if (!isAuthenticated) {
//     return <Navigate to="/roles" replace />;
//   }

//   // Wrong role
//   if (!allowedRoles.includes(user.role)) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;


import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Gate for any page that requires auth, optionally restricted to specific
 * roles. Use either as a wrapper (`<ProtectedRoute><X/></ProtectedRoute>`)
 * or as a layout route (`<Route element={<ProtectedRoute allowedRoles={...}/>}>`).
 *
 * - Not logged in            -> redirect to "/" (role selection / login entry)
 * - Logged in, wrong role    -> redirect to "/unauthorized"
 * - Logged in, correct role  -> render children or nested <Outlet/>
 */
export default function ProtectedRoute({ allowedRoles, children }) {
  const { isAuthenticated, role, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-500">Checking your session…</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children ?? <Outlet />;
}
