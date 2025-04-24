import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ClientSearch = () => {
  const [query, setQuery] = useState('');
  const [clients, setClients] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/clients/search?query=${query}`, {
        headers: { Authorization: `Bearer YOUR_JWT_TOKEN` },
      });
      setClients(response.data);
    } catch (error) {
      console.error(error);
      alert('Error searching clients');
    }
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
        <button onClick={handleSearch} className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Search
        </button>
      </div>
      <ul className="space-y-2">
        {clients.map((client) => (
          <li key={client.id} className="border-b py-2">
            <Link to={`/client/${client.id}`} className="text-blue-600 hover:underline">
              {client.name} ({client.email})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientSearch;