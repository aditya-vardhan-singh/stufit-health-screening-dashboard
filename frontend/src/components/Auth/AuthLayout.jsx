import React from "react";
import circlelogo from "../../assets/circlelogo.png";

const AuthLayout = ({ children }) => (
  <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-800 via-teal-700 to-blue-900 overflow-hidden">
    {/* Decorative floating blobs */}
    <div className="absolute -top-20 -left-20 w-72 h-72 bg-teal-600 opacity-30 rounded-full animate-blob"></div>
    <div className="absolute top-10 right-10 w-56 h-56 bg-blue-600 opacity-30 rounded-full animate-blob animation-delay-4000"></div>

    <div className="relative z-10 w-full max-w-md bg-white/90 rounded-2xl shadow-2xl p-8 backdrop-blur-md border border-white/30">
      <div className="flex flex-col items-center mb-6">
        <img src={circlelogo} alt="Logo" className="w-24 h-24" />
        <h1 className="mt-4 text-xl font-semibold text-gray-800">
          Health Portal
        </h1>
      </div>
      {children}
    </div>
  </div>
);

export default AuthLayout;
