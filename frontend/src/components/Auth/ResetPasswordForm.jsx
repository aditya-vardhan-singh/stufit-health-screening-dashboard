import React, { useState } from "react";
import { HiLockClosed } from "react-icons/hi";

const ResetPasswordForm = ({ onSubmit }) => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("❌ Passwords do not match.");
      setMessage("");
      return;
    }
    try {
      await onSubmit(password);
      setMessage("✅ Password reset successful.");
      setError("");
    } catch {
      setError("❌ Failed to reset password.");
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Reset Password
      </h2>

      <div className="relative">
        <HiLockClosed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500" />
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition bg-white text-gray-800"
        />
      </div>

      <div className="relative">
        <HiLockClosed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500" />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
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
        Reset Password
      </button>
    </form>
  );
};

export default ResetPasswordForm;
