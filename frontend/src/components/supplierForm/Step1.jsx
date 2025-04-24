import React from "react";
import { useNavigate } from "react-router-dom";

const Step1 = ({ nextStep, handleChange, values }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/suppliers");
  };

  return (
    <div className="suppliers p-6">
      <h3 className="text-lg font-semibold mb-4">Supplier Basic Information</h3>
      <form className="supplierForm grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Supplier Name
          </label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            id="name"
            name="name"
            placeholder="e.g. MediSupply Co."
            onChange={handleChange}
            value={values.name}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            id="email"
            name="email"
            placeholder="e.g. contact@medisupply.com"
            onChange={handleChange}
            value={values.email}
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            id="phone"
            name="phone"
            placeholder="e.g. +254 712 345 678"
            onChange={handleChange}
            value={values.phone}
          />
        </div>
        <div>
          <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700">
            License Number
          </label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            id="licenseNumber"
            name="licenseNumber"
            placeholder="e.g. LIC-12345"
            onChange={handleChange}
            value={values.licenseNumber}
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            id="bio"
            name="bio"
            rows="3"
            placeholder="Brief description of the supplier"
            onChange={handleChange}
            value={values.bio}
          ></textarea>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            id="status"
            name="status"
            onChange={handleChange}
            checked={values.status || false}
          />
          <label htmlFor="status" className="ml-2 text-sm text-gray-700">
            Active
          </label>
        </div>
        <div className="md:col-span-2 flex justify-between mt-4">
          <button
            type="button"
            onClick={handleBackClick}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Back
          </button>
          <button
            type="button"
            onClick={nextStep}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step1;