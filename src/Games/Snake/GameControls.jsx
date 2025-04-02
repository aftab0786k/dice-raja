import React, { useState } from "react";
import Dice3D from "./Dice3D"; // Import the new 3D dice component
import "./SnakeLadder.css";

export const GameControls = ({
  players,
  playersCount,
  currentPlayer,
  onRollDice,
}) => {
  const [rollingPlayer, setRollingPlayer] = useState(null); // Track which player is rolling

  const handleRollDice = (playerIndex) => {
    setRollingPlayer(playerIndex); // Start rolling animation
    setTimeout(() => {
      onRollDice(playerIndex); // Roll the dice after animation
      setRollingPlayer(null); // Stop rolling animation
    }, 1000); // Matches animation duration in Dice3D
  };

  return (
    <div className="gamePlayers">
      <div className="playersBox">
        {players.slice(0, playersCount).map((player, index) => (
          <div key={index} className="playerCard" id={`playerCard${index + 1}`}>
            <div className="level1">
              <img
                src={`/images/avatars/${player.image}.png`}
                id={`avatar${index + 1}`}
                alt={player.name}
              />
              <div
                id={`dice${index + 1}`}
                className={`diceBox ${currentPlayer !== index + 1 ? "opacity-50" : ""}`}
                onClick={() => handleRollDice(index + 1)}
              >
                <Dice3D
                  currentNumber={player.lastDice || 1}
                  rolling={rollingPlayer === index + 1} // Animate only for the rolling player
                  potColor={player.potColor} // Pass pot color to Dice3D
                />
              </div>
            </div>
            <div className="level2">
              <div id={`displayName${index + 1}`}>{player.name}</div>
              <div className="pointsDisplay">Points: {player.points}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
