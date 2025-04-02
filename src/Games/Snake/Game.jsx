import React, { useState, useEffect, useRef } from 'react';
import { Board } from './Board';
import { GameControls } from './GameControls';
import { WinnerModal } from './WinnerModal';
import "./SnakeLadder.css";
import axios from 'axios';

export const Game = ({
  players,
  playersCount,
  currentPlayer,
  winner,
  onRollDice,
  onNewGame,
  switchPlayer,
  scores,
  resetGame,
  showPopup,
  matchId
}) => {
  const [timer, setTimer] = useState(600); // Main game timer
  const [turnTimer, setTurnTimer] = useState(10); // 10 seconds per turn
  const [round, setRound] = useState(1);
  const [cumulativeScores, setCumulativeScores] = useState(Array(playersCount).fill(0));
  const [gamePlayers, setGamePlayers] = useState([]);

  const turnIntervalRef = useRef(null);

  useEffect(() => {
    setGamePlayers(players.slice(0, playersCount).map(player => ({
      name: player.name,
      score: player.score
    })));
  }, [players, playersCount]);

  // Main game timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(interval);
          endGameDueToTimeout();
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Turn timer logic
  useEffect(() => {
    if (turnTimer === 0) {
      switchPlayer(); // Switch to the next player
      setTurnTimer(10); // Reset the timer
      return;
    }

    // Clear any existing interval
    if (turnIntervalRef.current) {
      clearInterval(turnIntervalRef.current);
    }

    // Set a new interval
    turnIntervalRef.current = setInterval(() => {
      setTurnTimer((prev) => prev - 1);
    }, 1000);

    // Cleanup interval on component unmount or turn change
    return () => {
      if (turnIntervalRef.current) {
        clearInterval(turnIntervalRef.current);
      }
    };
  }, [turnTimer, currentPlayer, switchPlayer]);

  const handleRollDice = (playerNo) => {
    onRollDice(playerNo); // Call the original dice roll handler
    setTurnTimer(10); // Reset the timer
    
    const currentPlayerIndex = playerNo - 1;
    const currentScore = scores[currentPlayerIndex]; // final destination from dice roll
    
    // Update gamePlayers: update current player's score and eliminate opponent only if on destination square
    const updatedGamePlayers = gamePlayers.map((player, index) => {
      if (index === currentPlayerIndex) {
        return { ...player, score: currentScore }; // update current player's position
      }
      // Eliminate opponent only if their stored score equals the landing square
      if (player.score === currentScore && currentScore !== 0) {
        return { ...player, score: 0 };
      }
      return player;
    });
    setGamePlayers(updatedGamePlayers);
  };

  useEffect(() => {
    if (winner) {
      const newCumulativeScores = cumulativeScores.map((score, index) => score + scores[index]);
      setCumulativeScores(newCumulativeScores);
      updateScore();
      if (round < 7) {
        setRound((prevRound) => prevRound + 1);
        resetGame();
        setGamePlayers([]);
      } else {
        endGameDueToRounds(newCumulativeScores);
      }
    }
  }, [winner]);

  const updateScore = async () => {
    // try {
    //   await axios.put(`http://localhost:5000/api/snakeladder/update-score/${matchId}`, {
    //     players: gamePlayers
    //   });
    // } catch (error) {
    //   console.error(`Error updating score:`, error);
    // }
  };

  const endGameDueToTimeout = () => {
    if (scores[0] > scores[1]) {
      showPopup(`Time's up! Player 1 wins this round with ${scores[0]} points!`, 0);
    } else if (scores[1] > scores[0]) {
      showPopup(`Time's up! Player 2 wins this round with ${scores[1]} points!`, 0);
    } else {
      showPopup(`Time's up! It's a draw for this round!`, 0);
    }
    resetGameForNextRound();
  };

  const endGameDueToRounds = (cumulativeScores) => {
    const maxScore = Math.max(...cumulativeScores);
    const winningPlayers = cumulativeScores.reduce((winners, score, index) => {
      if (score === maxScore) winners.push(index + 1);
      return winners;
    }, []);

    if (winningPlayers.length === 1) {
      showPopup(`Game over! Player ${winningPlayers[0]} wins with ${maxScore} points!`, 0);
    } else {
      showPopup(`Game over! It's a draw between players ${winningPlayers.join(' and ')} with ${maxScore} points!`, 0);
    }
    resetGame(); // Reset the game completely
  };

  const resetGameForNextRound = () => {
    setTimer(600); // Reset main timer
    setTurnTimer(10); // Reset turn timer
    resetGame(); // Reset game state
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="container">
      <div className="game-boxing relative">
        {winner && <WinnerModal winner={winner} onNewGame={onNewGame} matchId={matchId} gamePlayers={gamePlayers} updateScore={updateScore} />}
        <h2 className="text-center font-bold text-3xl text-black">Snake & Ladder</h2>

        <div className="timer text-center font-bold text-2xl">
  <span style={{ color: "black" }}>Time Remaining:</span> 
  <span className="text-red-600 font-bold"> {formatTime(timer)}</span>
</div>

      </div>
      <Board players={players} playersCount={playersCount} />
      <div className="turn-timer text-black text-center font-bold text-xl">
        Turn Time: <span className="text-black font-bold">{turnTimer} seconds</span>

      </div>
      <GameControls
        players={players}
        playersCount={playersCount}
        currentPlayer={currentPlayer}
        onRollDice={handleRollDice} // Use the new handler
        points={scores}
      />
    </div>
  );
};