import React, { useEffect, useState } from 'react';

const Prediction = () => {
  const [prediction, setPrediction] = useState(localStorage.getItem("fetchLastMultiplierValue") || "3");
  const [refresh, setRefresh] = useState(false);
  const [predictionClicked, setPredictionClicked] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (refresh) {
        if (predictionClicked === 0) {
          setTimeout(() => {
            predictOutcome();
            window.location.reload();
          }, 3000);
        } else {
          window.location.reload();
        }
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [refresh, predictionClicked]);

  useEffect(() => {
    const fetchDataById = (id) => {
      // ...existing code...
    };

    const displayData = (data) => {
      console.log("nextTargetMultiplier: " + localStorage.getItem("fetchLastMultiplierValue"));
      if (data.crash === 1) {
        setRefresh(true);
      }
    };

    const intervalId = setInterval(() => {
      fetchDataById(1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const predictOutcome = () => {
    const targetMultiplier = parseFloat((Math.random() * 30 + 1).toFixed(2));
    localStorage.setItem("fetchLastMultiplierValue", targetMultiplier);
    setPrediction(targetMultiplier);
    setPredictionClicked(1);

    // Remove database connection code
  };

  return (
    <div className="bg-blue-900 text-white min-h-screen flex flex-col justify-between items-center">
      <header className="text-center mt-4">
        <h1 className="text-yellow-400 text-2xl font-bold uppercase tracking-wide">Crash Predictor</h1>
        <p className="text-yellow-400 text-sm">ver. 2.3</p>
      </header>

      <div className="flex flex-col items-center mt-10">
        <div className="w-24 h-24 bg-yellow-400 rounded-lg flex items-center justify-center">
          <img
            src="https://v3.traincdn.com/sfiles/games-images/game-animations/game-371-animation-black.svg"
            alt="Crash Icon"
            className="h-16 w-auto"
          />
        </div>
        <p className="mt-4 text-xl font-semibold">CRASH</p>
      </div>

      <div className="relative mt-8 flex flex-col items-center">
        <div className="w-24 h-24 rounded-full border-4 border-yellow-400 flex items-center justify-center animate-spin-color">
          <div className="text-center flex items-center justify-center">
            <h2 id="prediction" className="text-4xl font-bold mb-[1px]">{prediction}</h2>
          </div>
        </div>
        <p className="mt-4 text-yellow-400 text-sm">Rocket Animation</p>
      </div>

      <div id="prediction" className="prediction">
        <button className="button bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105" onClick={predictOutcome}>
          Predict Next Multiplier
        </button>
        <br />
        
      </div>
    </div>
  );
};

export default Prediction;
