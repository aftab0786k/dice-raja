import { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaCity, FaMapMarker } from "react-icons/fa";

const UserLogin = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-purple-900 to-purple-700 p-4">
      {/* Form Wrapper */}
      <div className="bg-purple-800 p-8 rounded-3xl shadow-2xl w-full max-w-lg lg:max-w-2xl flex flex-col justify-between h-full">
        {/* Diice Raja Title */}
        <h1 className="text-yellow-500 text-5xl font-bold text-center mb-4">
          Diice Raja
        </h1>

        {/* User Login / Sign Up Title */}
        <h2 className="text-white text-3xl font-bold text-center mb-8">
          {isLogin ? "User Login" : "User Sign Up"}
        </h2>

        {/* Form */}
        <form className="space-y-6 flex-grow">
          {/* Full Name Field (Sign-Up Only) */}
          {!isLogin && (
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white" />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full pl-12 pr-4 py-4 bg-purple-700 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          )}

          {/* Email Field */}
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white" />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full pl-12 pr-4 py-4 bg-purple-700 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Phone Number (Sign-Up Only) */}
          {!isLogin && (
            <div className="relative">
              <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white" />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full pl-12 pr-4 py-4 bg-purple-700 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          )}

          {/* State and City Fields (Sign-Up Only) */}
          {!isLogin && (
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <FaMapMarker className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white" />
                <input
                  type="text"
                  placeholder="State"
                  className="w-full pl-12 pr-4 py-4 bg-purple-700 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div className="relative">
                <FaCity className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white" />
                <input
                  type="text"
                  placeholder="City"
                  className="w-full pl-12 pr-4 py-4 bg-purple-700 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-500"
                />
              </div>
            </div>
          )}

          {/* Password Field */}
          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-12 pr-4 py-4 bg-purple-700 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold text-lg rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-white mt-6 text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            className="text-yellow-400 cursor-pointer hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
