import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { useNavigate } from "react-router-dom";

Chart.register(...registerables);

const Dashboard = () => {
  const patientsChartRef = useRef(null);
  const requestsChartRef = useRef(null);
  const patientsChartInstance = useRef(null);
  const requestsChartInstance = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Destroy existing chart instances before creating new ones
    if (patientsChartInstance.current) {
      patientsChartInstance.current.destroy();
    }
    if (requestsChartInstance.current) {
      requestsChartInstance.current.destroy();
    }

    // Create Patients per Month Histogram
    if (patientsChartRef.current) {
      patientsChartInstance.current = new Chart(patientsChartRef.current, {
        type: "bar",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [{
            label: "No. of Patients",
            data: [250, 200, 230, 180, 220, 260, 240, 210, 230, 200, 190, 220],
            backgroundColor: "rgba(123, 97, 255, 0.5)",
            borderColor: "rgba(123, 97, 255, 1)",
            borderWidth: 1,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { beginAtZero: true },
          },
        },
      });
    }

    // Create Requests Pie Chart
    if (requestsChartRef.current) {
      requestsChartInstance.current = new Chart(requestsChartRef.current, {
        type: "doughnut",
        data: {
          labels: ["Approved", "Unapproved", "Pending"],
          datasets: [{
            data: [50, 30, 20],
            backgroundColor: ["#7B61FF", "#A5B4FC", "#E0E7FF"],
            borderWidth: 1,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }

    // Cleanup: Destroy chart instances when component unmounts
    return () => {
      if (patientsChartInstance.current) {
        patientsChartInstance.current.destroy();
      }
      if (requestsChartInstance.current) {
        requestsChartInstance.current.destroy();
      }
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-16 bg-white shadow-md flex flex-col items-center py-6 space-y-6">
        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2a3 3 0 013-3h0a3 3 0 013 3v2m-6 0h6m-9 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
        </svg>
        <div className="mt-auto">
          <img src="/images/no-image.jpg" alt="User Profile" className="w-10 h-10 rounded-full" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        {/* Cards Section */}
        <section className="grid grid-cols-4 gap-6 mb-6">
          {["All Patients", "Triage", "Lab", "Pharmacy"].map((title, index) => (
            <div key={index} className="bg-[#2A2E5B] text-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{title}</h3>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                </svg>
              </div>
              <p className="text-3xl font-bold">90</p>
              <p className="text-sm">+3,840 (26.80%)</p>
            </div>
          ))}
        </section>

        {/* Charts Section */}
        <section className="grid grid-cols-3 gap-6 mb-6">
          <div className="col-span-2 bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">No. of Patients per month</h3>
              <select className="border rounded px-2 py-1">
                <option>This year</option>
              </select>
            </div>
            <div className="h-64">
              <canvas ref={patientsChartRef}></canvas>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Requests</h3>
            <div className="h-64 flex justify-center items-center">
              <canvas ref={requestsChartRef}></canvas>
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              <div className="flex items-center">
                <span className="w-4 h-4 bg-[#7B61FF] rounded-full mr-2"></span>
                <span>Approved</span>
              </div>
              <div className="flex items-center">
                <span className="w-4 h-4 bg-[#A5B4FC] rounded-full mr-2"></span>
                <span>Unapproved</span>
              </div>
              <div className="flex items-center">
                <span className="w-4 h-4 bg-[#E0E7FF] rounded-full mr-2"></span>
                <span>Pending</span>
              </div>
            </div>
          </div>
        </section>

        {/* Queue Section */}
        <section className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Queue</h3>
            <div className="flex space-x-2">
              <button className="bg-[#2A2E5B] text-white px-4 py-2 rounded">View More</button>
              <button className="bg-[#2A2E5B] text-white px-4 py-2 rounded">Add Request</button>
            </div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm">Recent Requests</span>
            <div className="flex space-x-2">
              <button className="bg-gray-200 px-3 py-1 rounded">Bandages</button>
              <button className="bg-gray-200 px-3 py-1 rounded">Other Events</button>
            </div>
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-600">
                <th className="p-2">Visit No.</th>
                <th className="p-2">Patient Name</th>
                <th className="p-2">Check-In Date</th>
                <th className="p-2"></th>
                <th className="p-2"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-2">787856754</td>
                <td className="p-2">Will James</td>
                <td className="p-2">22/02/2022</td>
                <td className="p-2">Mar 14, 2019</td>
                <td className="p-2 text-green-500">Approved</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;