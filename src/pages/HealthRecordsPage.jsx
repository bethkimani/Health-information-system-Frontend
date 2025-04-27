import React, { useState, useEffect } from 'react';
import { fetchHealthRecords, completeHealthRecord } from '../api';

export default function HealthRecords() {
  const [healthRecords, setHealthRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHealthRecords = async () => {
      try {
        const response = await fetchHealthRecords();
        setHealthRecords(response.data);
      } catch (error) {
        console.error('Error fetching health records:', error);
      } finally {
        setLoading(false);
      }
    };
    loadHealthRecords();
  }, []);

  const handleComplete = async (id) => {
    try {
      await completeHealthRecord(id);
      const response = await fetchHealthRecords();
      setHealthRecords(response.data);
    } catch (error) {
      console.error('Error completing health record:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Health Records</h1>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4">ID</th>
              <th className="text-left p-4">Client</th>
              <th className="text-left p-4">Program</th>
              <th className="text-left p-4">Date</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Notes</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {healthRecords.map((record) => (
              <tr key={record.id} className="border-t">
                <td className="p-4">{record.id}</td>
                <td className="p-4">{record.client_name}</td>
                <td className="p-4">{record.program}</td>
                <td className="p-4">{record.date}</td>
                <td className="p-4">{record.status}</td>
                <td className="p-4">{record.notes || '-'}</td>
                <td className="p-4">
                  {record.status === 'Active' && (
                    <button
                      onClick={() => handleComplete(record.id)}
                      className="text-green-600 hover:text-green-800"
                    >
                      <i className="fas fa-check"></i>
                    </button>
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