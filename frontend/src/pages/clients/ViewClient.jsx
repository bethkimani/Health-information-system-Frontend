import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaUsers } from 'react-icons/fa';

const ViewClient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [error, setError] = useState(null);

  // Fetch client profile (simulated API call)
  useEffect(() => {
    const fetchClient = async () => {
      try {
        const clients = JSON.parse(localStorage.getItem('clients') || '[]');
        const foundClient = clients.find((c) => c.id === id);
        if (!foundClient) throw new Error('Client not found');
        setClient(foundClient);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchClient();
  }, [id]);

  if (error) {
    return (
      <div className="flex-1 p-6 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">{error}</h1>
          <button
            onClick={() => navigate('/clients')}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Back to Clients
          </button>
        </div>
      </div>
    );
  }

  if (!client) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="flex-1 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate('/clients')}
            className="mr-4 text-orange-500 hover:text-orange-700"
          >
            <FaArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-2xl font-semibold text-orange-500">Client Profile</h1>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-medium mb-4">Client Details</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p><span className="text-gray-500">Client ID:</span> {client.id}</p>
              <p><span className="text-gray-500">Name:</span> {client.name}</p>
              <p><span className="text-gray-500">Date of Birth:</span> {client.dob}</p>
              <p><span className="text-gray-500">Gender:</span> {client.gender}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Enrolled Programs</h3>
              {client.programs.length > 0 ? (
                <ul className="list-disc pl-5">
                  {client.programs.map((program, index) => (
                    <li key={index}>{program}</li>
                  ))}
                </ul>
              ) : (
                <p>No programs enrolled</p>
              )}
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">API Access</h3>
            <p className="text-gray-500">Retrieve this profile via API:</p>
            <code className="block bg-gray-100 p-2 rounded mt-2">
              GET /api/clients/{client.id}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewClient;