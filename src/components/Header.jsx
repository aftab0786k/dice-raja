import React, { useState } from "react";
import { FaCoins, FaCrown } from "react-icons/fa"; // Added Crown icon
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import "./Login.css";

const Header = () => {
  const [isNotificationActive, setIsNotificationActive] = useState(false);

  const handleNotificationClick = () => {
    setIsNotificationActive(!isNotificationActive);
  };

  return (
    <header className="b-head sticky top-0 z-50 w-full bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-900 text-white p-2 sm:p-4 flex justify-between items-center border-b-2 border-gold-500 shadow-lg" style={{padding: "12px 18px"}}>
      <div className="flex items-center gap-1 sm:gap-2">
        <div className="dice-wrapper relative">
          <img
            src="D-img1.jpg"
            alt="Profile"
            className="w-10 h-10 sm:w-10 sm:h-10 rounded-full border-2 border-gold-500 shadow-md"
          />
          <FaCrown className="absolute -top-2 -right-2 text-yellow-400 text-xs" />
        </div>
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-200">
          Diice Raja
          {/* <span className="text-xs ml-2 bg-yellow-500 text-black px-2 py-1 rounded-full font-normal">
            VIP
          </span> */}
        </h1>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Tokens with upgraded design */}
        <div className="flex items-center gap-1 sm:gap-2 bg-black bg-opacity-40 px-3 py-1 rounded-full border border-yellow-500" style={{padding: "7px 12px"}}>
          <FaCoins className="text-yellow-400 animate-pulse" size={18} />
          <span id="displayName" className="text-sm sm:text-base font-medium">
            <span className="text-yellow-400">05</span> Tokens
          </span>
        </div>

        {/* User ID with premium look */}
        <div className="hidden sm:flex items-center gap-1 sm:gap-2 bg-black bg-opacity-20 px-3 py-1 rounded-full border border-blue-400" style={{padding: "9px 12px"}}>
          <span id="userId" className="text-xs sm:text-sm">
            <span className="text-blue-300">ID:</span> 0000
          </span>
        </div>

        {/* Notification Icon with premium effects */}
        <div
          onClick={handleNotificationClick}
          className="cursor-pointer transition duration-300 hover:scale-110 relative"
        >
          {isNotificationActive ? (
            <NotificationsActiveIcon className="text-yellow-400 w-6 h-6 sm:w-8 sm:h-8 drop-shadow-lg" />
          ) : (
            <NotificationsIcon className="text-white w-6 h-6 sm:w-8 sm:h-8 drop-shadow-lg" />
          )}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;