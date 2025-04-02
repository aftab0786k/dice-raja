
import React, { useState, useEffect } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./EarnSection.css";

const EarnSection = () => {
  const [daysVisited, setDaysVisited] = useState([]);
  const [totalTokens, setTotalTokens] = useState(0);

  const rewards = [100, 200, 300, 500, 600, 800, 1000];
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  useEffect(() => {
    const today = new Date().toLocaleString('en-us', { weekday: 'long' });
    const todayDate = new Date().toDateString();
    const lastVisitDate = localStorage.getItem('lastVisitDate');
    const visitedDays = JSON.parse(localStorage.getItem('visitedDays')) || [];

    if (lastVisitDate !== todayDate) {
      const lastVisitDay = visitedDays[visitedDays.length - 1];
      const lastVisitIndex = daysOfWeek.indexOf(lastVisitDay);
      const todayIndex = daysOfWeek.indexOf(today);

      if (visitedDays.length === 0 || todayIndex === (lastVisitIndex + 1) % 7) {
        const newVisitedDays = [...visitedDays, today];
        localStorage.setItem('visitedDays', JSON.stringify(newVisitedDays));
        setDaysVisited(newVisitedDays);
        setTotalTokens(rewards[newVisitedDays.length - 1]);
      } else {
        localStorage.setItem('visitedDays', JSON.stringify([today]));
        setDaysVisited([today]);
        setTotalTokens(rewards[0]);
      }

      localStorage.setItem('lastVisitDate', todayDate);
    } else {
      setDaysVisited(visitedDays);
      setTotalTokens(rewards[visitedDays.length - 1] || 0);
    }
  }, []);

  return (
    <>
      <Header />
      <div className="earn-section-container bg-transparent p-4 flex items-center justify-center m-auto mt-10">
        <div className="cards-container flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full max-w-4xl">
          {/* Daily Visit Tracking Card */}
          <div className="daily-visit-card relative bg-white/30 p-6 rounded-lg shadow-md flex-1 overflow-hidden cursor-pointer">
            {/* Bubble Background */}
            <div className="bubble-container absolute inset-0 z-0">
              <div className="bubble bubble-1"></div>
              <div className="bubble bubble-2"></div>
              <div className="bubble bubble-3"></div>
              <div className="bubble bubble-4"></div>
            </div>
            <div className="content-container relative z-10">
              <h2 className="card-title text-xl font-bold mb-4 text-center text-yellow-500">Daily Visit Tracking</h2>
              <div className="days-container flex justify-between space-x-2 mt-10">
                {daysOfWeek.map((day, index) => (
                  <div key={day} className="day-item flex flex-col items-center">
                    <div className={`day-icon w-6 h-6 flex items-center justify-center bg-yellow-100 rounded-md shadow-lg ${daysVisited.includes(day) ? 'bg-yellow-500' : ''}`}>
                      {daysVisited.includes(day) && (
                        <span className="text-white">✔️</span>
                      )}
                    </div>
                    <span className="day-label text-yellow-900 font-bold mt-1">{day.charAt(0)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Earned Tokens Card */}
          <div className="earned-tokens-card relative bg-white/30 p-6 rounded-lg shadow-md flex-1 overflow-hidden h-60 cursor-pointer">
            {/* Bubble Background */}
            <div className="bubble-container absolute inset-0 z-0">
              <div className="bubble bubble-1"></div>
              <div className="bubble bubble-2"></div>
              <div className="bubble bubble-3"></div>
              <div className="bubble bubble-4"></div>
            </div>
            <div className="content-container relative z-10">
              <h2 className="card-title text-xl text-yellow-500 font-bold mb-4 text-center">Daily Earned Tokens</h2>
              <div className="tokens-display text-center mt-10">
                <span className="tokens-value text-4xl font-bold text-yellow-100">{totalTokens}</span>
                <p className="tokens-label text-yellow-200 mt-2">Total Tokens Earned</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <style jsx>{`
        .earn-section-container {
          padding: 1rem;
        }

        .cards-container {
          flex-direction: column;
        }

        .daily-visit-card, .earned-tokens-card {
          margin-bottom: 1rem;
        }

        .day-icon {
          width: 24px;
          height: 24px;
        }

        .tokens-value {
          font-size: 2rem;
        }

        @media (min-width: 768px) {
          .cards-container {
            flex-direction: row;
          }

          .daily-visit-card, .earned-tokens-card {
            margin-bottom: 0;
          }

          .day-icon {
            width: 30px;
            height: 30px;
          }

          .tokens-value {
            font-size: 3rem;
          }
        }

        .bubble {
          position: absolute;
          background: rgba(255, 235, 59, 0.3);
          border-radius: 50%;
          animation: float 6s infinite ease-in-out;
        }

        .bubble-1 {
          width: 80px;
          height: 80px;
          top: 10%;
          left: 10%;
          animation-duration: 6s;
        }

        .bubble-2 {
          width: 120px;
          height: 120px;
          top: 50%;
          left: 70%;
          animation-duration: 8s;
        }

        .bubble-3 {
          width: 60px;
          height: 60px;
          top: 70%;
          left: 20%;
          animation-duration: 5s;
        }

        .bubble-4 {
          width: 100px;
          height: 100px;
          top: 30%;
          left: 50%;
          animation-duration: 7s;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </>
  );
};

export default EarnSection;