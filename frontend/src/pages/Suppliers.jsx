import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";

// Mock data for simulation
const mockSuppliers = [
  {
    id: 1,
    name: "MediSupply Co.",
    email: "contact@medisupply.com",
    phone: "+254 712 345 678",
    status: true,
  },
  {
    id: 2,
    name: "LabEquip Ltd.",
    email: "info@labeuip.com",
    phone: "+254 723 456 789",
    status: false,
  },
];

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, supplierName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Delete Supplier</h3>
        <p>Are you sure you want to delete <strong>{supplierName}</strong>?</p>
        <div className="flex justify-end gap-2 mt-4">
          <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400" onClick={onClose}>
            Cancel
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const Suppliers = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    // Simulate fetching suppliers
    setSuppliers(mockSuppliers);
  }, []);

  const navigate = useNavigate();

  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleTabChange = (status) => setStatusFilter(status);
  const handleDropdownToggle = (index) => setDropdownOpen(dropdownOpen === index ? null : index);

  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter === "all" || String(supplier.status) === statusFilter)
  );

  const handleDeleteSupplier = (supplier) => {
    setSelectedSupplier(supplier);
    setModalOpen(true);
  };

  const toggleSupplierStatus = (supplier) => {
    // Simulate toggling supplier status
    const updatedSuppliers = suppliers.map((s) =>
      s.id === supplier.id ? { ...s, status: !s.status } : s
    );
    setSuppliers(updatedSuppliers);
  };

  const confirmDelete = () => {
    if (selectedSupplier) {
      // Simulate deleting supplier
      const updatedSuppliers = suppliers.filter((s) => s.id !== selectedSupplier.id);
      setSuppliers(updatedSuppliers);
      setModalOpen(false);
      setSelectedSupplier(null);
      alert("Supplier deleted successfully");
    }
  };

  return (
    
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold text-gray-800">Suppliers</h3>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search suppliers..."
              className="border border-gray-300 rounded-md p-2"
              value={search}
              onChange={handleSearchChange}
            />
            <div className="flex gap-2">
              <button
                className={`px-4 py-2 rounded-md ${
                  statusFilter === "all" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => handleTabChange("all")}
              >
                All
              </button>
              <button
                className={`px-4 py-2 rounded-md ${
                  statusFilter === "true" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => handleTabChange("true")}
              >
                Active
              </button>
              <button
                className={`px-4 py-2 rounded-md ${
                  statusFilter === "false" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => handleTabChange("false")}
              >
                Inactive
              </button>
            </div>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={() => navigate("/suppliers/create-supplier")}
            >
              + Add Supplier
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left text-gray-600">
                <th className="p-4">#</th>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.length > 0 ? (
                filteredSuppliers.map((supplier, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4">{supplier.name}</td>
                    <td className="p-4">{supplier.email}</td>
                    <td className="p-4">{supplier.phone}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          supplier.status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {supplier.status ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="p-4 flex gap-2">
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => navigate(`/suppliers/${supplier.id}`)}
                      >
                        View
                      </button>
                      <div className="relative">
                        <button
                          className="text-gray-600 hover:text-gray-800"
                          onClick={() => handleDropdownToggle(index)}
                        >
                          ⋮
                        </button>
                        {dropdownOpen === index && (
                          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                            <button
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => navigate(`/suppliers/edit/${supplier.id}`)}
                            >
                              Edit Supplier
                            </button>
                            <button
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => handleDeleteSupplier(supplier)}
                            >
                              Delete Supplier
                            </button>
                            <button
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => toggleSupplierStatus(supplier)}
                            >
                              {supplier.status ? "Deactivate Supplier" : "Activate Supplier"}
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-600">
                    No suppliers available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <DeleteConfirmationModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onConfirm={confirmDelete}
          supplierName={selectedSupplier?.name}
        />
      </div>
    
  );
};

export default Suppliers;