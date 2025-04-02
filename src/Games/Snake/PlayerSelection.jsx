import React from 'react';
import "./SnakeLadder.css"

export const PlayerSelection = ({
  playersCount,
  onSelectPlayers,
  onStart,
}) => {
  // console.log(playersCount)
  return (
    <div className="s1-card">
      <h1>Snakes and Ladder Game</h1>
      <p className="subHeading">Rise Above the Snakes, Aim for the Ladders!</p>
      <div className="choose">
        {[2, 3, 4, 5, 6, 7].map((count) => (
          <div
            key={count}
            className={`selectBox ${playersCount === count ? 'selected' : ''}`}
            onClick={() => onSelectPlayers(count)}
          >
            <span>{count}</span>
            <span>Players</span>
          </div>
        ))}
      </div>
      <button className="startBtn" onClick={onStart}>START</button>
      <p className="info">Dice Raja</p>
    </div>
  );
};