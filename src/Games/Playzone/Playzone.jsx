import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FaGlobe, FaGamepad } from "react-icons/fa";
import { GiTrophyCup } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import "./Playzone.css";

const ImageCard = ({ imageSrc, altText, onClick, isActive, title, navigateTo, showComingSoon }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="image-card-container" onClick={onClick}>
        <img src={imageSrc} alt={altText} className="game-image" />
      </div>

      <p className="game-title">{title}</p>

      {isActive && (
        <div className="options-container">
          <button className="option-button" onClick={navigateTo}>
            <FaGamepad className="text-lg" /> PLAY OFFLINE
          </button>

          <button className="option-button" onClick={showComingSoon}>
            <FaGlobe className="text-lg" /> PLAY ONLINE
          </button>

          <button className="option-button" onClick={showComingSoon}>
            <GiTrophyCup className="text-lg" /> TOURNAMENT
          </button>
        </div>
      )}
    </div>
  );
};

const Playzone = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".image-card-container")) {
        setActiveIndex(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleGameClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const navigateToSnakeLadder = () => {
    navigate("/snake");
  };

  const navigateToTicTacToe = () => {
    navigate("/tictactoe");
  };

  const showComingSoonPopup = () => {
    setShowPopup(true);
  };

  return (
    <>
      <Header />
      <div className="playzone-container">
        <h1 className="heading">GAMES</h1>
        <div className="games-wrapper">
          <div className="image-card">
            <ImageCard
              imageSrc="diice-img.jpg"
              altText="Game 1"
              title="Tic Tac Toe"
              onClick={() => handleGameClick(0)}
              isActive={activeIndex === 0}
              navigateTo={navigateToTicTacToe}
              showComingSoon={showComingSoonPopup}
            />
          </div>
          <div className="image-card">
            <ImageCard
              imageSrc="snake.jpg"
              altText="Game 2"
              title="Snake Ladder"
              onClick={() => handleGameClick(1)}
              isActive={activeIndex === 1}
              navigateTo={navigateToSnakeLadder}
              showComingSoon={showComingSoonPopup}
            />
          </div>
        </div>
      </div>

      {/* Premium Coming Soon Popup */}
      {showPopup && (
        <>
          {/* Overlay - ensure opacity works */}
          <div className="fixed inset-0 bg-black bg-opacity-30 z-30" style={{opacity: "0.6"}}></div>
          
          {/* Modal - fully opaque */}
          <div className="fixed inset-0 flex items-center justify-center z-40">
            <div className="premium-popup relative bg-gradient-to-br from-purple-600 via-blue-500 to-indigo-700 p-8 rounded-2xl shadow-2xl text-center transform transition-all duration-300 scale-100 hover:scale-105 max-w-sm w-full">
              {/* Removed backdrop-filter */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 opacity-75"></div>
              
              <h2 className="text-3xl font-extrabold text-white tracking-wide drop-shadow-lg">
                Coming Soon!
              </h2>
              <p className="text-white text-opacity-90 text-lg font-medium drop-shadow-md">
                Get ready for an epic gaming experience!
              </p>
              <button
                onClick={() => setShowPopup(false)}
                className="mt-4 px-6 py-2 bg-white text-indigo-700 font-semibold rounded-full shadow-lg hover:bg-opacity-90 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
              >
                Got It!
              </button>
            </div>
          </div>
        </>
      )}

      <Footer />
    </>
  );
};

export default Playzone;