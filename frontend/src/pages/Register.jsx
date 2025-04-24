import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    if (existingUsers.some((user) => user.email === email)) {
      setError("User with this email already exists");
      return;
    }

    const newUser = { email, password };
    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-poppins">
      <div className="bg-white rounded-3xl shadow-xl relative overflow-hidden w-full max-w-3xl min-h-[480px] flex">
        <div className="w-1/2 bg-[#0056A0] flex items-center justify-center flex-col p-10 z-10">
          <form onSubmit={handleSubmit} autoComplete="off" className="w-full">
            <h1 className="text-white text-3xl font-semibold mb-2">CEMA Health System</h1>
            <span className="text-white text-sm mb-4">
              Register With Your Email & Password
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
              Register
            </button>
          </form>
        </div>
        <div className="w-1/2 bg-white flex items-center justify-center flex-col p-8">
          <img src="/cema-logo.png" alt="CEMA Logo" width="150" />
          <h1 className="text-3xl font-semibold mt-2 text-[#0056A0]">CEMA</h1>
          <p className="text-sm text-gray-600">Data-Driven Health Solutions</p>
        </div>
      </div>
    </div>
  );
}