import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import { FaUserCircle } from 'react-icons/fa'; // Import user profile icon

Chart.register(...registerables);

/**
 * Dashboard component displays key metrics and charts for the CEMA Health System.
 * Includes user info at the top.
 * @returns {JSX.Element} The dashboard page.
 */
const Dashboard = () => {
  const patientsChartRef = useRef(null);
  const requestsChartRef = useRef(null);
  const patientsChartInstance = useRef(null);
  const requestsChartInstance = useRef(null);
  const [showProfile, setShowProfile] = useState(false); // State to toggle profile dropdown

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

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="flex-1">
      {/* Header Section */}
      <header className="bg-white p-4 shadow-md flex justify-end items-center relative">
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">Hello, User</span>
          <span className="text-gray-600 flex items-center">
            <svg
              className="w-5 h-5 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            32°C Nairobi
          </span>
          <span className="text-gray-600">{currentDate}</span>
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="text-gray-600 hover:text-gray-800"
            title="User Profile"
          >
            <FaUserCircle className="text-2xl" />
          </button>
        </div>

        {/* User Profile Dropdown */}
        {showProfile && (
          <div className="absolute top-14 right-4 bg-white shadow-lg rounded-lg p-4 w-64 z-10">
            <h4 className="text-lg font-semibold text-gray-800">User Profile</h4>
            <p className="text-sm text-gray-600">Name: John Doe</p>
            <p className="text-sm text-gray-600">Email: john.doe@example.com</p>
            <p className="text-sm text-gray-600">Role: Administrator</p>
            <button
              onClick={() => setShowProfile(false)}
              className="mt-2 text-sm text-blue-500 hover:underline"
            >
              Close
            </button>
          </div>
        )}
      </header>

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