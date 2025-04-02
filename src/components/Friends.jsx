import React, { useState } from 'react';
import { FaWhatsapp, FaTelegramPlane, FaCopy } from 'react-icons/fa';
import Header from "../components/Header";
import Footer from "../components/Footer";
import './Friends.css';

const Friends = () => {
  const [copied, setCopied] = useState(false);
  const referralLink = 'https://example.com/invite?ref=12345';

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
    <Header />
    <div className="friends-container  min-h-screen p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-white-800">Friends Section</h1>
      
      <div className="w-full max-w-lg bg-gray-100 rounded-xl shadow-lg p-6 space-y-6">
        {/* WhatsApp Referral */}
        <div className="referral-item flex items-center p-4 bg-green-300 rounded-md hover:bg-green-400 transition">
          <FaWhatsapp className="text-green-600 text-3xl mr-4" />
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-black">Referral through WhatsApp</h2>
            <p className="text-gray-600">Get token: 300</p>
          </div>
        </div>

        {/* Telegram Referral */}
        <div className="referral-item flex items-center p-4 bg-blue-300 rounded-md hover:bg-blue-400 transition">
          <FaTelegramPlane className="text-blue-600 text-3xl mr-4" />
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-black">Referral through Telegram</h2>
            <p className="text-gray-600">Get token: 400</p>
          </div>
        </div>

        {/* Invitation Link */}
        <div className="referral-item flex items-center p-4 bg-purple-300 rounded-md hover:bg-purple-400 transition relative">
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-black">Invitation Link</h2>
            <p className="text-gray-600">Get token: 300</p>
            <div className="mt-2 flex items-center">
              <input 
                type="text" 
                value={referralLink} 
                readOnly
                className="referral-link-input flex-1 bg-white border border-gray-300 rounded-l-md p-2 text-sm text-gray-700"
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
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Friends;
