import { useParams } from 'react-router-dom';

/**
 * ClientProfile component to display client details.
 * Uses mock data to simulate client profile.
 */
const ClientProfile = () => {
  const { id } = useParams();

  // Mock client data
  const mockClient = {
    id: id,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    programs: ['TB Program', 'HIV Program'],
  };

  if (!mockClient) return <div className="text-center text-gray-600">Loading...</div>;

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Client Profile</h2>
      <p className="mb-2">
        <strong>Name:</strong> {mockClient.name}
      </p>
      <p className="mb-2">
        <strong>Email:</strong> {mockClient.email}
      </p>
      <p className="mb-2">
        <strong>Phone:</strong> {mockClient.phone}
      </p>
      <p className="mb-2">
        <strong>Programs:</strong>{' '}
        {mockClient.programs.length > 0 ? mockClient.programs.join(', ') : 'None'}
      </p>
    </div>
  );
};

export default ClientProfile;