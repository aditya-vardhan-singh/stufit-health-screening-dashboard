import React, { useState } from "react";
import { HiShieldCheck } from "react-icons/hi";

const OtpVerificationForm = ({ onSubmit }) => {
  const [otp, setOtp] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(otp);
    } catch {
      // error handled in parent
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        OTP Verification
      </h2>
      <p className="text-sm text-gray-600 text-center">
        OTP has been sent to your registered email.
      </p>

      <div className="relative">
        <HiShieldCheck className="absolute left-3 top-3 text-teal-500" />
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          placeholder="Enter OTP"
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition bg-white text-gray-800"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-semibold transition"
      >
        Verify OTP
      </button>
    </form>
  );
};

export default OtpVerificationForm;
