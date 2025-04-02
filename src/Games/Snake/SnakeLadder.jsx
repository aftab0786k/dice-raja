import React, { useState, useEffect } from 'react';
import { PlayerSelection } from './PlayerSelection';
import { PlayerSetup } from './PlayerSetup';
import { Game } from './Game';
import { INITIAL_PLAYERS, LADDERS, SNAKES } from './Constants';
import "./SnakeLadder.css";


const GAME_DURATION = 10 * 60; // 10 minutes in seconds

const INITIAL_STATE = {
  currentPlayer: 1,
  playersCount: 2,
  players: [...INITIAL_PLAYERS].map((player, index) => ({
    ...player,
    hasStarted: false,
    points: 0,
    score: 0,
    lastMovement: 0,
    lastDice: null,
    lastLadder: null,
    lastSnake: null,
    lastPosition: 0,
    potColor: ["redPot", "bluePot", "greenPot", "yellowPot", "purplePot", "orangePot", "blackPot"][index % 7] // Assign pot colors in sequence
  })),
  screen: 'select',
  winner: null,
  notification: null,
  timeRemaining: GAME_DURATION
};

function SnakeLadder() {
  const [gameState, setGameState] = useState(INITIAL_STATE);
  const [audioElements, setAudioElements] = useState({});
  const [timerActive, setTimerActive] = useState(false);
  const [matchId, setMatchId] = useState("");





  

  // Switch to the next player
  const switchPlayer = () => {
    setGameState(prev => ({
      ...prev,
      currentPlayer: (prev.currentPlayer % prev.playersCount) + 1
    }));
  };

  const resetGame = () => {
    setGameState(prev => ({
      ...prev,
      currentPlayer: 1,
      players: prev.players.map(player => ({
        ...player,
        score: 0,
        hasStarted: false,
        points: 0,
        lastDice: null,
        lastLadder: null,
        lastSnake: null,
        lastPosition: 0
      })),
      winner: null,
    }));
  };

  useEffect(() => {
    const audio = {
      drop: new Audio('/audio/drop.mp3'),
      ladder: new Audio('/audio/ladder.mp3'),
      snake: new Audio('/audio/snake.mp3'),
      dice: new Audio('/audio/dice.mp3'),
      success: new Audio('/audio/success.mp3'),
    };
    setAudioElements(audio);
  }, []);


  

  
  
  useEffect(() => {
    if (timerActive && gameState.timeRemaining > 0 && !gameState.winner) {
      const timer = setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          timeRemaining: Math.max(0, prev.timeRemaining - 1),
        }));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timerActive, gameState.timeRemaining]);
  




  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const showNotification = (message, type) => {
    setGameState(prev => ({
      ...prev,
      notification: { message, type }
    }));
    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        notification: null
      }));
    }, 2000);
  };

  const checkPlayerCollision = (finalPosition, currentPlayerNo) => {
    setGameState(prev => {
      const newPlayers = [...prev.players];
  
      // Find the player who just moved
      const movingPlayerIdx = currentPlayerNo - 1;
      const movingPlayer = newPlayers[movingPlayerIdx];
  
      // Special case: If collision happens at position 1 or the player has not yet started, skip collision logic
      if (finalPosition === 1 || !movingPlayer.hasStarted) {
        console.log(`Special case: Player ${currentPlayerNo} at position 1 or has not started, no collision handled.`);
        return prev; // No changes to state, return early
      }
  
      // Find if another player is already at the final position
      const collidingPlayerIdx = newPlayers.findIndex(
        (p, idx) => idx !== movingPlayerIdx && p.score === finalPosition && p.hasStarted
      );
  
      if (collidingPlayerIdx !== -1) {
        console.log(`Collision at position ${finalPosition}! Resolving collision...`);
  
        const collidingPlayer = newPlayers[collidingPlayerIdx];
  
        // Move colliding player to their last valid position or first ladder if points hit 0
        const previousValidPosition = movingPlayer.lastPosition || movingPlayer.startPosition;
        newPlayers[collidingPlayerIdx].score = previousValidPosition;
  
        // Adjust points
        newPlayers[movingPlayerIdx].points += 5; // Moving player gains 5 points
        newPlayers[collidingPlayerIdx].points = Math.max(0, newPlayers[collidingPlayerIdx].points - 5); // Ensure points never go below 0
  
        // Edge Case: If points reach 0, move player to first ladder position
        if (newPlayers[collidingPlayerIdx].points === 0) {
          const firstLadderStart = LADDERS[0][0]; // Assuming LADDERS is an array like [[start, end], ...]
          newPlayers[collidingPlayerIdx].score = firstLadderStart;
          console.log(`Player ${collidingPlayerIdx + 1} points hit 0! Moving to ladder at position ${firstLadderStart}`);
          showNotification(`Player ${collidingPlayerIdx + 1} moved to first ladder!`, 'info');
        }
  
        console.log(
          `Updated points: Player ${movingPlayerIdx + 1} points: ${newPlayers[movingPlayerIdx].points}, Player ${collidingPlayerIdx + 1} points: ${newPlayers[collidingPlayerIdx].points}`
        );
  
        showNotification('Collision resolved: Positions adjusted, points updated.', 'success');
      }
  
      return { ...prev, players: newPlayers }; // Update game state
    });
  };
  
    
  

  const movePlayerOneStep = async (playerNo, currentPosition, targetPosition) => {
    if (currentPosition >= targetPosition) {
      checkPlayerCollision(targetPosition, playerNo); // ✅ Check collision after stopping
      return;
    }
  
    await new Promise(resolve => setTimeout(resolve, 300));
    audioElements.drop?.play();
  
    setGameState(prev => {
      const newPlayers = [...prev.players];
      newPlayers[playerNo - 1].score = currentPosition + 1;
      newPlayers[playerNo - 1].lastMovement = Date.now();
      console.log(`Player ${playerNo} moved to position ${currentPosition + 1}`);
      return { ...prev, players: newPlayers };
    });
  
    await movePlayerOneStep(playerNo, currentPosition + 1, targetPosition);
  };
  
  
  const movePlayer = async (playerNo, diceNumber) => {
    const player = gameState.players[playerNo - 1];
    const startPosition = player.score;
    const endPosition = startPosition + diceNumber;
    const lastPosition = player.lastPosition; // Track last position
  
    console.log(`Move player ${playerNo}: startPosition=${startPosition}, endPosition=${endPosition}, lastPosition=${lastPosition}`);
  
    if (endPosition <= 100) {
      await movePlayerOneStep(playerNo, startPosition, endPosition);
  
      // Update points correctly using functional state update
      setGameState(prev => {
        const newPlayers = [...prev.players];
  
        // Ensure points increase only by diceNumber
        if (endPosition !== lastPosition) {
          newPlayers[playerNo - 1] = {
            ...newPlayers[playerNo - 1],
            points: newPlayers[playerNo - 1].points + diceNumber, // Correct points update
            lastPosition: endPosition, // Update last position
          };
        }
  
        console.log(`Player ${playerNo} rolled a ${diceNumber}, moving to position ${endPosition}`);
        console.log(`Player ${playerNo} points: ${newPlayers[playerNo - 1].points}`);
  
        return { ...prev, players: newPlayers };
      });
  
      showNotification(`+${diceNumber} points!`, 'success');
  
      if (endPosition === 100) {
        audioElements.success?.play();
        setGameState(prev => ({
          ...prev,
          winner: prev.players[playerNo - 1],
        }));
        setTimeout(() => {
          alert(`🎉 Congratulations ${player.name}! You won the match! 🎉`);
        }, 500);
        
  
        console.log(`Player ${playerNo} won the game!`);
        return true;
      }
  
      // Check for ladders and snakes after movement
      await checkLadderAndSnake(endPosition, playerNo);
    }
    return false;
  };
    

  const checkLadderAndSnake = async (position, playerNumber) => {
    // Check ladders
    for (let i = 0; i < LADDERS.length; i++) {
      if (LADDERS[i][0] === position) {
        audioElements.ladder?.play();
        setGameState(prev => {
          const newPlayers = [...prev.players];
          newPlayers[playerNumber - 1].points += 5;
          return { ...prev, players: newPlayers };
        });
        showNotification('+5 points! Climbed a ladder!', 'success');
        for (const pos of LADDERS[i]) {
          await new Promise(resolve => setTimeout(resolve, 400));
          setGameState(prev => {
            const newPlayers = [...prev.players];
            newPlayers[playerNumber - 1].score = pos;
            return { ...prev, players: newPlayers };
          });
        }
        checkPlayerCollision(LADDERS[i][LADDERS[i].length - 1], playerNumber);
        return;
      }
    }

    // Check snakes
    for (let i = 0; i < SNAKES.length; i++) {
      if (SNAKES[i][0] === position) {
        audioElements.snake?.play();
        setGameState(prev => {
          const newPlayers = [...prev.players];
          newPlayers[playerNumber - 1].points -= 5;
          return { ...prev, players: newPlayers };
        });
        showNotification('-5 points! Snake bite!', 'error');
        for (const pos of SNAKES[i]) {
          await new Promise(resolve => setTimeout(resolve, 400));
          setGameState(prev => {
            const newPlayers = [...prev.players];
            newPlayers[playerNumber - 1].score = pos;
            return { ...prev, players: newPlayers };
          });
        }
        checkPlayerCollision(SNAKES[i][SNAKES[i].length - 1], playerNumber);
      }
    }
  };




  const rollDice = async (playerNo) => {
    if (playerNo !== gameState.currentPlayer) return;
  
    if (!timerActive) {
      setTimerActive(true);
    }
  
    audioElements.dice?.play();
    const diceNumber = Math.floor(Math.random() * 6) + 1;
  
    setGameState((prev) => {
      const newPlayers = [...prev.players];
      newPlayers[playerNo - 1].lastDice = diceNumber;
      console.log(`Player ${playerNo} rolled a ${diceNumber}`);
      return { ...prev, players: newPlayers };
    });
  
    await new Promise(resolve => setTimeout(resolve, 1000));
  
    const player = gameState.players[playerNo - 1];
    let gameWon = false;
  
    if (!player.hasStarted && diceNumber === 1) {
      setGameState((prev) => {
        const newPlayers = [...prev.players];
        newPlayers[playerNo - 1].hasStarted = true;
        newPlayers[playerNo - 1].score = 1;
        console.log(`Player ${playerNo} has started the game.`);
        return { ...prev, players: newPlayers };
      });
    } else if (player.hasStarted) {
      gameWon = await movePlayer(playerNo, diceNumber);
    }
  
    if (!gameWon) {
      setGameState(prev => ({
        ...prev,
        currentPlayer: (playerNo % prev.playersCount) + 1, // No extra turn for rolling a 6
      }));
    }
  };
    
  const selectPlayers = (count) => {
    setGameState(prev => ({ ...prev, playersCount: count }));
  };

  const updateProfile = (playerNo, direction) => {
    setGameState(prev => {
      const newPlayers = [...prev.players];
      const player = newPlayers[playerNo - 1];
      if (direction === 1) {
        player.image = (player.image + 1) % 8;
      } else {
        player.image = player.image === 0 ? 7 : (player.image - 1) % 8;
      }
      return { ...prev, players: newPlayers };
    });
  };

  const handleNameChange = (playerNo, name) => {
    setGameState(prev => {
      const newPlayers = [...prev.players];
      newPlayers[playerNo - 1].name = name;
      return { ...prev, players: newPlayers };
    });
  };

  const renderScreen = () => {
    switch (gameState.screen) {
      case 'select':
        return (
          <PlayerSelection
            playersCount={gameState.playersCount}
            onSelectPlayers={selectPlayers}
            onStart={() => setGameState(prev => ({ ...prev, screen: 'setup' }))}
            matchId={matchId}
            setMatchId={setMatchId}
          />
        );
      case 'setup':
        return (
          <PlayerSetup
            players={gameState.players}
            playersCount={gameState.playersCount}
            onUpdateProfile={updateProfile}
            onNameChange={handleNameChange}
            onNext={() => setGameState(prev => ({ ...prev, screen: 'game' }))}
            onBack={() => setGameState(prev => ({ ...prev, screen: 'select' }))}
            matchId={matchId}
            setMatchId={setMatchId}
          />
        );
      case 'game':
        return (
          <Game
            players={gameState.players}
            playersCount={gameState.playersCount}
            currentPlayer={gameState.currentPlayer}
            winner={gameState.winner}
            onRollDice={rollDice}
            onNewGame={() => {
              setTimerActive(false);
              setGameState(INITIAL_STATE);
            }}
            timeRemaining={formatTime(gameState.timeRemaining)}
            switchPlayer={switchPlayer}
            scores={gameState.players.map(player => player.points)}
            resetGame={resetGame}
            showPopup={showNotification}
            matchId={matchId}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="screen" id={`screen${gameState.screen === 'select' ? '1' : gameState.screen === 'setup' ? '2' : '3'}`}>
      {gameState.notification && (
        <div className={`notification ${gameState.notification.type}`}>
          {gameState.notification.message}
        </div>
      )}
      {renderScreen()}
    </div>
  );
}

export default SnakeLadder;