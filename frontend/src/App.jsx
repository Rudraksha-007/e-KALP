import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoutes";

import LandingPage from "./pages/LandingPage";
import Unauthorized from "./pages/Unauthorized";

import CitizenLogin from "./auth/CitizenLogin";
import CitizenRegister from "./auth/CitizenRegister";

import CitizenDashboard from "./pages/citizens/CitizenDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Auth: citizen signup + user login */}
          <Route path="/login" element={<CitizenLogin />} />
          <Route path="/register" element={<CitizenRegister />} />

          {/* Redirect legacy /auth/citizen/* paths */}
          <Route path="/auth/citizen/login" element={<CitizenLogin />} />
          <Route path="/auth/citizen/register" element={<CitizenRegister />} />

          {/* Protected dashboard — fetches data from the deployed backend */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <CitizenDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}