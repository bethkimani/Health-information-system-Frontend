import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import { FaTrash, FaDownload } from "react-icons/fa";

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
    documents: [
      { filename: "Contract.pdf", type: "PDF", file_url: "http://example.com/contract.pdf" },
    ],
  },
];

const ViewSupplier = () => {
  const { id } = useParams();
  const [supplier, setSupplier] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching supplier data
    const data = mockSuppliers.find((s) => s.id === parseInt(id));
    setSupplier(data);
  }, [id]);

  const viewDocuments = () => {
    navigate(`/suppliers/${id}/documents`);
  };

  if (!supplier) return <p className="p-6 text-gray-600">Loading supplier details...</p>;

  return (
    <Navigation>
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Suppliers / {supplier.name}</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          {/* Supplier Profile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <img
                src="/images/supplier.jpg"
                alt="Supplier"
                className="w-32 h-32 rounded-full mb-4"
              />
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  supplier.status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                {supplier.status ? "Active" : "Inactive"}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-600 uppercase">Name</p>
              <p className="text-lg font-semibold">{supplier.name}</p>
              <p className="text-sm text-gray-600 uppercase mt-2">Email</p>
              <p>{supplier.email}</p>
              <p className="text-sm text-gray-600 uppercase mt-2">Phone</p>
              <p>{supplier.phone}</p>
              <p className="text-sm text-gray-600 uppercase mt-2">License Number</p>
              <p>{supplier.licenseNumber}</p>
              <p className="text-sm text-gray-600 uppercase mt-2">Description</p>
              <p>{supplier.bio}</p>
            </div>
          </div>

          {/* Address, Contact, Contract */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-lg font-semibold mb-2">Supplier Address</h4>
              <p><strong className="uppercase text-gray-600 text-sm">Address:</strong> {supplier.address}</p>
              <p><strong className="uppercase text-gray-600 text-sm">City:</strong> {supplier.city}</p>
              <p><strong className="uppercase text-gray-600 text-sm">County:</strong> {supplier.county}</p>
              <p><strong className="uppercase text-gray-600 text-sm">Country:</strong> {supplier.country}</p>
              <p><strong className="uppercase text-gray-600 text-sm">Postal Code:</strong> {supplier.postalCode}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-lg font-semibold mb-2">Contact Person</h4>
              <p><strong className="uppercase text-gray-600 text-sm">Name:</strong> {supplier.contactPersonName}</p>
              <p><strong className="uppercase text-gray-600 text-sm">Email:</strong> {supplier.contactPersonEmail}</p>
              <p><strong className="uppercase text-gray-600 text-sm">Phone:</strong> {supplier.contactPersonPhone}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-lg font-semibold mb-2">Contract Details</h4>
              <p><strong className="uppercase text-gray-600 text-sm">Start Date:</strong> {supplier.contractStartDate}</p>
              <p><strong className="uppercase text-gray-600 text-sm">End Date:</strong> {supplier.contractEndDate}</p>
              <p><strong className="uppercase text-gray-600 text-sm">Supply Category:</strong> {supplier.supplyCategory}</p>
              <p><strong className="uppercase text-gray-600 text-sm">Certifications:</strong> {supplier.certifications}</p>
            </div>
          </div>

          {/* Delivery Schedule */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h4 className="text-lg font-semibold mb-2">Delivery Schedule</h4>
            <p><strong className="uppercase text-gray-600 text-sm">Frequency:</strong> {supplier.deliveryFrequency}</p>
            <p><strong className="uppercase text-gray-600 text-sm">Next Delivery Date:</strong> {supplier.nextDeliveryDate}</p>
            <p><strong className="uppercase text-gray-600 text-sm">Notes:</strong> {supplier.deliveryNotes}</p>
          </div>

          {/* Documents */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-semibold">Supplier Documents</h4>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={viewDocuments}
              >
                + Add Document
              </button>
            </div>
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left text-gray-600">
                  <th className="p-2">Name</th>
                  <th className="p-2">Type</th>
                  <th className="p-2">URL</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {supplier.documents.map((doc, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-2">{doc.filename}</td>
                    <td className="p-2">{doc.type}</td>
                    <td className="p-2">{doc.file_url}</td>
                    <td className="p-2">
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                          <FaDownload /> Download
                        </button>
                        <button className="text-red-600 hover:text-red-800 flex items-center gap-1">
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Navigation>
  );
};

export default ViewSupplier;