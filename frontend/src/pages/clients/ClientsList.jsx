// src/components/ClientsList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchClients } from '../../api.js';

function ClientsList() {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const maxRetries = 3;
  const retryDelay = 2000; // 2 seconds

  const loadClients = async () => {
    if (retryCount >= maxRetries) {
      setError('Failed to load clients after multiple attempts. Please check your network connection or try again later.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetchClients();
      const fetchedClients = response.data || [];
      setClients(fetchedClients);
      setFilteredClients(fetchedClients);
      setRetryCount(0);
    } catch (error) {
      console.error('Error fetching clients:', error);
      const errorMessage = error.message || 'Failed to load clients. Please try again.';
      setError(errorMessage);

      // Retry only if the error is a network error (status: 0)
      if (error.status === 0) {
        setTimeout(() => {
          setRetryCount(retryCount + 1);
          loadClients();
        }, retryDelay);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClients();
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
              <Link to="/register-client">Register Client</Link>
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
            {retryCount < maxRetries && retryCount > 0 && ` Retrying (${retryCount}/${maxRetries})...`}
          </div>
        )}

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
              {loading && retryCount === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    Loading clients...
                  </td>
                </tr>
              ) : filteredClients.length > 0 ? (
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