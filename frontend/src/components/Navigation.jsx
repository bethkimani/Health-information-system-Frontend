import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  FaBars,
  FaSignOutAlt, // Updated to use logout icon
  FaUsers,
  FaEnvelope,
  FaUserMd,
  FaShieldAlt,
  FaBookMedical, // For Programs
  FaCalendarAlt, // For Appointments
  FaFileMedical, // For Health Records
} from 'react-icons/fa';

function Navigation({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', icon: FaBars, path: '/dashboard' },
    { name: 'Clients', icon: FaUsers, path: '/clients' },
    { name: 'Programs', icon: FaBookMedical, path: '/programs' },
    { name: 'Appointments', icon: FaCalendarAlt, path: '/appointments' },
    { name: 'Health Records', icon: FaFileMedical, path: '/health-records' },
    { name: 'Team', icon: FaUserMd, path: '/team' },
    { name: 'Messages', icon: FaEnvelope, path: '/messages' },
  ];

  const roleItems = [
    { name: 'Doctor', path: '/team?role=doctor' },
    { name: 'Nurse', path: '/team?role=nurse' },
    { name: 'Administrator', path: '/team?role=administrator' },
  ];

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`bg-blue-900 text-white flex flex-col py-6 transition-all duration-300 ${
          isCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        <div className="flex justify-end px-4 mb-6">
          <button onClick={() => setIsCollapsed(!isCollapsed)}>
            <FaBars className="text-xl" />
          </button>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link to={item.path} className="no-underline">
                  <div
                    className={`flex items-center p-3 mx-2 rounded-lg transition-colors duration-200 ${
                      location.pathname === item.path
                        ? 'bg-blue-700 text-white'
                        : 'text-gray-200 hover:bg-blue-800 hover:text-white'
                    }`}
                  >
                    <item.icon className="text-xl" />
                    {!isCollapsed && <span className="ml-3">{item.name}</span>}
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          {!isCollapsed && (
            <div className="mt-6 px-4">
              <h3 className="text-sm font-semibold text-gray-300 mb-2">Roles</h3>
              <ul className="space-y-1">
                {roleItems.map((role) => (
                  <li key={role.name}>
                    <Link to={role.path} className="no-underline">
                      <div
                        className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${
                          location.search === `?role=${role.name.toLowerCase()}`
                            ? 'bg-blue-700 text-white'
                            : 'text-gray-200 hover:bg-blue-800 hover:text-white'
                        }`}
                      >
                        <FaShieldAlt className="text-sm" />
                        <span className="ml-3 text-sm">{role.name}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </nav>

        <div className="mt-auto px-4">
          <div
            onClick={handleLogout}
            className="flex items-center p-3 rounded-lg text-gray-200 hover:bg-blue-800 hover:text-white cursor-pointer transition-colors duration-200"
          >
            <FaSignOutAlt className="text-xl" />
            {!isCollapsed && <span className="ml-3">Logout</span>}
          </div>
        </div>
      </aside>

      <div className="flex-grow">{children}</div>
    </div>
  );
}

export default Navigation;