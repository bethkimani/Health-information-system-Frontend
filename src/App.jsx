import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Navigation from './components/Navigation';
import ClientsList from './pages/clients/ClientsList';
import ViewClient from './pages/clients/ViewClient';
import ProgramsPage from './pages/ProgramsPage';
import AddProgram from './pages/AddProgram';
import RegisterClient from './pages/RegisterClient';
import AppointmentsPage from './pages/AppointmentsPage';
import HealthRecordsPage from './pages/HealthRecordsPage';
import Team from './pages/Team';
import MessagesPage from './pages/MessagesPage';
import { useEffect } from 'react';

/**
 * App component serves as the main entry point for the CEMA Health System.
 * It handles routing and authentication state.
 * @returns {JSX.Element} The main application layout.
 */
function App() {
  const isLoggedIn = !!localStorage.getItem("access_token");
  const navigate = useNavigate();

  useEffect(() => {
    // If user is logged in and on the root path, redirect to dashboard
    if (isLoggedIn && window.location.pathname === '/') {
      navigate('/dashboard');
    }
    // If user is not logged in and not on login or reset-password, redirect to login
    if (!isLoggedIn && !['/login', '/reset-password'].includes(window.location.pathname)) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="min-h-screen bg-gray-100">
      {isLoggedIn ? (
        <Navigation>
          <div className="p-6">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/clients" element={<ClientsList />} />
              <Route path="/clients/:id" element={<ViewClient />} />
              <Route path="/register-client" element={<RegisterClient />} />
              <Route path="/programs" element={<ProgramsPage />} />
              <Route path="/add-program" element={<AddProgram />} />
              <Route path="/appointments" element={<AppointmentsPage />} />
              <Route path="/health-records" element={<HealthRecordsPage />} />
              <Route path="/team" element={<Team />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </div>
        </Navigation>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<Login isResetPassword />} />
          <Route path="*" element={<Login />} /> {/* Redirect all unmatched routes to login */}
        </Routes>
      )}
    </div>
  );
}

export default App;