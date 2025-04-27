import React, { useState, useEffect } from 'react';
import { fetchSuppliers, addSupplier, updateSupplier, deleteSupplier } from '../api';

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [newSupplier, setNewSupplier] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    license_number: '',
    address: '',
    city: '',
    country: '',
    county: '',
    postal_code: '',
    contact_person_name: '',
    contact_person_email: '',
    contact_person_phone: '',
    status: true,
    contract_start_date: '',
    contract_end_date: '',
    supply_category: '',
    certifications: '',
    delivery_frequency: '',
    next_delivery_date: '',
    delivery_notes: '',
  });

  useEffect(() => {
    const loadSuppliers = async () => {
      try {
        const response = await fetchSuppliers();
        setSuppliers(response.data);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      } finally {
        setLoading(false);
      }
    };
    loadSuppliers();
  }, []);

  const handleAddSupplier = async (e) => {
    e.preventDefault();
    try {
      if (editingSupplier) {
        await updateSupplier(editingSupplier.id, newSupplier);
      } else {
        await addSupplier(newSupplier);
      }
      const response = await fetchSuppliers();
      setSuppliers(response.data);
      setShowModal(false);
      setEditingSupplier(null);
      setNewSupplier({
        name: '',
        email: '',
        phone: '',
        bio: '',
        license_number: '',
        address: '',
        city: '',
        country: '',
        county: '',
        postal_code: '',
        contact_person_name: '',
        contact_person_email: '',
        contact_person_phone: '',
        status: true,
        contract_start_date: '',
        contract_end_date: '',
        supply_category: '',
        certifications: '',
        delivery_frequency: '',
        next_delivery_date: '',
        delivery_notes: '',
      });
    } catch (error) {
      console.error('Error saving supplier:', error);
    }
  };

  const handleEditSupplier = (supplier) => {
    setEditingSupplier(supplier);
    setNewSupplier({ ...supplier });
    setShowModal(true);
  };

  const handleDeleteSupplier = async (id) => {
    if (window.confirm('Are you sure you want to delete this supplier?')) {
      try {
        await deleteSupplier(id);
        const response = await fetchSuppliers();
        setSuppliers(response.data);
      } catch (error) {
        console.error('Error deleting supplier:', error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Suppliers</h1>
        <button
          onClick={() => {
            setEditingSupplier(null);
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Supplier
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
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier.id} className="border-t">
                <td className="p-4">{supplier.id}</td>
                <td className="p-4">{supplier.name}</td>
                <td className="p-4">{supplier.email}</td>
                <td className="p-4">{supplier.phone}</td>
                <td className="p-4">{supplier.status ? 'Active' : 'Inactive'}</td>
                <td className="p-4">
                  <button
                    onClick={() => handleEditSupplier(supplier)}
                    className="text-blue-600 hover:text-blue-800 mr-2"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    onClick={() => handleDeleteSupplier(supplier.id)}
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
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl overflow-y-auto max-h-[80vh]">
            <h2 className="text-xl font-semibold mb-4">
              {editingSupplier ? 'Edit Supplier' : 'Add New Supplier'}
            </h2>
            <form onSubmit={handleAddSupplier}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    value={newSupplier.name}
                    onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={newSupplier.email}
                    onChange={(e) => setNewSupplier({ ...newSupplier, email: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input
                    type="text"
                    value={newSupplier.phone}
                    onChange={(e) => setNewSupplier({ ...newSupplier, phone: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Bio</label>
                  <textarea
                    value={newSupplier.bio || ''}
                    onChange={(e) => setNewSupplier({ ...newSupplier, bio: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">License Number</label>
                  <input
                    type="text"
                    value={newSupplier.license_number || ''}
                    onChange={(e) => setNewSupplier({ ...newSupplier, license_number: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Address</label>
                  <input
                    type="text"
                    value={newSupplier.address || ''}
                    onChange={(e) => setNewSupplier({ ...newSupplier, address: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">City</label>
                  <input
                    type="text"
                    value={newSupplier.city || ''}
                    onChange={(e) => setNewSupplier({ ...newSupplier, city: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Country</label>
                  <input
                    type="text"
                    value={newSupplier.country || ''}
                    onChange={(e) => setNewSupplier({ ...newSupplier, country: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">County</label>
                  <input
                    type="text"
                    value={newSupplier.county || ''}
                    onChange={(e) => setNewSupplier({ ...newSupplier, county: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Postal Code</label>
                  <input
                    type="text"
                    value={newSupplier.postal_code || ''}
                    onChange={(e) => setNewSupplier({ ...newSupplier, postal_code: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Contact Person Name</label>
                  <input
                    type="text"
                    value={newSupplier.contact_person_name || ''}
                    onChange={(e) => setNewSupplier({ ...newSupplier, contact_person_name: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Contact Person Email</label>
                  <input
                    type="email"
                    value={newSupplier.contact_person_email || ''}
                    onChange={(e) => setNewSupplier({ ...newSupplier, contact_person_email: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Contact Person Phone</label>
                  <input
                    type="text"
                    value={newSupplier.contact_person_phone || ''}
                    onChange={(e) => setNewSupplier({ ...newSupplier, contact_person_phone: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select
                    value={newSupplier.status}
                    onChange={(e) => setNewSupplier({ ...newSupplier, status: e.target.value === 'true' })}
                    className="w-full p-2 border rounded"
                  >
                    <option value={true}>Active</option>
                    <option value={false}>Inactive</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Contract Start Date</label>
                  <input
                    type="date"
                    value={newSupplier.contract_start_date || ''}
                    onChange={(e) => setNewSupplier({ ...newSupplier, contract_start_date: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Contract End Date</label>
                  <input
                    type="date"
                    value={newSupplier.contract_end_date || ''}
                    onChange={(e) => setNewSupplier({ ...newSupplier, contract_end_date: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Supply Category</label>
                  <input
                    type="text"
                    value={newSupplier.supply_category || ''}
                    onChange={(e) => setNewSupplier({ ...newSupplier, supply_category: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Certifications</label>
                  <textarea
                    value={newSupplier.certifications || ''}
                    onChange={(e) => setNewSupplier({ ...newSupplier, certifications: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Delivery Frequency</label>
                  <input
                    type="text"
                    value={newSupplier.delivery_frequency || ''}
                    onChange={(e) => setNewSupplier({ ...newSupplier, delivery_frequency: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Next Delivery Date</label>
                  <input
                    type="date"
                    value={newSupplier.next_delivery_date || ''}
                    onChange={(e) => setNewSupplier({ ...newSupplier, next_delivery_date: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Delivery Notes</label>
                  <textarea
                    value={newSupplier.delivery_notes || ''}
                    onChange={(e) => setNewSupplier({ ...newSupplier, delivery_notes: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4">
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
                  {editingSupplier ? 'Update Supplier' : 'Add Supplier'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}