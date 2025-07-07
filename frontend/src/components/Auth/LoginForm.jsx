import React, { useState } from "react";
import { HiMail, HiLockClosed } from "react-icons/hi";

const LoginForm = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await onSubmit(email, password);
    } catch {
      setError("Invalid credentials. Try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="relative">
        <HiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500" />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email Address"
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-teal-200 focus:ring-2 transition bg-white text-gray-800"
        />
      </div>

      <div className="relative">
        <HiLockClosed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500" />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-teal-200 focus:ring-2 transition bg-white text-gray-800"
        />
      </div>

      {error && <p className="text-sm text-red-500 text-center">{error}</p>}

      <button
        type="submit"
        className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-semibold transition"
      >
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;
