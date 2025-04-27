import React, { useState, useEffect } from 'react';
import { FaComments, FaTimes, FaPaperPlane } from 'react-icons/fa';

/**
 * LiveChat component provides a chat interface for users to communicate before logging in.
 * Messages are stored in localStorage and integrated with MessagesPage.
 * @returns {JSX.Element} The live chat interface.
 */
function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Load messages from localStorage on component mount
  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem('cemaMessages')) || [];
    setMessages(storedMessages);
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cemaMessages', JSON.stringify(messages));
  }, [messages]);

  // Handle sending a new message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: `M${Date.now()}`,
      sender: 'Guest',
      recipient: 'Admin', // Messages from live chat are directed to an admin
      subject: 'Live Chat Inquiry',
      body: newMessage,
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

    setMessages([...messages, message]);
    setNewMessage('');

    // Simulate an admin response (for demo purposes)
    setTimeout(() => {
      const adminResponse = {
        id: `M${Date.now()}`,
        sender: 'Admin',
        recipient: 'Guest',
        subject: 'Live Chat Response',
        body: 'Thank you for your message! How can we assist you today?',
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
      setMessages((prevMessages) => [...prevMessages, adminResponse]);
    }, 1000);
  };

  // Filter messages to show only those relevant to the guest user
  const guestMessages = messages.filter(
    (msg) => msg.sender === 'Guest' || msg.recipient === 'Guest'
  );

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Icon */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-900 text-white p-4 rounded-full shadow-lg hover:bg-blue-800 transition"
        >
          <FaComments size={24} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white w-80 h-96 rounded-lg shadow-xl flex flex-col">
          {/* Chat Header */}
          <div className="bg-blue-900 text-white p-3 rounded-t-lg flex justify-between items-center">
            <h3 className="text-lg font-semibold">Live Chat</h3>
            <button onClick={() => setIsOpen(false)} className="text-white">
              <FaTimes />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-3 overflow-y-auto">
            {guestMessages.length === 0 ? (
              <p className="text-gray-500 text-center">Start a conversation!</p>
            ) : (
              guestMessages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-2 flex ${
                    message.sender === 'Guest' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-xs p-2 rounded-lg ${
                      message.sender === 'Guest'
                        ? 'bg-blue-100 text-blue-900'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    <p className="text-sm">{message.body}</p>
                    <span className="text-xs text-gray-500 block">
                      {message.sender} • {message.timestamp}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="p-3 border-t flex items-center gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-900 text-white p-2 rounded-lg hover:bg-blue-800 transition"
            >
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default LiveChat;