import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaPlus, FaSearch, FaFilter, FaEye, FaUserPlus } from 'react-icons/fa';

// Mock API simulation for client profile retrieval
const mockApi = {
  getClientProfile: async (clientId) => {
    const clients = JSON.parse(localStorage.getItem('clients') || '[]');
    const client = clients.find((c) => c.id === clientId);
    if (!client) throw new Error('Client not found');
    return client;
  },
};

const ClientsList = () => {
  const [clients, setClients] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [newClient, setNewClient] = useState({ name: '', dob: '', gender: '' });
  const [newProgram, setNewProgram] = useState({ name: '', description: '' });
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [isProgramModalOpen, setIsProgramModalOpen] = useState(false);
  const [enrollClientId, setEnrollClientId] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState('');
  const navigate = useNavigate();

  // Load clients and programs from localStorage
  useEffect(() => {
    try {
      const storedClients = JSON.parse(localStorage.getItem('clients') || '[]');
      const storedPrograms = JSON.parse(localStorage.getItem('programs') || '[]');
      setClients(storedClients);
      setPrograms(storedPrograms);
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  }, []);

  // Save clients and programs to localStorage
  const saveData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  // Register a new client
  const handleRegisterClient = (e) => {
    e.preventDefault();
    if (!newClient.name || !newClient.dob || !newClient.gender) return;
    const client = {
      id: `C-${Math.floor(Math.random() * 100000)}`,
      ...newClient,
      programs: [],
    };
    const updatedClients = [...clients, client];
    setClients(updatedClients);
    saveData('clients', updatedClients);
    setNewClient({ name: '', dob: '', gender: '' });
    setIsClientModalOpen(false);
  };

  // Create a new health program
  const handleCreateProgram = (e) => {
    e.preventDefault();
    if (!newProgram.name) return;
    const program = {
      id: `P-${Math.floor(Math.random() * 100000)}`,
      ...newProgram,
    };
    const updatedPrograms = [...programs, program];
    setPrograms(updatedPrograms);
    saveData('programs', updatedPrograms);
    setNewProgram({ name: '', description: '' });
    setIsProgramModalOpen(false);
  };

  // Enroll client in a program
  const handleEnrollClient = (clientId) => {
    if (!selectedProgram) return;
    const updatedClients = clients.map((client) => {
      if (client.id === clientId) {
        return {
          ...client,
          programs: [...client.programs, selectedProgram],
        };
      }
      return client;
    });
    setClients(updatedClients);
    saveData('clients', updatedClients);
    setEnrollClientId(null);
    setSelectedProgram('');
  };

  // View client profile
  const handleViewClient = (clientId) => {
    navigate(`/clients/${clientId}`);
  };

  // Search and filter clients
  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const indexOfLastClient = currentPage * itemsPerPage;
  const indexOfFirstClient = indexOfLastClient - itemsPerPage;
  const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient);
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar (assuming it's defined elsewhere) */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-xl font-bold text-orange-500">Health Info System</h2>
          <ul className="mt-4 space-y-2">
            <li className="flex items-center p-2 text-gray-700 hover:bg-orange-100 rounded">
              <FaUsers className="mr-2" />
              <span>Clients</span>
            </li>
            {/* Other navigation items */}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-orange-500">Clients</h1>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsProgramModalOpen(true)}
                className="flex items-center px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
              >
                <FaPlus className="mr-2" /> Create Program
              </button>
              <button
                onClick={() => setIsClientModalOpen(true)}
                className="flex items-center px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
              >
                <FaUserPlus className="mr-2" /> Register Client
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Clients Table */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DOB</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Programs</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentClients.length > 0 ? (
                  currentClients.map((client) => (
                    <tr key={client.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{client.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{client.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{client.dob}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{client.gender}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {client.programs.length > 0 ? client.programs.join(', ') : 'None'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                        <button
                          onClick={() => handleViewClient(client.id)}
                          className="text-orange-500 hover:text-orange-700"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => {
                            setEnrollClientId(client.id);
                            setSelectedProgram('');
                          }}
                          className="text-orange-500 hover:text-orange-700"
                        >
                          Enroll
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                      No clients found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredClients.length > 0 && (
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-500">
                Showing {indexOfFirstClient + 1} to {Math.min(indexOfLastClient, filteredClients.length)} of {filteredClients.length} clients
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 border rounded ${currentPage === page ? 'bg-orange-500 text-white' : ''}`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Register Client Modal */}
          {isClientModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg max-w-md w-full">
                <h2 className="text-xl font-semibold mb-4">Register New Client</h2>
                <form onSubmit={handleRegisterClient} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium">Name</label>
                    <input
                      type="text"
                      value={newClient.name}
                      onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Date of Birth</label>
                    <input
                      type="date"
                      value={newClient.dob}
                      onChange={(e) => setNewClient({ ...newClient, dob: e.target.value })}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Gender</label>
                    <select
                      value={newClient.gender}
                      onChange={(e) => setNewClient({ ...newClient, gender: e.target.value })}
                      className="w-full p-2 border rounded"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setIsClientModalOpen(false)}
                      className="px-4 py-2 border rounded hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                    >
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Create Program Modal */}
          {isProgramModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg max-w-md w-full">
                <h2 className="text-xl font-semibold mb-4">Create Health Program</h2>
                <form onSubmit={handleCreateProgram} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium">Program Name</label>
                    <input
                      type="text"
                      value={newProgram.name}
                      onChange={(e) => setNewProgram({ ...newProgram, name: e.target.value })}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                      value={newProgram.description}
                      onChange={(e) => setNewProgram({ ...newProgram, description: e.target.value })}
                      className="w-full p-2 border rounded"
                      rows="4"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setIsProgramModalOpen(false)}
                      className="px-4 py-2 border rounded hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                    >
                      Create
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Enroll Client Modal */}
          {enrollClientId && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg max-w-md w-full">
                <h2 className="text-xl font-semibold mb-4">Enroll in Program</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium">Select Program</label>
                    <select
                      value={selectedProgram}
                      onChange={(e) => setSelectedProgram(e.target.value)}
                      className="w-full p-2 border rounded"
                    >
                      <option value="">Select Program</option>
                      {programs.map((program) => (
                        <option key={program.id} value={program.name}>
                          {program.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setEnrollClientId(null)}
                      className="px-4 py-2 border rounded hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleEnrollClient(enrollClientId)}
                      className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                    >
                      Enroll
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientsList;