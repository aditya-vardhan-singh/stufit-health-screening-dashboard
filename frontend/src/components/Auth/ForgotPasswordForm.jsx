import React, { useState } from "react";
import { HiMail } from "react-icons/hi";

const ForgotPasswordForm = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(email);
      setMessage("✅ OTP sent to your email.");
      setError("");
    } catch {
      setError("❌ Failed to send OTP. Try again.");
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Forgot Password
      </h2>

      <div className="relative">
        <HiMail className="absolute left-3 top-3 text-teal-500" />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition bg-white text-gray-800"
        />
      </div>

      {message && (
        <p className="text-sm text-green-600 bg-green-100 px-3 py-2 rounded-md border border-green-300 text-center">
          {message}
        </p>
      )}

      {error && (
        <p className="text-sm text-red-600 bg-red-100 px-3 py-2 rounded-md border border-red-300 text-center">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-semibold transition"
      >
        Send OTP
      </button>
    </form>
  );
};

export default ForgotPasswordForm;
