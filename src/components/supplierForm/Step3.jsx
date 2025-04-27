import React from "react";

const Step3 = ({ nextStep, prevStep, handleChange, values }) => {
  return (
    <div className="suppliers p-6">
      <h3 className="text-lg font-semibold mb-4">Supplier Address</h3>
      <form className="supplierForm grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            id="address"
            name="address"
            placeholder="e.g. 123 Medical Lane"
            onChange={handleChange}
            value={values.address}
          />
        </div>
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            id="country"
            name="country"
            placeholder="e.g. Kenya"
            onChange={handleChange}
            value={values.country}
          />
        </div>
        <div>
          <label htmlFor="county" className="block text-sm font-medium text-gray-700">
            County
          </label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            id="county"
            name="county"
            placeholder="e.g. Nairobi"
            onChange={handleChange}
            value={values.county}
          />
        </div>
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            id="city"
            name="city"
            placeholder="e.g. Nairobi"
            onChange={handleChange}
            value={values.city}
          />
        </div>
        <div>
          <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
            Postal Code
          </label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            id="postalCode"
            name="postalCode"
            placeholder="e.g. 00100"
            onChange={handleChange}
            value={values.postalCode}
          />
        </div>
        <div className="md:col-span-2 flex justify-between mt-4">
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

export default Step3;