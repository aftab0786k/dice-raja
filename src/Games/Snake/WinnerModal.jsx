import React, { useEffect, useState } from 'react';
import "./SnakeLadder.css";
import axios from 'axios';

export const WinnerModal = ({ winner, onNewGame, matchId, updateScore }) => {
  const [gameWinner, setGameWinner] = useState({})
  // const w = { name: 'Player 2', image: 0, lastDice: 4, score: 100, lastMovement: 1741280938420 }
  // const { hasStarted, image, lastDice, lastMovement, name, points, score } = winner;
  useEffect(() => {
    setGameWinner({
      name: winner.name,
      score: winner.score
    })
    // updateScore()
    updateWinner()
   
  }, [winner])
  const updateWinner = async () => {
    // try {
    //   const response = await axios.put(`http://localhost:5000/api/snakeladder/winner/${matchId}`,
    //     { winner: { name: winner.name, score: winner.score } }
    //   )
    // } catch (error) {
    //   console.log(error)
    // }
  }
  console.log(winner)
  console.log(gameWinner)
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modalBody">
          <img src={`/images/avatars/${winner.image}.png`} alt={winner.name} />
          <h1>
            Congratulations! <span id="wname">{winner.name}</span>
          </h1>
          <p className="winner-points">You won with {winner.points} points! 🎉</p>
          <button className="startBtn" onClick={onNewGame}>
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};