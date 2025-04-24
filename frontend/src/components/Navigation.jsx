import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  FaBars,
  FaUser,
  FaUsers,
  FaEnvelope,
  FaBox,
} from 'react-icons/fa';

function Navigation({ children }) {
  const [isCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', icon: FaBars, path: '/dashboard' },
    { name: 'Patients', icon: FaUser, path: '/patients' },
    { name: 'Clients', icon: FaUsers, path: '/clients' },
    { name: 'Messages', icon: FaEnvelope, path: '/messages' },
    { name: 'Suppliers', icon: FaBox, path: '/suppliers' },
  ];

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className={`bg-white shadow-md flex flex-col items-center py-6 space-y-6 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-16'}`}>
        {menuItems.map((item) => (
          <Link to={item.path} key={item.name} className="no-underline">
            <div
              className={`p-2 rounded-md transition-colors duration-200 ${
                location.pathname === item.path
                  ? 'bg-gray-200 text-gray-800'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
              }`}
            >
              <item.icon className="text-xl" />
            </div>
          </Link>
        ))}
        <div className="mt-auto">
          <div
            onClick={handleLogout}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-800 cursor-pointer"
          >
            <FaUser className="text-xl" />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow">{children}</div>
    </div>
  );
}

export default Navigation;