import React, { useState } from "react";
import UserLogin from "./UserLogin";
import GamerLogin from "./GamerLogin";

const LoginToggle = () => {
  const [isGamer, setIsGamer] = useState(false);

  const toggleHandler = () => {
    setIsGamer((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-purple-700 p-8 flex flex-col items-center relative">
      {/* Fixed Top-Centered Toggle Button */}
      <button
        onClick={toggleHandler}
        className="absolute top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 text-lg font-bold bg-white text-purple-700 rounded-full shadow-lg transition-all duration-300 hover:bg-purple-300 z-50"
      >
       
      </button>

      {/* Extra Padding for Visibility */}
      <div className="pt-20 w-full max-w-xl">
        {/* Toggle Bar */}
        <div
          className="relative flex bg-purple-800 p-4 h-20 rounded-full justify-between items-center cursor-pointer shadow-2xl"
          onClick={toggleHandler}
        >
          {/* Animated Slider */}
          <div
            className={`absolute top-2 left-2 h-16 w-1/2 rounded-full bg-white transition-transform duration-500 flex items-center justify-center ${
              isGamer ? "translate-x-full" : "translate-x-0"
            }`}
          >
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
              {isGamer ? "Gamer" : "User"}
            </span>
          </div>
          {/* Background Labels */}
          <span
            className={`w-1/2 text-center font-bold text-2xl ${isGamer ? "text-white/50" : "text-white"}`}
          >
            User
          </span>
          <span
            className={`w-1/2 text-center font-bold text-2xl ${isGamer ? "text-white" : "text-white/50"}`}
          >
            Gamer
          </span>
        </div>
      </div>

      {/* Login Form Container */}
      <div className="w-full max-w-xl h-[700px] bg-gradient-to-b from-purple-200 to-purple-100 p-16 rounded-3xl shadow-2xl overflow-y-auto">
        {isGamer ? <GamerLogin /> : <UserLogin />}
      </div>
    </div>
  );
};

export default LoginToggle;
