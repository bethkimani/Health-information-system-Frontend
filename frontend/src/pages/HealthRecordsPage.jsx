import React, { useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';

// Dummy data for health records
const initialRecords = [
  { id: "R001", client_id: "C001", client_name: "Jane Doe", program: "TB Treatment", date: "2025-04-20", status: "Active", notes: "Patient responding well to treatment" },
  { id: "R002", client_id: "C002", client_name: "John Smith", program: "Malaria Prevention", date: "2025-04-21", status: "Completed", notes: "Patient completed program" },
  { id: "R003", client_id: "C003", client_name: "Emily Brown", program: "HIV Care", date: "2025-04-22", status: "Active", notes: "Ongoing monitoring" },
];

const HealthRecordsPage = () => {
  const [records, setRecords] = useState(initialRecords);
  const [filteredRecords, setFilteredRecords] = useState(initialRecords);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [notification, setNotification] = useState('');

  const programs = ["TB Treatment", "Malaria Prevention", "HIV Care"];
  const statuses = ["Active", "Completed"];

  const handleFilter = () => {
    let filtered = records.filter(
      (record) =>
        record.client_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.program.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (selectedProgram) {
      filtered = filtered.filter((record) => record.program === selectedProgram);
    }

    if (selectedStatus) {
      filtered = filtered.filter((record) => record.status === selectedStatus);
    }

    setFilteredRecords(filtered);
  };

  const markAsCompleted = (recordId) => {
    const updatedRecords = records.map((record) =>
      record.id === recordId ? { ...record, status: 'Completed' } : record
    );
    setRecords(updatedRecords);
    setFilteredRecords(updatedRecords);
    setNotification('Health record marked as completed');
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-900 mb-4">HEALTH RECORDS</h1>

      {notification && (
        <div className="bg-green-100 text-green-800 p-2 rounded mb-4">{notification}</div>
      )}

      <div className="mb-4 flex justify-between">
        <input
          type="text"
          placeholder="Search by Client Name or Program"
          className="border border-blue-300 rounded-md p-2 focus:ring-blue-500 focus:outline-none w-full max-w-sm"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            handleFilter();
          }}
        />
        <button
          className="bg-blue-900 text-white px-4 py-2 rounded flex items-center"
          onClick={() => setShowFilter(!showFilter)}
        >
          {showFilter ? <IoClose size={20} /> : <FiFilter size={20} />} Filter
        </button>
      </div>

      {showFilter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-end">
          <div className="bg-white p-6 shadow-lg relative overflow-y-auto w-1/4 h-full">
            <h2 className="text-2xl font-semibold mb-4 flex justify-between items-center text-blue-900">
              Filter
              <button className="text-xl text-blue-900" onClick={() => setShowFilter(false)}>
                <IoClose />
              </button>
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block mb-2 font-semibold text-blue-900">Program</label>
                <select
                  className="w-full p-2 border border-blue-300 rounded focus:ring-blue-500 focus:outline-none"
                  value={selectedProgram}
                  onChange={(e) => setSelectedProgram(e.target.value)}
                >
                  <option value="">All Programs</option>
                  {programs.map((program) => (
                    <option key={program} value={program}>{program}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-2 font-semibold text-blue-900">Status</label>
                <select
                  className="w-full p-2 border border-blue-300 rounded focus:ring-blue-500 focus:outline-none"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="">All Statuses</option>
                  {statuses.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>
            <button
              className="mt-4 bg-blue-900 text-white px-4 py-2 rounded w-full hover:bg-blue-800 transition"
              onClick={() => {
                handleFilter();
                setShowFilter(false);
              }}
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      <table className="w-full text-left border-collapse mb-4">
        <thead>
          <tr className="bg-gray-100 text-blue-900">
            <th className="border-b p-2">CLIENT ID</th>
            <th className="border-b p-2">CLIENT NAME</th>
            <th className="border-b p-2">PROGRAM</th>
            <th className="border-b p-2">DATE</th>
            <th className="border-b p-2">STATUS</th>
            <th className="border-b p-2">NOTES</th>
            <th className="border-b p-2">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.map((record) => (
            <tr key={record.id}>
              <td className="border-b p-2">{record.client_id}</td>
              <td className="border-b p-2">{record.client_name}</td>
              <td className="border-b p-2">{record.program}</td>
              <td className="border-b p-2">{record.date}</td>
              <td className="border-b p-2">{record.status}</td>
              <td className="border-b p-2">{record.notes}</td>
              <td className="border-b p-2">
                {record.status !== "Completed" && (
                  <button
                    className="bg-blue-900 text-white px-4 py-2 rounded"
                    onClick={() => markAsCompleted(record.id)}
                  >
                    Mark as Completed
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HealthRecordsPage;