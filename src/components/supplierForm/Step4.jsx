import React from "react";

const Step4 = ({ nextStep, prevStep, handleChange, values }) => {
  return (
    <div className="suppliers p-6">
      <h3 className="text-lg font-semibold mb-4">Supplier Contract Details</h3>
      <form className="supplierForm grid grid-cols-1 gap-4">
        <div>
          <label htmlFor="contractStartDate" className="block text-sm font-medium text-gray-700">
            Contract Start Date
          </label>
          <input
            type="date"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            id="contractStartDate"
            name="contractStartDate"
            onChange={handleChange}
            value={values.contractStartDate}
          />
        </div>
        <div>
          <label htmlFor="contractEndDate" className="block text-sm font-medium text-gray-700">
            Contract End Date
          </label>
          <input
            type="date"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            id="contractEndDate"
            name="contractEndDate"
            onChange={handleChange}
            value={values.contractEndDate}
          />
        </div>
        <div>
          <label htmlFor="supplyCategory" className="block text-sm font-medium text-gray-700">
            Supply Category
          </label>
          <select
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            id="supplyCategory"
            name="supplyCategory"
            onChange={handleChange}
            value={values.supplyCategory}
          >
            <option value="">Select a category</option>
            <option value="pharmaceuticals">Pharmaceuticals</option>
            <option value="lab_equipment">Lab Equipment</option>
            <option value="medical_devices">Medical Devices</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="certifications" className="block text-sm font-medium text-gray-700">
            Certifications
          </label>
          <textarea
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            id="certifications"
            name="certifications"
            rows="3"
            placeholder="e.g. ISO 9001, WHO Certification"
            onChange={handleChange}
            value={values.certifications}
          ></textarea>
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

export default Step4;