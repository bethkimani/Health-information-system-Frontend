import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LiveChat from "../components/LiveChat";

/**
 * Login component handles user authentication.
 * Includes a live chat feature at the bottom right.
 * @returns {JSX.Element} The login page.
 */
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const dummyUsers = [
    { email: "test@example.com", password: "password123" },
    { email: "user@example.com", password: "userpass" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const user = dummyUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      setError("Invalid email or password");
      return;
    }

    localStorage.setItem("access_token", "dummy_access_token");
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-poppins relative">
      <div className="bg-white rounded-3xl shadow-xl relative overflow-hidden w-full max-w-3xl min-h-[480px] flex">
        <div className="w-1/2 bg-[#0056A0] flex flex-col p-10 z-10">
          {/* Form */}
          <form onSubmit={handleSubmit} autoComplete="off" className="w-full">
            <h1 className="text-white text-3xl font-semibold mb-2">CEMA Health System</h1>
            <span className="text-white text-sm mb-4">
              Login With Your Email & Password
            </span>
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-gray-200 border-none rounded-lg p-3 w-full mb-3 text-sm focus:outline-none"
            />
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-gray-200 border-none rounded-lg p-3 w-full mb-3 text-sm focus:outline-none pr-10"
              />
              <i
                className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer`}
                onClick={() => setShowPassword(!showPassword)}
              ></i>
            </div>
            <button
              type="submit"
              className="bg-[#F5A623] text-white text-sm font-semibold uppercase py-2 px-10 rounded-lg mt-2 cursor-pointer hover:bg-[#e59620]"
            >
              Sign In
            </button>
          </form>
        </div>
        <div className="w-1/2 bg-white flex items-center justify-center flex-col p-8">
          <img src="/cema-logo.png" alt="CEMA Logo" width="150" />
          <h1 className="text-3xl font-semibold mt-2 text-[#0056A0]">CEMA</h1>
          <p className="text-sm text-gray-600">Data-Driven Health Solutions</p>
        </div>
      </div>
      <LiveChat />
    </div>
  );
}