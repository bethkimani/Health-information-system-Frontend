import React, { useState, useEffect } from 'react';
import { fetchAppointments, approveAppointment, rejectAppointment } from '../api';

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const response = await fetchAppointments();
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };
    loadAppointments();
  }, []);

  const handleApprove = async (id) => {
    try {
      await approveAppointment(id);
      const response = await fetchAppointments();
      setAppointments(response.data);
    } catch (error) {
      console.error('Error approving appointment:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectAppointment(id);
      const response = await fetchAppointments();
      setAppointments(response.data);
    } catch (error) {
      console.error('Error rejecting appointment:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Appointments</h1>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4">ID</th>
              <th className="text-left p-4">Client</th>
              <th className="text-left p-4">Program</th>
              <th className="text-left p-4">Requested At</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id} className="border-t">
                <td className="p-4">{appointment.id}</td>
                <td className="p-4">{appointment.client_name}</td>
                <td className="p-4">{appointment.program}</td>
                <td className="p-4">{appointment.requested_at}</td>
                <td className="p-4">{appointment.status}</td>
                <td className="p-4">
                  {appointment.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => handleApprove(appointment.id)}
                        className="text-green-600 hover:text-green-800 mr-2"
                      >
                        <i className="fas fa-check"></i>
                      </button>
                      <button
                        onClick={() => handleReject(appointment.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}