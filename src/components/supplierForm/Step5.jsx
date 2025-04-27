import React from "react";

const Step5 = ({ nextStep, prevStep, handleChange, values }) => {
  return (
    <div className="suppliers p-6">
      <h3 className="text-lg font-semibold mb-4">Delivery Schedule</h3>
      <form className="supplierForm grid grid-cols-1 gap-4">
        <div>
          <label htmlFor="deliveryFrequency" className="block text-sm font-medium text-gray-700">
            Delivery Frequency
          </label>
          <select
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            id="deliveryFrequency"
            name="deliveryFrequency"
            onChange={handleChange}
            value={values.deliveryFrequency}
          >
            <option value="">Select frequency</option>
            <option value="weekly">Weekly</option>
            <option value="biweekly">Biweekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
          </select>
        </div>
        <div>
          <label htmlFor="nextDeliveryDate" className="block text-sm font-medium text-gray-700">
            Next Delivery Date
          </label>
          <input
            type="date"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            id="nextDeliveryDate"
            name="nextDeliveryDate"
            onChange={handleChange}
            value={values.nextDeliveryDate}
          />
        </div>
        <div>
          <label htmlFor="deliveryNotes" className="block text-sm font-medium text-gray-700">
            Delivery Notes
          </label>
          <textarea
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            id="deliveryNotes"
            name="deliveryNotes"
            rows="3"
            placeholder="e.g. Deliver to main hospital warehouse"
            onChange={handleChange}
            value={values.deliveryNotes}
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

export default Step5;