import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoutes";
import { ROLES } from "./config/roles";

import LandingPage from "./pages/LandingPage";
import RoleSelection from "./pages/RoleSelection";
import SignUppage from "./pages/SignUppage";
import Unauthorized from "./pages/Unauthorized";

import CitizenLogin from "./auth/CitizenLogin";
import CitizenRegister from "./auth/CitizenRegister";
import UniversityLogin from "./auth/UniLogin";
import UniversityRegister from "./auth/UniRegister";
import IndustryLogin from "./auth/IndustryLogin";
import IndustryRegister from "./auth/IndustryRegister";
import AdminLogin from "./auth/AdminLogin";


// citizen pages
import CitizenDashboard from "./pages/citizens/CitizenDashboard";

//industry pages
import UniversityDashboard from "./pages/university/UniversityDashboard";
import Approvals from "./pages/university/Approvals";
import Industry from "./pages/university/Industry";
import Projects from "./pages/university/Projects";
import ProjectDetail from "./pages/university/ProjectDetail";


import IndustryDashboard from "./pages/industry/IndustryDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/select-role" element={<RoleSelection />} />
          <Route path="/signup" element={<SignUppage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Auth: Citizen */}
          <Route path="/auth/citizen/login" element={<CitizenLogin />} />
          <Route path="/auth/citizen/register" element={<CitizenRegister />} />

          {/* Auth: University SPOC */}
          <Route path="/auth/university/login" element={<UniversityLogin />} />
          <Route path="/auth/university/register" element={<UniversityRegister />} />

          {/* Auth: Industry SPOC */}
          <Route path="/auth/industry/login" element={<IndustryLogin />} />
          <Route path="/auth/industry/register" element={<IndustryRegister />} />

          {/* Auth: Admin/Govt (login only — accounts are provisioned) */}
          <Route path="/auth/admin/login" element={<AdminLogin />} />

          {/* Protected dashboards — one allowed role each */}
          <Route
            path="/citizen/dashboard"
            element={
              // <ProtectedRoute allowedRoles={[ROLES.CITIZEN]}>
                <CitizenDashboard />
              // </ProtectedRoute>
            }
          />
          
          <Route
            path="/university/dashboard"
            element={
              // <ProtectedRoute allowedRoles={[ROLES.UNI_SPOC]}>
                <UniversityDashboard />
              // </ProtectedRoute>
            }
          />

          <Route
            path="/university/approvals"
            element={
              // <ProtectedRoute allowedRoles={[ROLES.UNI_SPOC]}>
                <Approvals />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/university/industry"
            element={
              // <ProtectedRoute allowedRoles={[ROLES.UNI_SPOC]}>
                <Industry />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/university/projects"
            element={
              // <ProtectedRoute allowedRoles={[ROLES.UNI_SPOC]}>
                <Projects />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/university/projects/:id"
            element={
              // <ProtectedRoute allowedRoles={[ROLES.UNI_SPOC]}>
                <ProjectDetail />
              // </ProtectedRoute>
            }
          />

          <Route
            path="/industry/dashboard"
            element={
              // <ProtectedRoute allowedRoles={[ROLES.INDUSTRY_SPOC]}>
                <IndustryDashboard />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={[ROLES.ADMIN_GOV]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
