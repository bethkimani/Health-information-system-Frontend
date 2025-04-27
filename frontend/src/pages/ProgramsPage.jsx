import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPrograms, addProgram, deleteProgram } from '../api.js';

function ProgramsPage() {
  const [programs, setPrograms] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState(''); // Added to handle errors

  useEffect(() => {
    fetchPrograms()
      .then((response) => {
        setPrograms(response.data);
        setFilteredPrograms(response.data);
      })
      .catch((error) => {
        console.error('Error fetching programs:', error);
        setError('Failed to load programs. Please try again.');
      });
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredPrograms(
      programs.filter((program) =>
        program.name.toLowerCase().includes(value)
      )
    );
  };

  const handleDelete = async () => {
    if (!selectedId) return;
    try {
      await deleteProgram(selectedId);
      setPrograms(programs.filter((program) => program.id !== selectedId));
      setFilteredPrograms(filteredPrograms.filter((program) => program.id !== selectedId));
      setShowConfirm(false);
      setSelectedId(null);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error deleting program:', error);
      setError('Failed to delete program. Please try again.');
    }
  };

  return (
    <div className={showConfirm ? "p-6 bg-white shadow-md rounded-lg opacity-50" : "p-6 bg-white shadow-md rounded-lg"}>
      <h1 className="text-2xl font-bold text-blue-900 mb-4">HEALTH PROGRAMS</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="mb-4 flex justify-between items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by Program Name"
            value={searchTerm}
            onChange={handleSearch}
            className="border border-blue-300 rounded-md p-2 pl-10 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <button className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800">
          <Link to={`/add-program`}>+ Add Program</Link>
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-blue-900">
            <th className="border border-gray-200 px-4 py-2">PROGRAM ID</th>
            <th className="border border-gray-200 px-4 py-2">PROGRAM NAME</th>
            <th className="border border-gray-200 px-4 py-2">DESCRIPTION</th>
            <th className="border border-gray-200 px-4 py-2">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {filteredPrograms.length > 0 ? (
            filteredPrograms.map((program) => (
              <tr key={program.id} className="text-center">
                <td className="border border-gray-200 px-4 py-2">{program.id}</td>
                <td className="border border-gray-200 px-4 py-2">{program.name}</td>
                <td className="border border-gray-200 px-4 py-2">{program.description}</td>
                <td className="border border-gray-200 px-4 py-2 flex justify-center space-x-4">
                  <Link
                    to={`/view-program/${program.id}`}
                    className="text-blue-900 hover:text-blue-700 font-semibold"
                  >
                    View Program
                  </Link>
                  <Link
                    to={`/edit-program/${program.id}`}
                    className="text-blue-900 hover:text-blue-700 font-semibold"
                  >
                    Edit Program
                  </Link>
                  <button
                    className="text-red-600 hover:text-red-800 font-semibold"
                    onClick={() => {
                      setSelectedId(program.id);
                      setShowConfirm(true);
                    }}
                  >
                    Delete Program
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="border border-gray-200 px-4 py-2 text-center text-gray-500">
                No programs found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <h2 className="text-lg font-bold text-blue-900">Delete Program</h2>
            <p className="text-gray-600">Are you sure you want to delete this program? This action cannot be undone.</p>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-lg text-center">
            <h2 className="text-lg font-bold text-blue-900">Success</h2>
            <p className="text-green-600 font-semibold mt-2">✅ Program deleted successfully!</p>
            <button
              className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 mt-4"
              onClick={() => setShowSuccess(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProgramsPage;