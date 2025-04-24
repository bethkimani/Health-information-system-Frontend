import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import LiveChat from "../components/LiveChat";
import "./Login.css"; // Import the CSS file for styling

/**
 * Login component handles user authentication and password reset requests.
 * Includes a live chat feature at the bottom right.
 * @param {Object} props - Component props.
 * @param {boolean} [props.isResetPassword=false] - Toggles between login and reset password modes.
 * @returns {JSX.Element} The login or reset password page.
 */
export default function Login({ isResetPassword = false }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const dummyUsers = [
    { email: "test@example.com", password: "password123" },
    { email: "user@example.com", password: "userpass" },
  ];

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

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

  const handleResetPasswordSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const user = dummyUsers.find((u) => u.email === email);

    if (!user) {
      setError("No account found with this email");
      return;
    }

    // Simulate sending a reset password email
    setSuccess("A password reset link has been sent to your email.");
    setEmail("");
  };

  return (
    <div className="login-container">
      <div className="bg-white rounded-3xl shadow-xl relative overflow-hidden w-full max-w-3xl min-h-[480px] flex">
        <div className="w-1/2 bg-[#0056A0] flex flex-col p-10 z-10">
          {/* Form */}
          {isResetPassword ? (
            <form onSubmit={handleResetPasswordSubmit} autoComplete="off" className="w-full">
              <h1 className="text-white text-3xl font-semibold mb-2">CEMA Health System</h1>
              <span className="text-white text-sm mb-4">
                Enter your email to reset your password
              </span>
              {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
              {success && <p className="text-green-500 text-sm mb-2">{success}</p>}
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-200 border-none rounded-lg p-3 w-full mb-3 text-sm focus:outline-none"
              />
              <button
                type="submit"
                className="bg-[#F5A623] text-white text-sm font-semibold uppercase py-2 px-10 rounded-lg mt-2 cursor-pointer hover:bg-[#e59620]"
              >
                Send Reset Link
              </button>
              <p className="text-white text-sm mt-4">
                Back to <Link to="/login" className="underline hover:text-[#F5A623]">Login</Link>
              </p>
            </form>
          ) : (
            <form onSubmit={handleLoginSubmit} autoComplete="off" className="w-full">
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
              <p className="text-white text-sm mt-4">
                Forgot your password?{" "}
                <Link to="/reset-password" className="underline hover:text-[#F5A623]">
                  Reset Password
                </Link>
              </p>
            </form>
          )}
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