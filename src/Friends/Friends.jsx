

import React, { useState } from 'react';
import { FaWhatsapp, FaTelegramPlane, FaCopy, FaInstagram, FaYoutube, FaTimes } from 'react-icons/fa';
import Header from "../components/Header";
import Footer from "../components/Footer";
import './Friends.css';

const Friends = () => {
  const [copied, setCopied] = useState(false);
  const [instagramFollowed, setInstagramFollowed] = useState(false);
  const [youtubeSubscribed, setYoutubeSubscribed] = useState(false);
  const [youtubeWatched, setYoutubeWatched] = useState(false);
  const [showWatchPopup, setShowWatchPopup] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const referralLink = 'https://example.com/invite?ref=12345';

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInstagramFollow = () => {
    if (!instagramFollowed) {
      setAlertMessage('You earned 200 tokens for following our Instagram channel!');
      setInstagramFollowed(true);
    } else {
      setAlertMessage('You have already followed our Instagram channel.');
    }
    setShowAlert(true);
  };

  const handleYoutubeSubscribe = () => {
    if (!youtubeSubscribed) {
      setAlertMessage('You earned 200 tokens for subscribing to our YouTube channel!');
      setYoutubeSubscribed(true);
    } else {
      setAlertMessage('You have already subscribed to our YouTube channel.');
    }
    setShowAlert(true);
  };

  const handleYoutubeWatch = () => {
    if (!youtubeWatched) {
      setAlertMessage('You earned 100 tokens for watching our YouTube videos for the first time!');
      setYoutubeWatched(true);
    } else {
      setAlertMessage('You have already earned tokens for watching our YouTube videos.');
    }
    setShowWatchPopup(false);
    setShowAlert(true);
  };

  const handleYoutubeIconClick = () => {
    if (!youtubeWatched) {
      setShowWatchPopup(true);
    } else {
      setAlertMessage('You have already earned tokens for watching our YouTube videos.');
      setShowAlert(true);
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  return (
    <>
      <Header />
      <div className="friends-container min-h-screen p-6 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6 text-white-800">Invite Friends</h1>
        
        <div className="w-full max-w-md bg-white/20 backdrop-blur-md rounded-xl shadow-lg p-6 space-y-6">
          {/* Referral Link */}
          <div className="referral-item flex flex-col items-center p-4 bg-white/35 backdrop-blur-md rounded-md transition relative">
            <div className="w-full flex items-center">
              <input 
                type="text" 
                value={referralLink} 
                readOnly
                className="referral-link-input flex-1 bg-white border border-gray-300 rounded-l-md p-2 text-sm text-gray-700 h-8"
              />
              <button 
                onClick={handleCopy} 
                className="copy-button bg-gray-700 text-white px-3 py-2 rounded-r-md hover:bg-gray-900"
              >
                <FaCopy />
              </button>
            </div>
            {copied && <p className="text-black text-sm mt-1">Link copied!</p>}
          </div>

          {/* Icons Row */}
          <div className="icon-row flex justify-around items-center">
            {/* WhatsApp */}
            <div className="icon-item flex flex-col items-center bg-transparent cursor-pointer shadow-lg transition-all duration-300 hover:bg-white/20 hover:shadow-xl hover:scale-105 rounded-lg p-2">
              <FaWhatsapp className="text-green-400 text-2xl cursor-pointer" />
              <div className="mt-2 bg-green-500 text-white text-[8px] w-18 h-5 px-2 py-1 rounded-lg hover:bg-green-700 cursor-pointer">
                Get Token: 300
              </div>
            </div>

            {/* Telegram */}
            <div className="icon-item flex flex-col items-center bg-transparent cursor-pointer shadow-lg transition-all duration-300 hover:bg-white/20 hover:shadow-xl hover:scale-105 rounded-lg p-2">
              <FaTelegramPlane className="text-blue-400 text-2xl cursor-pointer" />
              <div className="mt-2 bg-blue-500 text-white text-[8px] w-18 h-5 px-2 py-1 rounded-lg hover:bg-blue-700 cursor-pointer">
                Get Token: 400
              </div>
            </div>

            {/* Instagram */}
            <div className="icon-item flex flex-col items-center bg-transparent cursor-pointer shadow-lg transition-all duration-300 hover:bg-white/20 hover:shadow-xl hover:scale-105 rounded-lg p-2">
              <FaInstagram className="text-pink-400 text-2xl cursor-pointer" />
              <button 
                onClick={handleInstagramFollow} 
                className="mt-2 bg-pink-500 text-white text-[8px] w-18 h-5 px-2 py-1 rounded-lg hover:bg-pink-700 cursor-pointer"
              >
                {instagramFollowed ? 'Followed' : 'Get Token: 200'}
              </button>
            </div>

            {/* YouTube */}
            <div className="icon-item flex flex-col items-center bg-transparent cursor-pointer shadow-lg transition-all duration-300 hover:bg-white/20 hover:shadow-xl hover:scale-105 rounded-lg p-2">
              <FaYoutube 
                className="text-red-600 text-2xl cursor-pointer" 
                onClick={handleYoutubeIconClick} 
              />
              <button 
                onClick={handleYoutubeSubscribe} 
                className="mt-2 bg-red-600 text-white text-[8px] w-18 h-5 px-2 py-1 rounded-lg hover:bg-red-700 cursor-pointer"
              >
                {youtubeSubscribed ? 'Subscribed' : 'Subscribe'}
              </button>
            </div>
          </div>
        </div>

        {/* Watch Popup */}
        {showWatchPopup && (
          <div className="fixed inset-0 bg-gradient-to-br from-[#0f3460] to-[#1a1a2e] flex items-center justify-center">
            <div className="bg-white/20 backdrop-blur-md p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold mb-4">Watch YouTube Videos</h2>
              <p className="text-[10px]">Click the button below to earn tokens for watching our YouTube videos.</p>
              <div className="flex flex-col space-y-3 mt-4">
                <button 
                  onClick={handleYoutubeWatch} 
                  className="bg-red-600 text-white text-[10px] w-20 h-6 px-3 py-1 rounded-md hover:bg-red-700"
                >
                  Watch Now
                </button>
                <button 
                  onClick={() => setShowWatchPopup(false)} 
                  className="bg-gray-500 text-white text-[10px] w-20 h-6 px-3 py-1 rounded-md hover:bg-gray-400"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Alert Popup */}
        {showAlert && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-black p-4 rounded-lg shadow-lg flex items-center justify-between space-x-4">
            <p className="text-[10px] text-amber-300">{alertMessage}</p>
            <button 
              onClick={closeAlert} 
              className="text-red-700 hover:text-red-900"
            >
              <FaTimes />
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Friends;