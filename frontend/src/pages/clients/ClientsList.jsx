import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchClients } from '../../api.js'; // Changed from getClients to fetchClients

function ClientsList() {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchClients() // Changed from getClients to fetchClients
      .then((response) => {
        setClients(response.data);
        setFilteredClients(response.data);
      })
      .catch((error) => console.error('Error fetching clients:', error));
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredClients(
      clients.filter((client) =>
        `${client.first_name} ${client.last_name}`.toLowerCase().includes(value)
      )
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-900">Clients</h2>
          <div className="flex gap-3">
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition">
              <Link to="/add-program">Create Program</Link>
            </button>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition">
              <Link to="/register-client">Register Client</Link>
            </button>
          </div>
        </div>

        <div className="mb-6">
          <input
            type="text"
            className="w-full max-w-md p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Search clients..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">Client ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium">DOB</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Gender</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Program</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-gray-800">{client.id}</td>
                    <td className="px-6 py-4 text-gray-800">{`${client.first_name} ${client.last_name}`}</td>
                    <td className="px-6 py-4 text-gray-600">{client.dob}</td>
                    <td className="px-6 py-4 text-gray-600">{client.gender}</td>
                    <td className="px-6 py-4 text-gray-600">{client.programs.join(', ') || 'None'}</td>
                    <td className="px-6 py-4">
                      <Link to={`/clients/${client.id}`} className="text-blue-600 hover:underline">
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No clients found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ClientsList;