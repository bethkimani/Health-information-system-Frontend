import React, { useState, useEffect } from 'react';
import { fetchTeamMembers, addTeamMember, updateTeamMember, deleteTeamMember } from '../api';

export default function Team() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [newMember, setNewMember] = useState({
    id: '',
    name: '',
    email: '',
    phone_number: '',
    role: '',
  });

  useEffect(() => {
    const loadTeamMembers = async () => {
      try {
        const response = await fetchTeamMembers();
        setTeamMembers(response.data);
      } catch (error) {
        console.error('Error fetching team members:', error);
      } finally {
        setLoading(false);
      }
    };
    loadTeamMembers();
  }, []);

  const handleSaveMember = async (e) => {
    e.preventDefault();
    try {
      if (editingMember) {
        await updateTeamMember(editingMember.id, newMember);
      } else {
        await addTeamMember(newMember);
      }
      const response = await fetchTeamMembers();
      setTeamMembers(response.data);
      setShowModal(false);
      setEditingMember(null);
      setNewMember({ id: '', name: '', email: '', phone_number: '', role: '' });
    } catch (error) {
      console.error('Error saving team member:', error);
    }
  };

  const handleEditMember = (member) => {
    setEditingMember(member);
    setNewMember({ ...member });
    setShowModal(true);
  };

  const handleDeleteMember = async (id) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      try {
        await deleteTeamMember(id);
        const response = await fetchTeamMembers();
        setTeamMembers(response.data);
      } catch (error) {
        console.error('Error deleting team member:', error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Team Members</h1>
        <button
          onClick={() => {
            setEditingMember(null);
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Team Member
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4">ID</th>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Email</th>
              <th className="text-left p-4">Phone</th>
              <th className="text-left p-4">Role</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teamMembers.map((member) => (
              <tr key={member.id} className="border-t">
                <td className="p-4">{member.id}</td>
                <td className="p-4">{member.name}</td>
                <td className="p-4">{member.email}</td>
                <td className="p-4">{member.phone_number}</td>
                <td className="p-4">{member.role}</td>
                <td className="p-4">
                  <button
                    onClick={() => handleEditMember(member)}
                    className="text-blue-600 hover:text-blue-800 mr-2"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    onClick={() => handleDeleteMember(member.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {editingMember ? 'Edit Team Member' : 'Add New Team Member'}
            </h2>
            <form onSubmit={handleSaveMember}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">ID</label>
                <input
                  type="text"
                  value={newMember.id}
                  onChange={(e) => setNewMember({ ...newMember, id: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={newMember.email}
                  onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <input
                  type="text"
                  value={newMember.phone_number}
                  onChange={(e) => setNewMember({ ...newMember, phone_number: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Role</label>
                <select
                  value={newMember.role}
                  onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select Role</option>
                  <option value="Administrator">Administrator</option>
                  <option value="Staff">Staff</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="mr-2 px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {editingMember ? 'Update Member' : 'Add Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}