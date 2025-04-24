import { useState } from 'react';

/**
 * EnrollClient component to enroll a client in a program.
 * Uses mock data to simulate client and program selection.
 */
const EnrollClient = () => {
  const [formData, setFormData] = useState({ client_id: '', program_id: '' });

  // Mock data for clients and programs
  const clients = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
  ];
  const programs = [
    { id: '1', name: 'TB Program' },
    { id: '2', name: 'HIV Program' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate successful enrollment
    alert('Client enrolled successfully! (Mock)');
    setFormData({ client_id: '', program_id: '' });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Enroll Client in Program</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Client</label>
          <select
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.client_id}
            onChange={(e) => setFormData({ ...formData, client_id: e.target.value })}
            required
          >
            <option value="">Select Client</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Program</label>
          <select
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.program_id}
            onChange={(e) => setFormData({ ...formData, program_id: e.target.value })}
            required
          >
            <option value="">Select Program</option>
            {programs.map((program) => (
              <option key={program.id} value={program.id}>
                {program.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Enroll
        </button>
      </form>
    </div>
  );
};

export default EnrollClient;