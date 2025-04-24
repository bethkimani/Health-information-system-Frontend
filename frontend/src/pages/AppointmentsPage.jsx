import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiFilter } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';

// Dummy data for appointments
const initialAppointments = [
  { id: "A001", client_id: "C001", client_name: "Jane Doe", program: "TB Treatment", requested_at: "2025-04-20", status: "Pending" },
  { id: "A002", client_id: "C002", client_name: "John Smith", program: "Malaria Prevention", requested_at: "2025-04-21", status: "Pending" },
  { id: "A003", client_id: "C003", client_name: "Emily Brown", program: "HIV Care", requested_at: "2025-04-22", status: "Approved" },
];

// Dummy data for programs (for filtering)
const programs = ["TB Treatment", "Malaria Prevention", "HIV Care"];

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [filteredAppointments, setFilteredAppointments] = useState(initialAppointments);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();

  // Filter appointments based on search and filters
  const handleFilter = () => {
    let filtered = appointments.filter(
      (appointment) =>
        appointment.client_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        appointment.program.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (selectedPrograms.length > 0) {
      filtered = filtered.filter((appointment) => selectedPrograms.includes(appointment.program));
    }

    if (selectedStatus.length > 0) {
      filtered = filtered.filter((appointment) => selectedStatus.includes(appointment.status));
    }

    setFilteredAppointments(filtered);
  };

  const toggleProgram = (program) => {
    setSelectedPrograms((prev) =>
      prev.includes(program) ? prev.filter((p) => p !== program) : [...prev, program]
    );
  };

  const toggleStatus = (status) => {
    setSelectedStatus((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  const approveAppointment = (appointmentId) => {
    const updatedAppointments = appointments.map((appointment) =>
      appointment.id === appointmentId ? { ...appointment, status: 'Approved' } : appointment
    );
    setAppointments(updatedAppointments);
    setFilteredAppointments(updatedAppointments);
    setNotification('Appointment approved successfully');
    setTimeout(() => setNotification(''), 3000);
    navigate('/schedule-appointment', { state: { appointment: updatedAppointments.find((a) => a.id === appointmentId) } });
  };

  const rejectAppointment = (appointmentId) => {
    const updatedAppointments = appointments.map((appointment) =>
      appointment.id === appointmentId ? { ...appointment, status: 'Rejected' } : appointment
    );
    setAppointments(updatedAppointments);
    setFilteredAppointments(updatedAppointments);
    setNotification('Appointment rejected successfully');
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-900 mb-4">APPOINTMENTS</h1>

      {notification && (
        <div className="bg-green-100 text-green-800 p-2 rounded mb-4">{notification}</div>
      )}

      <div className="mb-4 flex justify-end">
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
          className="bg-blue-900 text-white px-4 py-2 rounded flex items-center ml-4"
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
                <div className="grid grid-cols-1 gap-2">
                  {programs.map((program) => (
                    <div key={program} className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={selectedPrograms.includes(program)}
                        onChange={() => toggleProgram(program)}
                      />
                      <label className="break-words">{program}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="block mb-2 font-semibold text-blue-900">Status</label>
                <div className="grid grid-cols-1 gap-2">
                  {['Pending', 'Approved', 'Rejected'].map((status) => (
                    <div key={status} className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={selectedStatus.includes(status)}
                        onChange={() => toggleStatus(status)}
                      />
                      <label className="break-words">{status}</label>
                    </div>
                  ))}
                </div>
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

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Appointment Requests</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-blue-900">
              <th className="border-b p-2">CLIENT ID</th>
              <th className="border-b p-2">CLIENT NAME</th>
              <th className="border-b p-2">PROGRAM</th>
              <th className="border-b p-2">REQUESTED AT</th>
              <th className="border-b p-2">STATUS</th>
              <th className="border-b p-2">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((appointment) => (
              <tr key={appointment.id}>
                <td className="border-b p-2">{appointment.client_id}</td>
                <td className="border-b p-2">{appointment.client_name}</td>
                <td className="border-b p-2">{appointment.program}</td>
                <td className="border-b p-2">{appointment.requested_at}</td>
                <td className="border-b p-2">{appointment.status}</td>
                <td className="border-b p-2">
                  <button
                    className="bg-green-600 text-white px-4 py-1 rounded mr-2"
                    onClick={() => approveAppointment(appointment.id)}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-600 text-white px-4 py-1 rounded"
                    onClick={() => rejectAppointment(appointment.id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentsPage;