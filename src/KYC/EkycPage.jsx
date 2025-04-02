

import React, { useState } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./EkycPage.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Import back icon from Material-UI
import CloseIcon from '@mui/icons-material/Close'; // Import close icon from Material-UI

const EkycPage = () => {
  const [showAadhaarCard, setShowAadhaarCard] = useState(false);
  const [showPanCard, setShowPanCard] = useState(false);
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [showAlert, setShowAlert] = useState(false); // State to control custom alert visibility
  const [alertMessage, setAlertMessage] = useState(''); // State to store alert message

  const handleAadhaarCardClick = () => {
    setShowAadhaarCard(true);
    setShowPanCard(false);
  };

  const handlePanCardClick = () => {
    setShowPanCard(true);
    setShowAadhaarCard(false);
  };

  const handleBackClick = () => {
    setShowAadhaarCard(false);
    setShowPanCard(false);
    setAadhaarNumber('');
    setOtp('');
    setOtpSent(false);
    setMobileNumber('');
    setPanNumber('');
  };

  const handleGenerateOtp = () => {
    if (aadhaarNumber.length === 12) {
      setMobileNumber('123456****');
      setOtpSent(true);
      showCustomAlert(`OTP sent to ${mobileNumber}`);
    } else {
      showCustomAlert('Please enter a valid 12-digit Aadhaar number.');
    }
  };

  const handleContinue = () => {
    if (otp.length === 6) {
      showCustomAlert('OTP verified successfully!');
    } else {
      showCustomAlert('Please enter a valid 6-digit OTP.');
    }
  };

  // Function to show custom alert
  const showCustomAlert = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  // Function to close custom alert
  const closeAlert = () => {
    setShowAlert(false);
  };

  return (
    <>
      <Header />
      <div className="flex justify-center items-center cursor-pointer">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-80 mt-10 transform transition-all hover:scale-105 relative overflow-hidden">
          {showAadhaarCard ? (
            <div className="relative z-10">
              <div className="flex items-center mb-4">
                <ArrowBackIcon 
                  className="text-yellow-600 cursor-pointer"
                  onClick={handleBackClick}
                />
                <div className="text-s font-bold ml-2 text-yellow-600 cursor-pointer">
                  Aadhaar Card Details
                </div>
              </div>

              <img 
                src="./aadhar-img.jpg"
                alt="Aadhaar Card Details"
                className="w-40 h-40 mx-auto mb-4 rounded-lg"
              />

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">1 Aadhaar Number</label>
                <input
                  type="text"
                  placeholder="Enter 12 digit Aadhaar number"
                  className="w-full text-s text-black p-2 mt-1 border border-gray-300 rounded-lg"
                  value={aadhaarNumber}
                  onChange={(e) => setAadhaarNumber(e.target.value)}
                  maxLength={12}
                />
              </div>

              <button 
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg mb-4"
                onClick={handleGenerateOtp}
              >
                Generate OTP
              </button>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">2 Enter OTP</label>
                <input
                  type="text"
                  placeholder="Enter 6 digit OTP"
                  className="w-full p-2 mt-1 border text-black border-gray-300 rounded-lg"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                />
              </div>

              <button
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg mb-4"
                onClick={handleContinue}
              >
                Continue
              </button>
            </div>
          ) : showPanCard ? (
            <div className="relative z-10">
              <div className="flex items-center mb-4">
                <ArrowBackIcon 
                  className="text-yellow-600 cursor-pointer"
                  onClick={handleBackClick}
                />
                <div className="text-s font-bold ml-2 text-yellow-600 cursor-pointer">
                  Pan Card Details
                </div>
              </div>
      
              <img 
                src="./pan-img.jpg"
                alt="Pan Card Details"
                className="w-40 h-40 mx-auto mb-4 rounded-lg"
              />

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">1 Pan Number</label>
                <input
                  type="text"
                  placeholder="Enter 10 digit Pan number"
                  className="w-full text-s text-black p-2 mt-1 border border-gray-300 rounded-lg"
                  value={panNumber}
                  onChange={(e) => setPanNumber(e.target.value)}
                  maxLength={10}
                />
              </div>

              <button 
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg mb-4"
                onClick={handleGenerateOtp}
              >
                Generate OTP
              </button>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">2 Enter OTP</label>
                <input
                  type="text"
                  placeholder="Enter 6 digit OTP"
                  className="w-full p-2 mt-1 border text-black border-gray-300 rounded-lg"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                />
              </div>

              <button
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg mb-4"
                onClick={handleContinue}
              >
                Continue
              </button>
            </div>
          ) : (
            <>
              {/* Bubble Animation */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                <div className="bubble bubble-1"></div>
                <div className="bubble bubble-2"></div>
                <div className="bubble bubble-3"></div>
              </div>

              <div className="text-center relative z-10">
                <div className="text-s font-bold mb-4 text-yellow-600 cursor-pointer">
                  Complete Your KYC <span className="text-yellow-600">&gt;</span>
                </div>
                <img 
                  src="./verify-img.jpg" 
                  alt="Verification" 
                  className="w-48 h-48 mx-auto mb-4 rounded-full border-4 border-yellow-500"
                />
              </div>
              <div className="mb-6 relative z-10">
                <button
                  className="w-full mb-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl flex justify-between items-center transform transition-all hover:scale-105 hover:shadow-lg"
                  onClick={handleAadhaarCardClick}
                >
                  <span className="font-medium">Aadhaar Card</span>
                  <span className="text-xl">&gt;</span>
                </button>
                <button 
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl flex justify-between items-center transform transition-all hover:scale-105 hover:shadow-lg"
                  onClick={handlePanCardClick}
                >
                  <span className="font-medium">Pan Card</span>
                  <span className="text-xl">&gt;</span>
                </button>
                <div className="text-sm text-gray-600 mt-4 text-center">
                  OTP based and within 30 seconds.
                </div>
              </div>
              <div className="text-center text-xs text-gray-600 mt-6 bg-amber-200 rounded-2xl p-2 relative z-10">
                User under 18 years of age (as per the KYC document) will be blocked immediately.
              </div>
            </>
          )}
        </div>
      </div>

      {/* Custom Alert Modal */}
      {showAlert && (
        <div className="fixed h-2 mt-15  inset-0 flex items-center justify-center  bg-opacity-50 z-50">
          <div className="bg-yellow-300 font-semibold text-center text-xs p-6 rounded-lg shadow-lg text-black relative">
            <CloseIcon 
              className="text-red-500 text-sm cursor-pointer absolute top-0 right-0"
              onClick={closeAlert}
            />
            <p>{alertMessage}</p>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default EkycPage;