import { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * ClientSearch component to search for clients.
 * Uses mock data to simulate search results.
 */
const ClientSearch = () => {
  const [query, setQuery] = useState('');
  const [clients, setClients] = useState([]);

  // Mock data for clients
  const mockClients = [
    { id: '1', name: 'John Doe', email: 'john@example.com' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
  ];

  const handleSearch = () => {
    // Simulate search by filtering mock data
    const filteredClients = mockClients.filter((client) =>
      client.name.toLowerCase().includes(query.toLowerCase())
    );
    setClients(filteredClients);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Search Clients</h2>
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name..."
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>
      <ul className="space-y-2">
        {clients.map((client) => (
          <li key={client.id} className="border-b py-2">
            <Link
              to={`/client/${client.id}`}
              className="text-blue-600 hover:underline"
            >
              {client.name} ({client.email})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientSearch;