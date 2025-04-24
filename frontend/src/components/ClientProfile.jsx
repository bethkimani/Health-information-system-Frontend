import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ClientProfile = () => {
  const { id } = useParams();
  const [client, setClient] = useState(null);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/clients/${id}`, {
          headers: { Authorization: `Bearer YOUR_JWT_TOKEN` },
        });
        setClient(response.data);
      } catch (error) {
        console.error(error);
        alert('Error fetching client profile');
      }
    };
    fetchClient();
  }, [id]);

  if (!client) return <div className="text-center text-gray-600">Loading...</div>;

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Client Profile</h2>
      <p className="mb-2"><strong>Name:</strong> {client.name}</p>
      <p className="mb-2"><strong>Email:</strong> {client.email}</p>
      <p className="mb-2"><strong>Phone:</strong> {client.phone}</p>
      <p className="mb-2"><strong>Programs:</strong> {client.programs.length > 0 ? client.programs.join(', ') : 'None'}</p>
    </div>
  );
};

export default ClientProfile;