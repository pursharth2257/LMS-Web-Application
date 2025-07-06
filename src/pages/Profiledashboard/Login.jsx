import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGraduationCap } from "react-icons/fa";
// import { useSignUp } from "../../contexts/SignUpContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { showSignUpPopup } = useSignUp();
  const navigate = useNavigate();
  const USE_SESSION_STORAGE = false; // Set to true to test sessionStorage

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Clear storage to avoid stale data
      if (USE_SESSION_STORAGE) {
        sessionStorage.clear();
        console.log("sessionStorage cleared before login");
      } else {
        localStorage.clear();
        console.log("localStorage cleared before login");
      }

      const response = await fetch("https://lms-backend-flwq.onrender.com/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("Response Status:", response.status);
      const data = await response.json();
      console.log("Full Login Response:", JSON.stringify(data, null, 2));

      if (!response.ok) {
        console.log("Response Error:", data.message || "Unknown error");
        throw new Error(data.message || "Login failed. Please check your credentials.");
      }

      // Validate response structure
      const token = data.data?.token;
      const user = data.data; // User data is directly in data.data
      console.log("Token in Response:", token);
      console.log("User in Response:", user);

      if (!token || !user || !user.id || !user.email) {
        console.log("Missing token or required user data in response");
        throw new Error("Invalid response from server: Missing token or user data.");
      }

      // Store token and user
      if (USE_SESSION_STORAGE) {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("user", JSON.stringify(user));
        console.log("Token saved to sessionStorage:", sessionStorage.getItem("token"));
        console.log("User saved to sessionStorage:", sessionStorage.getItem("user"));
        // Verify storage
        if (!sessionStorage.getItem("token")) {
          console.log("Failed to save token to sessionStorage");
          throw new Error("Failed to save authentication token.");
        }
      } else {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        console.log("Token saved to localStorage:", localStorage.getItem("token"));
        console.log("User saved to localStorage:", localStorage.getItem("user"));
        // Verify storage
        if (!localStorage.getItem("token")) {
          console.log("Failed to save token to localStorage");
          throw new Error("Failed to save authentication token.");
        }
      }

      // Delay navigation to ensure storage persists
      setTimeout(() => {
        console.log("Navigating to /profile-dashboard");
        navigate("/profile-dashboard");
      }, 200);
    } catch (err) {
      console.error("Login Error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo */}
        <div className="flex flex-col items-center">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center mr-3">
              <FaGraduationCap className="text-white text-xl" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">BrainBridge</h1>
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Log in to your account</h2>
          <p className="mt-2 text-sm text-gray-600">Access your learning journey</p>
        </div>

        {/* Login Form */}
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-sm"
                placeholder="Enter your email"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-sm"
                placeholder="Enter your password"
                disabled={loading}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link to="/forgot-password" className="text-teal-600 hover:text-teal-700 transition-colors">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              className={`w-full bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors duration-300 text-sm font-medium ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={showSignUpPopup}
                className="text-teal-600 hover:text-teal-700 font-medium transition-colors"
                disabled={loading}
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;