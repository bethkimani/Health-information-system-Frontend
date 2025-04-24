import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

// Dummy data for team members and roles
const dummyTeamMembers = [
  { id: "T001", name: "Dr. John Smith", email: "john.smith@hospital.com", phone_number: "123-456-7890", role: "Doctor" },
  { id: "T002", name: "Nurse Emily Brown", email: "emily.brown@hospital.com", phone_number: "234-567-8901", role: "Nurse" },
  { id: "T003", name: "Admin Sarah Davis", email: "sarah.davis@hospital.com", phone_number: "345-678-9012", role: "Administrator" },
  { id: "T004", name: "Dr. Michael Lee", email: "michael.lee@hospital.com", phone_number: "456-789-0123", role: "Doctor" },
];

const dummyRoles = [
  { id: "R001", name: "Doctor" },
  { id: "R002", name: "Nurse" },
  { id: "R003", name: "Administrator" },
  { id: "R004", name: "Lab Technician" },
];

const Team = () => {
  const [teamMembers, setTeamMembers] = useState(dummyTeamMembers);
  const [roles, setRoles] = useState(dummyRoles);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    password: "",
    role_id: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  // Handle input changes in forms
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add a new team member
  const handleAddUser = (e) => {
    e.preventDefault();
    const newMember = {
      id: `T${Math.floor(Math.random() * 10000)}`,
      name: formData.name,
      email: formData.email,
      phone_number: formData.phone_number,
      role: roles.find((role) => role.id === formData.role_id)?.name || "No Role Assigned",
    };
    setTeamMembers([...teamMembers, newMember]);
    setFormData({ name: "", email: "", phone_number: "", password: "", role_id: "" });
    setShowAddModal(false);
  };

  // Edit an existing team member
  const handleEdit = (member) => {
    setSelectedMember(member);
    setShowUpdateModal(true);
    setFormData({
      name: member.name,
      email: member.email,
      phone_number: member.phone_number,
      password: "",
      role_id: roles.find((role) => role.name === member.role)?.id || "",
    });
  };

  // Update a team member
  const handleUpdateUser = (e) => {
    e.preventDefault();
    const updatedMember = {
      ...selectedMember,
      name: formData.name,
      email: formData.email,
      phone_number: formData.phone_number,
      role: roles.find((role) => role.id === formData.role_id)?.name || "No Role Assigned",
    };
    setTeamMembers(teamMembers.map((member) => (member.id === selectedMember.id ? updatedMember : member)));
    setShowUpdateModal(false);
  };

  // Show delete confirmation modal
  const handleDeleteConfirmation = (member) => {
    setSelectedMember(member);
    setShowDeleteModal(true);
  };

  // Delete a team member
  const handleDelete = () => {
    setTeamMembers(teamMembers.filter((member) => member.id !== selectedMember.id));
    setShowDeleteModal(false);
  };

  // Filter team members based on search term
  const filteredTeamMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-blue-900">Team Management</h2>
          <button
            className="bg-blue-900 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-800 transition"
            onClick={() => setShowAddModal(true)}
          >
            Add Team Member +
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            className="w-full max-w-md p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Team Members Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Email</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Phone</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Role</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTeamMembers.length > 0 ? (
                filteredTeamMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-gray-800">{member.name}</td>
                    <td className="px-6 py-4 text-gray-600">{member.email}</td>
                    <td className="px-6 py-4 text-gray-600">{member.phone_number}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                          member.role === "Doctor"
                            ? "bg-green-100 text-green-800"
                            : member.role === "Nurse"
                            ? "bg-blue-100 text-blue-800"
                            : member.role === "Administrator"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {member.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex gap-3">
                      <button
                        className="text-blue-600 hover:text-blue-800 transition"
                        onClick={() => handleEdit(member)}
                      >
                        <FaEdit size={18} />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800 transition"
                        onClick={() => handleDeleteConfirmation(member)}
                      >
                        <FaTrash size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    No team members found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Add Team Member Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-blue-900">Add New Team Member</h2>
                <button
                  className="text-gray-600 hover:text-gray-800"
                  onClick={() => setShowAddModal(false)}
                >
                  ×
                </button>
              </div>
              <form onSubmit={handleAddUser} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    name="phone_number"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter phone number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <select
                    name="role_id"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={formData.role_id}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Role</option>
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                    onClick={() => setShowAddModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Team Member Modal */}
        {showUpdateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-blue-900">Edit Team Member</h2>
                <button
                  className="text-gray-600 hover:text-gray-800"
                  onClick={() => setShowUpdateModal(false)}
                >
                  ×
                </button>
              </div>
              <form onSubmit={handleUpdateUser} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    name="phone_number"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <select
                    name="role_id"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={formData.role_id}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Role</option>
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                    onClick={() => setShowUpdateModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-blue-900">Delete Team Member</h2>
                <button
                  className="text-gray-600 hover:text-gray-800"
                  onClick={() => setShowDeleteModal(false)}
                >
                  ×
                </button>
              </div>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete <span className="font-semibold">{selectedMember?.name}</span> from the team?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Team;