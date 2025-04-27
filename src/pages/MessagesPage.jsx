import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaPaperPlane } from 'react-icons/fa';

// Dummy data for team members (for recipient dropdown)
const teamMembers = [
  { id: "T001", name: "Dr. John Smith" },
  { id: "T002", name: "Nurse Emily Brown" },
  { id: "T003", name: "Admin Sarah Davis" },
  { id: "T004", name: "Dr. Michael Lee" },
];

/**
 * MessagesPage component allows users to view, search, and send messages.
 * Includes a notification system for unread messages and integrates with LiveChat.
 * @returns {JSX.Element} The messages page.
 */
function MessagesPage() {
  // Load initial messages from localStorage or use default if none exist
  const [messages, setMessages] = useState(() => {
    const storedMessages = localStorage.getItem('cemaMessages');
    return storedMessages
      ? JSON.parse(storedMessages)
      : [
          {
            id: "M001",
            sender: "Dr. John Smith",
            recipient: "Nurse Emily Brown",
            subject: "Patient Update: Jane Doe",
            body: "Please ensure Jane Doe receives her TB medication on time.",
            timestamp: "2025-04-24 09:00 AM",
            read: true,
          },
          {
            id: "M002",
            sender: "Admin Sarah Davis",
            recipient: "Dr. John Smith",
            subject: "Meeting Reminder",
            body: "Reminder: Staff meeting at 2 PM today.",
            timestamp: "2025-04-24 08:30 AM",
            read: false,
          },
          {
            id: "M003",
            sender: "Nurse Emily Brown",
            recipient: "Dr. Michael Lee",
            subject: "Lab Results",
            body: "Lab results for John Smith are ready for review.",
            timestamp: "2025-04-23 03:15 PM",
            read: true,
          },
        ];
  });

  const [showComposeModal, setShowComposeModal] = useState(false);
  const [formData, setFormData] = useState({
    recipient: "",
    subject: "",
    body: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);

  // Update localStorage whenever messages change
  useEffect(() => {
    localStorage.setItem('cemaMessages', JSON.stringify(messages));
  }, [messages]);

  // Calculate unread messages count
  useEffect(() => {
    const count = messages.filter((msg) => !msg.read).length;
    setUnreadCount(count);
  }, [messages]);

  // Handle input changes in the compose form
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Send a new message
  const handleSendMessage = (e) => {
    e.preventDefault();
    const newMessage = {
      id: `M${Math.floor(Math.random() * 10000)}`,
      sender: "Current User", // This would be the logged-in user in a real system
      recipient: teamMembers.find((member) => member.id === formData.recipient)?.name || "Unknown",
      subject: formData.subject,
      body: formData.body,
      timestamp: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      }),
      read: false,
    };
    setMessages([newMessage, ...messages]);
    setFormData({ recipient: "", subject: "", body: "" });
    setShowComposeModal(false);
  };

  // Mark a message as read
  const markAsRead = (messageId) => {
    const updatedMessages = messages.map((msg) =>
      msg.id === messageId ? { ...msg, read: true } : msg
    );
    setMessages(updatedMessages);
  };

  // Filter messages based on search term
  const filteredMessages = messages.filter(
    (message) =>
      message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold text-blue-900">Messages</h2>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-sm font-semibold px-2 py-1 rounded-full">
                {unreadCount} Unread
              </span>
            )}
          </div>
          <button
            className="bg-blue-900 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-800 transition flex items-center gap-2"
            onClick={() => setShowComposeModal(true)}
          >
            <FaEnvelope /> Compose Message
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            className="w-full max-w-md p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Search by sender, recipient, or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Messages Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">Sender</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Recipient</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Subject</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredMessages.length > 0 ? (
                filteredMessages.map((message) => (
                  <tr
                    key={message.id}
                    className={`hover:bg-gray-50 transition cursor-pointer ${!message.read ? 'bg-yellow-50' : ''}`}
                    onClick={() => markAsRead(message.id)}
                  >
                    <td className="px-6 py-4 text-gray-800">{message.sender}</td>
                    <td className="px-6 py-4 text-gray-600">{message.recipient}</td>
                    <td className="px-6 py-4 text-gray-600">{message.subject}</td>
                    <td className="px-6 py-4 text-gray-600">{message.timestamp}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                    No messages found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Compose Message Modal */}
        {showComposeModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-blue-900">Compose Message</h2>
                <button
                  className="text-gray-600 hover:text-gray-800"
                  onClick={() => setShowComposeModal(false)}
                >
                  ×
                </button>
              </div>
              <form onSubmit={handleSendMessage} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Recipient</label>
                  <select
                    name="recipient"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={formData.recipient}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Recipient</option>
                    {teamMembers.map((member) => (
                      <option key={member.id} value={member.id}>
                        {member.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    name="body"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter your message"
                    rows="5"
                    value={formData.body}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                    onClick={() => setShowComposeModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition flex items-center gap-2"
                  >
                    <FaPaperPlane /> Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MessagesPage;