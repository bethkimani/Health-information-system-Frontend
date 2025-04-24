import React from "react";

const Step2 = ({ nextStep, prevStep, handleChange, values }) => {
  return (
    <div className="suppliers p-6">
      <h3 className="text-lg font-semibold mb-4 text-center">Contact Person Details</h3>
      <form className="supplierForm grid grid-cols-1 gap-4 max-w-lg mx-auto">
        <div>
          <label htmlFor="contactPersonName" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            id="contactPersonName"
            name="contactPersonName"
            placeholder="e.g. John Doe"
            onChange={handleChange}
            value={values.contactPersonName}
          />
        </div>
        <div>
          <label htmlFor="contactPersonEmail" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            id="contactPersonEmail"
            name="contactPersonEmail"
            placeholder="e.g. john.doe@medisupply.com"
            onChange={handleChange}
            value={values.contactPersonEmail}
          />
        </div>
        <div>
          <label htmlFor="contactPersonPhone" className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            id="contactPersonPhone"
            name="contactPersonPhone"
            placeholder="e.g. +254 712 345 678"
            onChange={handleChange}
            value={values.contactPersonPhone}
          />
        </div>
        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={prevStep}
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

export default Step2;