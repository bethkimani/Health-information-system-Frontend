import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Navigation from './components/Navigation';
import Suppliers from './pages/Suppliers';
import ViewSupplier from './pages/ViewSupplier';
import EditSupplier from './pages/EditSupplier';
import UploadDocuments from './pages/UploadDocuments';
import ClientsList from './pages/clients/ClientsList'; // Corrected path
import ViewClient from './pages/clients/ViewClient'; // Corrected path
import { useEffect } from 'react';

function App() {
  const isLoggedIn = !!localStorage.getItem("access_token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  useEffect(() => {
    if (isLoggedIn && window.location.pathname === '/') {
      navigate('/dashboard');
    }
  }, [isLoggedIn, navigate]);

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white p-4 shadow-md flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-semibold text-gray-800">CEMA Health System</h1>
        </div>
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <span className="text-gray-600">Hello, User</span>
              <span className="text-gray-600 flex items-center">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
                32°C Nairobi
              </span>
              <span className="text-gray-600">{currentDate}</span>
              <button onClick={handleLogout} className="text-gray-600 hover:text-gray-800">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-gray-800">Login</Link>
              <Link to="/register" className="text-gray-600 hover:text-gray-800">Register</Link>
            </>
          )}
        </div>
      </nav>

      {isLoggedIn ? (
        <Navigation>
          <div className="p-6">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/suppliers" element={<Suppliers />} />
              <Route path="/suppliers/:id" element={<ViewSupplier />} />
              <Route path="/suppliers/edit/:id" element={<EditSupplier />} />
              <Route path="/suppliers/:id/documents" element={<UploadDocuments />} />
              <Route path="/clients" element={<ClientsList />} />
              <Route path="/clients/:id" element={<ViewClient />} />
              <Route path="/patients" element={<div className="text-center"><h2 className="text-xl">Patients Page (Under Construction)</h2></div>} />
              <Route path="/messages" element={<div className="text-center"><h2 className="text-xl">Messages Page (Under Construction)</h2></div>} />
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </div>
        </Navigation>
      ) : (
        <div className="p-6">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                <div className="text-center">
                  <h2 className="text-xl">Please log in to access the system.</h2>
                  <Link to="/login" className="text-blue-600 hover:underline">
                    Go to Login
                  </Link>
                </div>
              }
            />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;