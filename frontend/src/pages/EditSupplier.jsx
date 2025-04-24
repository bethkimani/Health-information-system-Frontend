import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";

// Mock data for simulation
const mockSuppliers = [
  {
    id: 1,
    name: "MediSupply Co.",
    email: "contact@medisupply.com",
    phone: "+254 712 345 678",
    bio: "Leading supplier of pharmaceuticals",
    licenseNumber: "LIC-12345",
    address: "123 Medical Lane",
    city: "Nairobi",
    country: "Kenya",
    county: "Nairobi",
    postalCode: "00100",
    contactPersonName: "John Doe",
    contactPersonEmail: "john.doe@medisupply.com",
    contactPersonPhone: "+254 712 345 678",
    status: true,
    contractStartDate: "2025-01-01",
    contractEndDate: "2026-01-01",
    supplyCategory: "pharmaceuticals",
    certifications: "ISO 9001, WHO Certification",
    deliveryFrequency: "monthly",
    nextDeliveryDate: "2025-05-01",
    deliveryNotes: "Deliver to main hospital warehouse",
  },
];

const EditSupplier = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    licenseNumber: "",
    address: "",
    city: "",
    country: "",
    county: "",
    postalCode: "",
    contactPersonName: "",
    contactPersonEmail: "",
    contactPersonPhone: "",
    status: false,
    contractStartDate: "",
    contractEndDate: "",
    supplyCategory: "",
    certifications: "",
    deliveryFrequency: "",
    nextDeliveryDate: "",
    deliveryNotes: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching supplier details
    const supplier = mockSuppliers.find((s) => s.id === parseInt(id));
    if (supplier) {
      setFormData(supplier);
      setLoading(false);
    } else {
      setError("Supplier not found");
      setLoading(false);
    }
  }, [id]);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate updating supplier data
    console.log("Updated Supplier Data:", formData);
    alert("Supplier updated successfully!");
    navigate("/suppliers");
  };

  if (loading) return <p className="p-6 text-gray-600">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <Navigation>
      <div className="editSupplier p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Edit Supplier: {formData.name}
        </h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-lg shadow-md">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Supplier Name</label>
            <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2" id="name" value={formData.name} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" className="mt-1 block w-full border border-gray-300 rounded-md p-2" id="email" value={formData.email} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2" id="phone" value={formData.phone} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700">License Number</label>
            <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2" id="licenseNumber" value={formData.licenseNumber} onChange={handleChange} />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea className="mt-1 block w-full border border-gray-300 rounded-md p-2" id="bio" rows="3" value={formData.bio} onChange={handleChange}></textarea>
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2" id="address" value={formData.address} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
            <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2" id="city" value={formData.city} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
            <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2" id="country" value={formData.country} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="county" className="block text-sm font-medium text-gray-700">County</label>
            <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2" id="county" value={formData.county} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Postal Code</label>
            <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2" id="postalCode" value={formData.postalCode} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="contactPersonName" className="block text-sm font-medium text-gray-700">Contact Person Name</label>
            <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2" id="contactPersonName" value={formData.contactPersonName} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="contactPersonEmail" className="block text-sm font-medium text-gray-700">Contact Person Email</label>
            <input type="email" className="mt-1 block w-full border border-gray-300 rounded-md p-2" id="contactPersonEmail" value={formData.contactPersonEmail} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="contactPersonPhone" className="block text-sm font-medium text-gray-700">Contact Person Phone</label>
            <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2" id="contactPersonPhone" value={formData.contactPersonPhone} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="contractStartDate" className="block text-sm font-medium text-gray-700">Contract Start Date</label>
            <input type="date" className="mt-1 block w-full border border-gray-300 rounded-md p-2" id="contractStartDate" value={formData.contractStartDate} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="contractEndDate" className="block text-sm font-medium text-gray-700">Contract End Date</label>
            <input type="date" className="mt-1 block w-full border border-gray-300 rounded-md p-2" id="contractEndDate" value={formData.contractEndDate} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="supplyCategory" className="block text-sm font-medium text-gray-700">Supply Category</label>
            <select className="mt-1 block w-full border border-gray-300 rounded-md p-2" id="supplyCategory" value={formData.supplyCategory} onChange={handleChange}>
              <option value="">Select a category</option>
              <option value="pharmaceuticals">Pharmaceuticals</option>
              <option value="lab_equipment">Lab Equipment</option>
              <option value="medical_devices">Medical Devices</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="certifications" className="block text-sm font-medium text-gray-700">Certifications</label>
            <textarea className="mt-1 block w-full border border-gray-300 rounded-md p-2" id="certifications" rows="3" value={formData.certifications} onChange={handleChange}></textarea>
          </div>
          <div>
            <label htmlFor="deliveryFrequency" className="block text-sm font-medium text-gray-700">Delivery Frequency</label>
            <select className="mt-1 block w-full border border-gray-300 rounded-md p-2" id="deliveryFrequency" value={formData.deliveryFrequency} onChange={handleChange}>
              <option value="">Select frequency</option>
              <option value="weekly">Weekly</option>
              <option value="biweekly">Biweekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
            </select>
          </div>
          <div>
            <label htmlFor="nextDeliveryDate" className="block text-sm font-medium text-gray-700">Next Delivery Date</label>
            <input type="date" className="mt-1 block w-full border border-gray-300 rounded-md p-2" id="nextDeliveryDate" value={formData.nextDeliveryDate} onChange={handleChange} />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="deliveryNotes" className="block text-sm font-medium text-gray-700">Delivery Notes</label>
            <textarea className="mt-1 block w-full border border-gray-300 rounded-md p-2" id="deliveryNotes" rows="3" value={formData.deliveryNotes} onChange={handleChange}></textarea>
          </div>
          <div className="flex items-center">
            <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" id="status" checked={formData.status} onChange={handleChange} />
            <label htmlFor="status" className="ml-2 text-sm text-gray-700">Active</label>
          </div>
          <div className="md:col-span-2 flex justify-between mt-4">
            <button type="button" onClick={() => navigate("/suppliers")} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Update Supplier
            </button>
          </div>
        </form>
      </div>
    </Navigation>
  );
};

export default EditSupplier;