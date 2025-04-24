import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * AddProgram component allows a doctor to create a new health program.
 * @returns {JSX.Element} The form to add a new health program.
 */
function AddProgram() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
  });

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission to add a new program
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.id || !formData.name || !formData.description) {
      alert('Please fill in all fields.');
      return;
    }

    // For now, store in localStorage (to simulate backend)
    const programs = JSON.parse(localStorage.getItem('programs')) || [];
    programs.push(formData);
    localStorage.setItem('programs', JSON.stringify(programs));

    alert('Program added successfully!');
    navigate('/programs');
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="container mx-auto max-w-lg">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">Add New Health Program</h2>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Program ID</label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="e.g., P004"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Program Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="e.g., Diabetes Care"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter program description"
              rows="4"
              required
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate('/programs')}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
            >
              Add Program
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProgram;