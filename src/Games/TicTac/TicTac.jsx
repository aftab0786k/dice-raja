// Filename: TicTac.jsx
import React, { useCallback, useEffect, useRef, useState } from "react";
import Dice3D from "./Dice3D"; // Assuming Dice3D.jsx is in the same directory
import "./TicTac.css"; // Assuming TicTac.css is the version BEFORE UI restructuring

// --- Constants ---
const INITIAL_GAME_TIME = 360; // 6 minutes
const INITIAL_TURN_TIME = 10; // 10 seconds TOTAL per turn
const POINTS_PENALTY_TIMEOUT_ACTION = -5; // ** Penalty for ANY turn timeout **
const MAX_CONSECUTIVE_SKIPS = 3;
const OCCUPIED_CELL_DISPLAY_DELAY = 1500; // Milliseconds to show occupied/bonus result before switching
const WIN_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Columns
  [0, 4, 8],
  [2, 4, 6], // Diagonals
];

const TicTac = () => {
  // *** 1. State Hooks FIRST ***
  const [playerNames, setPlayerNames] = useState({
    player1: "Player 1",
    player2: "Player 2",
  });
  const [showNamePopup, setShowNamePopup] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null); // 1, 2, or 'draw'
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [scores, setScores] = useState([0, 0]);
  const [cells, setCells] = useState(Array(9).fill(null)); // null, 1 (Player 1), or 2 (Player 2)
  const [diceResult, setDiceResult] = useState(null); // The raw number rolled (1-6)
  const [effectiveDiceValue, setEffectiveDiceValue] = useState(0); // The cell number player *needs* to interact with (1-9)
  const [rolledSix, setRolledSix] = useState(false); // Flag for Roll 6 choice state
  const [isExtraTurn, setIsExtraTurn] = useState(false); // Flag for extra turn after rolling 6
  const [canMarkCell, setCanMarkCell] = useState(false); // Flag: Is the player allowed to click a cell?
  const [consecutiveSkips, setConsecutiveSkips] = useState([0, 0]);
  const [gameTimer, setGameTimer] = useState(INITIAL_GAME_TIME);
  const [turnTimer, setTurnTimer] = useState(INITIAL_TURN_TIME);
  const [rolling, setRolling] = useState(false); // Dice animation state
  const [diceDisabled, setDiceDisabled] = useState(true); // Dice interaction state (initially disabled until game starts)
  const [popupMessage, setPopupMessage] = useState("");

  // *** 2. Ref Hooks ***
  const turnTimerIntervalRef = useRef(null);
  const gameTimerIntervalRef = useRef(null);
  const popupTimeoutRef = useRef(null);
  const switchPlayerTimeoutRef = useRef(null); // Ref for the occupied cell / bonus point delay timeout
  const diceSoundRef = useRef(null);
  const markSoundRef = useRef(null);
  const winSoundRef = useRef(null);
  const loseSoundRef = useRef(null);
  const popupSoundRef = useRef(null);
  const errorSoundRef = useRef(null);

  // *** 3. Helper Functions (Simple ones) ***
  const playSound = useCallback((audioRef) => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current
        .play()
        .catch((e) => console.error("Audio play failed:", e));
    }
  }, []); // No dependencies

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }; // Pure function

  // *** 4. useCallback Definitions (ORDER MATTERS!) ***

  const showPopup = useCallback(
    (message, duration = 3000, isError = false) => {
      console.log("POPUP:", message);
      setPopupMessage(message);
      playSound(isError ? errorSoundRef : popupSoundRef); // playSound is stable
      clearTimeout(popupTimeoutRef.current);
      popupTimeoutRef.current = setTimeout(() => setPopupMessage(""), duration);
    },
    [playSound] // Dependency: playSound
  );

  // ** Allows negative scores **
  const updateScore = useCallback((player, points, reason = "") => {
    setScores((prevScores) => {
      const newScores = [...prevScores];
      newScores[player - 1] = newScores[player - 1] + points; // Allow negative scores
      console.log(
        `SCORE UPDATE: Player ${player} ${
          points >= 0 ? "+" : ""
        }${points} points. Reason: ${reason || "N/A"}. New Score: ${
          newScores[player - 1]
        }`
      );
      return newScores;
    });
  }, []); // No dependencies

  const checkWinner = useCallback((currentCells) => {
    for (const combo of WIN_COMBOS) {
      const [a, b, c] = combo;
      if (
        currentCells[a] &&
        currentCells[a] === currentCells[b] &&
        currentCells[a] === currentCells[c]
      ) {
        return currentCells[a];
      }
    }
    if (currentCells.every((cell) => cell !== null)) return "draw";
    return null;
  }, []); // WIN_COMBOS is stable

  // Define switchPlayer early
  const switchPlayer = useCallback(() => {
    if (gameOver) return;
    clearTimeout(switchPlayerTimeoutRef.current); // Clear delay timeout on switch
    const nextPlayer = currentPlayer === 1 ? 2 : 1;
    console.log(
      `--- Switching player to Player ${nextPlayer} (${
        playerNames[nextPlayer === 1 ? "player1" : "player2"]
      }) ---`
    );
    setCurrentPlayer(nextPlayer);
    setDiceResult(null); // Clear dice on switch
    setEffectiveDiceValue(0);
    setRolledSix(false);
    setIsExtraTurn(false);
    setCanMarkCell(false);
    setDiceDisabled(false);
    // Timer reset handled by useEffect watching currentPlayer
  }, [currentPlayer, gameOver, playerNames]); // Dependencies: State and props

  // Define endGame - Depends on showPopup, playSound, state
  const endGame = useCallback(
    (winnerPlayer, reason) => {
      if (gameOver) return;
      console.log(
        `GAME OVER: Triggered. Winner Candidate: ${winnerPlayer}, Reason: ${reason}`
      );
      setGameOver(true);
      setDiceDisabled(true);
      setCanMarkCell(false);
      setRolledSix(false);
      setIsExtraTurn(false);
      clearInterval(turnTimerIntervalRef.current);
      clearInterval(gameTimerIntervalRef.current);
      clearTimeout(switchPlayerTimeoutRef.current); // Clear delay timeout

      let finalWinner = null;
      let message = "";
      const player1Name = playerNames.player1;
      const player2Name = playerNames.player2;
      const finalScores = scores; // Read latest scores

      if (reason === "winning combination") finalWinner = winnerPlayer;
      else if (reason === "time up") {
        if (finalScores[0] > finalScores[1]) finalWinner = 1;
        else if (finalScores[1] > finalScores[0]) finalWinner = 2;
        else finalWinner = "draw";
      } else if (reason === "3 consecutive skips")
        finalWinner = currentPlayer === 1 ? 2 : 1;
      else if (reason === "board full") {
        if (finalScores[0] > finalScores[1]) finalWinner = 1;
        else if (finalScores[1] > finalScores[0]) finalWinner = 2;
        else finalWinner = "draw";
        reason = "board full, decided by score";
      }

      setWinner(finalWinner);

      let winnerName =
        finalWinner === 1 ? player1Name : finalWinner === 2 ? player2Name : "";

      if (finalWinner === "draw") {
        message = `Game Over! It's a Draw. Reason: ${reason}. Final Scores: ${player1Name} ${finalScores[0]} - ${player2Name} ${finalScores[1]}.`;
        playSound(loseSoundRef); // Stable
      } else if (finalWinner) {
        message = `Game Over! Congratulations ${winnerName} (Player ${finalWinner})! You won! Reason: ${reason}. Final Scores: ${player1Name} ${finalScores[0]} - ${player2Name} ${finalScores[1]}.`;
        playSound(winSoundRef); // Stable
      } else {
        message = `Game Over! Reason: ${reason}. Final Scores: ${player1Name} ${finalScores[0]} - ${player2Name} ${finalScores[1]}.`;
        playSound(loseSoundRef); // Stable
      }
      showPopup(message, 6000); // Stable
    },
    [gameOver, scores, playerNames, currentPlayer, showPopup, playSound]
  ); // Dependencies

  // Define handleTurnTimeout - Depends on endGame, switchPlayer, updateScore, showPopup
  // ** PENALTY FIX: Apply -5 penalty for ANY timeout condition **
  const handleTurnTimeout = useCallback(() => {
    if (gameOver) return;
    const timedOutPlayer = currentPlayer;
    console.log(`TIMEOUT: Player ${timedOutPlayer} turn timer expired.`);

    // ** ALWAYS apply penalty on timeout **
    const penalty = POINTS_PENALTY_TIMEOUT_ACTION;
    let skipReason = "";
    let incrementSkip = true;

    clearTimeout(switchPlayerTimeoutRef.current); // Clear any pending delayed switch

    // Determine reason for logging/message, clear relevant state
    if (canMarkCell) {
      skipReason = "failed to mark cell in time";
      setCanMarkCell(false);
      setEffectiveDiceValue(0);
    } else if (rolledSix) {
      skipReason = "failed to choose Roll 6 action in time";
      setRolledSix(false);
    } else {
      // Didn't roll
      skipReason = "failed to complete turn in time"; // General reason
    }

    // Apply penalty score update
    updateScore(timedOutPlayer, penalty, `Turn Timeout (${skipReason})`); // Stable

    // Show popup message including penalty
    showPopup(
      `Player ${timedOutPlayer} turn skipped (${skipReason}). ${penalty} points.`
    ); // Stable

    let gameEndedBySkips = false;
    // Always increment skip count on timeout
    if (incrementSkip) {
      setConsecutiveSkips((prevSkips) => {
        const newSkips = [...prevSkips];
        const playerIndexToUpdate = timedOutPlayer - 1;
        newSkips[playerIndexToUpdate]++;
        console.log(
          `TIMEOUT: Skips for Player ${timedOutPlayer} now ${newSkips[playerIndexToUpdate]}.`
        );
        if (newSkips[playerIndexToUpdate] >= MAX_CONSECUTIVE_SKIPS) {
          console.log(
            `TIMEOUT: Player ${timedOutPlayer} reached ${MAX_CONSECUTIVE_SKIPS} skips.`
          );
          gameEndedBySkips = true; // Set flag
          return newSkips;
        }
        return newSkips;
      });
    }

    // Use setTimeout to check flag *after* state update might have occurred
    setTimeout(() => {
      if (gameEndedBySkips) {
        setGameOver((currentGameOver) => {
          if (!currentGameOver) {
            endGame(timedOutPlayer === 1 ? 2 : 1, "3 consecutive skips"); // Stable
            return true;
          }
          return currentGameOver;
        });
      } else if (!gameOver) {
        // Check latest state again before switching
        switchPlayer(); // Stable
      }
    }, 0);
  }, [
    gameOver,
    currentPlayer,
    rolledSix,
    canMarkCell,
    updateScore,
    showPopup,
    consecutiveSkips,
    endGame,
    switchPlayer,
  ]); // Dependencies adjusted

  // Define startTurnInterval - Depends on gameOver, handleTurnTimeout
  const startTurnInterval = useCallback(() => {
    clearInterval(turnTimerIntervalRef.current);
    turnTimerIntervalRef.current = setInterval(() => {
      setTurnTimer((t) => {
        if (t > 1) {
          return t - 1;
        } else {
          clearInterval(turnTimerIntervalRef.current);
          if (!gameOver) {
            // Check state directly
            handleTurnTimeout(); // Stable
          }
          return 0;
        }
      });
    }, 1000);
  }, [gameOver, handleTurnTimeout]); // Dependencies

  // Define resetTurnTimer - Depends on gameStarted, gameOver, currentPlayer, startTurnInterval
  const resetTurnTimer = useCallback(
    (time = INITIAL_TURN_TIME) => {
      console.log(`resetTurnTimer called. Setting display to ${time}s.`);
      clearInterval(turnTimerIntervalRef.current);
      setTurnTimer(time);
      if (gameStarted && !gameOver) {
        // Check state directly
        console.log(
          `resetTurnTimer: Starting new interval for Player ${currentPlayer}.`
        );
        startTurnInterval(); // Stable
      } else {
        console.log(
          `resetTurnTimer: Interval NOT started (gameStarted=${gameStarted}, gameOver=${gameOver})`
        );
      }
    },
    [gameStarted, gameOver, currentPlayer, startTurnInterval]
  ); // Dependencies

  // Define markCell - Depends on switchPlayer, endGame, updateScore, showPopup, checkWinner, playSound
  const markCell = useCallback(
    (indexToMark) => {
      if (
        gameOver ||
        indexToMark < 0 ||
        indexToMark > 8 ||
        cells[indexToMark] !== null
      ) {
        console.error(
          "Mark Cell Error: Invalid state or cell already occupied.",
          { gameOver, indexToMark, cellValue: cells[indexToMark] }
        );
        return;
      }
      clearTimeout(switchPlayerTimeoutRef.current);
      // Timer keeps running until switchPlayer
      playSound(markSoundRef); // Stable
      const newCells = [...cells];
      newCells[indexToMark] = currentPlayer;
      setCells(newCells);
      const pointsAwarded = indexToMark + 1;
      updateScore(currentPlayer, pointsAwarded, `Marked cell ${pointsAwarded}`); // Stable
      showPopup(
        `Player ${currentPlayer} marked cell ${pointsAwarded} (+${pointsAwarded} points)`
      ); // Stable
      setCanMarkCell(false); // Marking action complete
      setEffectiveDiceValue(0);
      // diceResult cleared by switchPlayer
      const winnerCheckResult = checkWinner(newCells); // Stable
      if (winnerCheckResult) {
        if (winnerCheckResult === "draw") endGame(null, "board full"); // Stable
        else endGame(winnerCheckResult, "winning combination"); // Stable
      } else {
        switchPlayer(); // Stable - Ends turn
      }
    },
    [
      gameOver,
      cells,
      currentPlayer,
      updateScore,
      showPopup,
      checkWinner,
      endGame,
      switchPlayer,
      playSound,
    ]
  ); // Dependencies

  // Define processDiceResult - Includes scoring change for own occupied cell
  const processDiceResult = useCallback(
    (rolledValue) => {
      if (gameOver) return;
      setDiceResult(rolledValue);
      console.log(`--- Processing Dice Result: ${rolledValue} ---`);
      let targetCellIndex = -1;
      let points = 0;
      let message = "";
      let proceedToSwitch = true;
      let allowMarking = false;
      let valueToMark = 0;
      let occupiedCell = false;
      let bonusPointsCase = false;

      clearTimeout(switchPlayerTimeoutRef.current);

      if (isExtraTurn) {
        const finalValue = 6 + rolledValue;
        valueToMark = finalValue;
        setIsExtraTurn(false); // Consume flag *before* potential async operations
        console.log(`EXTRA TURN: Rolled ${rolledValue}, sum is ${finalValue}`);
        if (finalValue > 9) {
          points = finalValue;
          message = `Rolled ${rolledValue} on extra turn (Sum ${finalValue} > 9). Bonus +${points} points!`;
          updateScore(
            currentPlayer,
            points,
            `Extra turn bonus (6+${rolledValue})`
          ); // Stable
          bonusPointsCase = true;
          proceedToSwitch = false;
        } else {
          targetCellIndex = finalValue - 1;
          const cellOwner = cells[targetCellIndex];
          if (cellOwner === currentPlayer) {
            // ** SCORING CHANGE: Gain points instead of losing **
            points = finalValue;
            message = `Rolled ${rolledValue} on extra turn (Sum ${finalValue}). Landed on own cell! +${points} points.`;
            updateScore(
              currentPlayer,
              points,
              `Landed on own cell ${finalValue} (extra)`
            ); // Stable
            occupiedCell = true;
            proceedToSwitch = false;
          } else if (cellOwner) {
            // Opponent's cell - Gain points
            points = finalValue;
            message = `Rolled ${rolledValue} on extra turn (Sum ${finalValue}). Landed on opponent's cell! +${points} points.`;
            updateScore(
              currentPlayer,
              points,
              `Landed on opponent's cell ${finalValue} (extra)`
            ); // Stable
            occupiedCell = true;
            proceedToSwitch = false;
          } else {
            // Unoccupied 7, 8, 9
            message = `Rolled ${rolledValue} on extra turn (Sum ${finalValue}). You can mark Cell ${finalValue}!`;
            proceedToSwitch = false;
            allowMarking = true;
          }
        }
      } else if (rolledValue === 6) {
        console.log("Rolled a 6. Presenting choices.");
        setRolledSix(true);
        setDiceDisabled(true);
        proceedToSwitch = false;
        message = `Rolled 6! Choose to Mark Cell 6 or take an Extra Turn.`;
      } else {
        // Normal roll 1-5
        valueToMark = rolledValue;
        targetCellIndex = rolledValue - 1;
        const cellOwner = cells[targetCellIndex];
        if (cellOwner === currentPlayer) {
          // ** SCORING CHANGE: Gain points instead of losing **
          points = rolledValue;
          message = `Rolled ${rolledValue}. Landed on own cell! +${points} points.`;
          updateScore(
            currentPlayer,
            points,
            `Landed on own cell ${rolledValue}`
          ); // Stable
          occupiedCell = true;
          proceedToSwitch = false;
        } else if (cellOwner) {
          // Opponent's cell - Gain points
          points = rolledValue;
          message = `Rolled ${rolledValue}. Landed on opponent's cell! +${points} points.`;
          updateScore(
            currentPlayer,
            points,
            `Landed on opponent's cell ${rolledValue}`
          ); // Stable
          occupiedCell = true;
          proceedToSwitch = false;
        } else {
          // Unoccupied 1-5
          message = `Rolled ${rolledValue}. You can mark Cell ${rolledValue}!`;
          proceedToSwitch = false;
          allowMarking = true;
        }
      }

      setEffectiveDiceValue(allowMarking ? valueToMark : 0);
      showPopup(message); // Stable

      // Handle state transitions AFTER showing result/popup
      if (occupiedCell || bonusPointsCase) {
        const reason = occupiedCell ? "Occupied cell" : "Bonus points";
        console.log(
          `PROCESS(${rolledValue}): ${reason}. Displaying result for ${OCCUPIED_CELL_DISPLAY_DELAY}ms before switching.`
        );
        setDiceDisabled(true);
        switchPlayerTimeoutRef.current = setTimeout(() => {
          console.log(
            `PROCESS(${rolledValue}): ${reason} delay finished. Switching player.`
          );
          switchPlayer(); // Stable
        }, OCCUPIED_CELL_DISPLAY_DELAY);
      } else if (allowMarking) {
        console.log(
          `PROCESS(${rolledValue}): Setting canMarkCell=true (value needed: ${valueToMark}), diceDisabled=true. Turn timer continues.`
        );
        setCanMarkCell(true);
        setDiceDisabled(true);
        // Timer continues running
      } else if (rolledSix) {
        console.log(
          `PROCESS(${rolledValue}): Waiting for Roll 6 choice. Turn timer continues.`
        );
        // Timer continues running
      } else {
        console.warn(
          `PROCESS(${rolledValue}): Reached end without explicit action. Logic gap?`
        );
      }
      console.log(`--- Finished Processing Dice Result: ${rolledValue} ---`);
    },
    [
      gameOver,
      isExtraTurn,
      cells,
      currentPlayer,
      updateScore,
      showPopup,
      switchPlayer,
      resetTurnTimer,
      rolledSix,
    ]
  ); // Dependencies

  // Define handleRoll6Choice - Includes scoring change for own occupied cell 6
  const handleRoll6Choice = useCallback(
    (choice) => {
      if (!rolledSix || gameOver) return;
      setRolledSix(false);
      clearTimeout(switchPlayerTimeoutRef.current);
      // Timer continues running

      if (choice === "mark") {
        console.log("Roll 6 Choice: Mark Cell 6");
        const cellIndex = 5;
        const cellValue = 6;
        const currentCellOwner = cells[cellIndex]; // Check current state

        // Logic assumes button was only rendered if cell was null originally.
        // Re-check just in case, but primarily expect to mark.
        if (currentCellOwner === null) {
          setEffectiveDiceValue(cellValue);
          markCell(cellIndex); // Handles switch
        } else {
          // ** SCORING CHANGE: Gain points if own, Gain points if opponent's **
          const points = cellValue;
          const reasonPrefix =
            currentCellOwner === currentPlayer ? "own" : "opponent's";
          updateScore(
            currentPlayer,
            points,
            `Tried to mark ${reasonPrefix} cell 6`
          ); // Stable
          showPopup(`Cell 6 was ${reasonPrefix}! +${points} points.`); // Stable
          setDiceDisabled(true);
          switchPlayerTimeoutRef.current = setTimeout(() => {
            switchPlayer(); // Stable
          }, OCCUPIED_CELL_DISPLAY_DELAY);
        }
      } else if (choice === "extra_turn") {
        console.log("Roll 6 Choice: Extra Turn");
        setIsExtraTurn(true);
        setDiceResult(null);
        setDiceDisabled(false);
        resetTurnTimer(); // Start timer *for the extra roll*
        showPopup("Chosen Extra Turn! Roll again!"); // Stable
      }
    },
    [
      rolledSix,
      gameOver,
      cells,
      currentPlayer,
      updateScore,
      showPopup,
      switchPlayer,
      markCell,
      resetTurnTimer,
    ]
  ); // Dependencies

  // Define rollDice - Depends on processDiceResult, showPopup, playSound
  const rollDice = useCallback(() => {
    if (
      rolling ||
      diceDisabled ||
      gameOver ||
      rolledSix ||
      !gameStarted ||
      canMarkCell
    ) {
      // ... (warning logic) ...
      console.warn("Roll Dice Blocked:", {
        rolling,
        diceDisabled,
        gameOver,
        rolledSix,
        gameStarted,
        canMarkCell,
      });
      let reason = "";
      if (rolling) reason = "Animation in progress.";
      else if (gameOver) reason = "Game is over.";
      else if (rolledSix) reason = "Choose Roll 6 action first.";
      else if (canMarkCell) reason = "Mark your cell first.";
      else if (!gameStarted) reason = "Game hasn't started.";
      else if (diceDisabled) reason = "Dice currently disabled.";
      showPopup(`Cannot roll now. ${reason}`, 2000, true); // Stable
      playSound(errorSoundRef); // Stable
      return;
    }
    const playerRolling = currentPlayer;
    console.log(`ROLL DICE: Player ${playerRolling} initiated roll.`);
    playSound(diceSoundRef); // Stable
    setRolling(true);
    setDiceDisabled(true);
    setDiceResult(null);
    clearTimeout(switchPlayerTimeoutRef.current);
    setConsecutiveSkips((prev) => {
      const newSkips = [...prev];
      if (newSkips[playerRolling - 1] > 0) {
        console.log(
          `ROLL DICE: Resetting skips for Player ${playerRolling} from ${
            newSkips[playerRolling - 1]
          } to 0.`
        );
      }
      newSkips[playerRolling - 1] = 0;
      return newSkips;
    });
    // Timer continues running
    setTimeout(() => {
      const roll = Math.floor(Math.random() * 6) + 1;
      console.log(`ROLL DICE: Player ${playerRolling} rolled a ${roll}`);
      setRolling(false);
      setDiceDisabled(false); // Re-enable dice visually
      processDiceResult(roll); // Stable
    }, 1000);
  }, [
    rolling,
    diceDisabled,
    gameOver,
    rolledSix,
    gameStarted,
    canMarkCell,
    currentPlayer,
    processDiceResult,
    showPopup,
    playSound,
  ]); // Dependencies

  // Define handleCellClick - Depends on markCell, showPopup, playSound
  const handleCellClick = useCallback(
    (index) => {
      console.log(`--- Cell Click Attempt: Index ${index} ---`);
      if (index === 0 || index === 6) {
        console.log(
          `CLICK(${index + 1}): Clicked Cell ${
            index + 1
          }. State: canMarkCell=${canMarkCell}, effectiveDiceValue=${effectiveDiceValue}, cell[${index}]=${
            cells[index] === null ? "Empty" : cells[index]
          }`
        );
      }
      if (gameOver || !canMarkCell || cells[index] !== null) {
        // ... (warning logic) ...
        let reason = "";
        if (gameOver) reason = "Game is over.";
        else if (!canMarkCell) reason = "Not time to mark a cell.";
        else if (cells[index] !== null)
          reason = `Cell ${index + 1} is already marked by Player ${
            cells[index]
          }.`;
        console.warn(`CLICK(${index}): Invalid Cell Click. Reason: ${reason}`);
        showPopup(`Invalid move. ${reason}`, 2000, true); // Stable
        playSound(errorSoundRef); // Stable
        return;
      }
      const requiredIndex = effectiveDiceValue - 1;
      if (index === requiredIndex) {
        if (index === 0 || index === 6)
          console.log(
            `CLICK(${
              index + 1
            }): Correct cell clicked (Index ${index} matches required for value ${effectiveDiceValue}). Proceeding to markCell(${index}).`
          );
        // Timer keeps running until turn ends via markCell -> switchPlayer
        clearTimeout(switchPlayerTimeoutRef.current);
        markCell(index); // Stable - ends turn
      } else {
        console.warn(
          `CLICK(${index}): Incorrect Cell Click. Clicked ${
            index + 1
          }, but need to mark ${effectiveDiceValue} (Index ${requiredIndex}).`
        );
        showPopup(
          `Incorrect cell. You must mark Cell ${effectiveDiceValue}.`,
          2000,
          true
        ); // Stable
        playSound(errorSoundRef); // Stable
      }
      console.log(`--- Finished Handling Cell Click: Index ${index} ---`);
    },
    [
      gameOver,
      canMarkCell,
      cells,
      effectiveDiceValue,
      markCell,
      showPopup,
      playSound,
    ]
  ); // Dependencies

  // Define resetGame - Depends only on playerNames state
  const resetGame = useCallback(() => {
    console.log("--- PLAY AGAIN / RESETTING GAME ---");
    clearInterval(turnTimerIntervalRef.current);
    clearInterval(gameTimerIntervalRef.current);
    clearTimeout(popupTimeoutRef.current);
    clearTimeout(switchPlayerTimeoutRef.current);

    setGameOver(false);
    setWinner(null);
    setCurrentPlayer(1);
    setScores([0, 0]);
    setCells(Array(9).fill(null));
    setDiceResult(null);
    setEffectiveDiceValue(0);
    setRolledSix(false);
    setIsExtraTurn(false);
    setCanMarkCell(false);
    setConsecutiveSkips([0, 0]);
    setGameTimer(INITIAL_GAME_TIME);
    setTurnTimer(INITIAL_TURN_TIME);
    setRolling(false);
    setPopupMessage("");
    setDiceDisabled(true);

    const p1 = playerNames.player1;
    const p2 = playerNames.player2;
    if (!p1 || p1 === "Player 1" || !p2 || p2 === "Player 2") {
      console.log("Reset: Player names not set, showing name popup.");
      setShowNamePopup(true);
      setGameStarted(false);
    } else {
      console.log("Reset: Player names exist, starting new game directly.");
      setShowNamePopup(false);
      setGameStarted(true);
      setDiceDisabled(false);
    }
  }, [playerNames]); // Dependency

  // Define handleNameSubmit - Depends on playerNames, showPopup, playSound
  const handleNameSubmit = useCallback(() => {
    const p1Name = playerNames.player1.trim();
    const p2Name = playerNames.player2.trim();
    if (!p1Name || !p2Name) {
      showPopup("Please enter names for both players.", 3000, true); // Stable
      playSound(errorSoundRef); // Stable
      return;
    }
    setPlayerNames({ player1: p1Name, player2: p2Name });
    setShowNamePopup(false);
    setGameStarted(true);
    setDiceDisabled(false);
    console.log(`Game starting with Player 1: ${p1Name}, Player 2: ${p2Name}`);
  }, [playerNames, showPopup, playSound]); // Dependencies

  // *** 5. useEffect Hooks (AFTER all useCallback definitions) ***

  // Effect for Audio Preload
  useEffect(() => {
    diceSoundRef.current = new Audio("/audio/dice.mp3");
    markSoundRef.current = new Audio("/audio/tick.mp3");
    winSoundRef.current = new Audio("/audio/win.mp3");
    loseSoundRef.current = new Audio("/audio/lose.mp3");
    popupSoundRef.current = new Audio("/audio/popup.mp3");
    errorSoundRef.current = new Audio("/audio/error.mp3");
    Object.values({
      diceSoundRef,
      markSoundRef,
      winSoundRef,
      loseSoundRef,
      popupSoundRef,
      errorSoundRef,
    }).forEach((ref) => {
      if (ref.current) ref.current.load();
    });
  }, []); // Runs once on mount

  // ** Effect only starts timer at turn beginning **
  useEffect(() => {
    if (gameStarted && !gameOver) {
      resetTurnTimer(); // resetTurnTimer is stable
    } else {
      clearInterval(turnTimerIntervalRef.current);
    }
    return () => {
      clearInterval(turnTimerIntervalRef.current);
    };
  }, [gameStarted, gameOver, currentPlayer, resetTurnTimer]);

  // Effect for Game Timer Management (Depends on stable endGame)
  useEffect(() => {
    if (gameStarted && !gameOver) {
      gameTimerIntervalRef.current = setInterval(() => {
        setGameTimer((t) => {
          if (t > 1) {
            return t - 1;
          } else {
            clearInterval(gameTimerIntervalRef.current);
            console.log("Game Timer: Time's up!");
            setGameOver((currentGameOverState) => {
              if (!currentGameOverState) {
                endGame(null, "time up");
                return true;
              } // Stable
              return currentGameOverState;
            });
            return 0;
          }
        });
      }, 1000);
    } else {
      clearInterval(gameTimerIntervalRef.current);
    }
    return () => {
      clearInterval(gameTimerIntervalRef.current);
    };
  }, [gameStarted, gameOver, endGame]); // Dependencies

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      clearTimeout(popupTimeoutRef.current);
      clearTimeout(switchPlayerTimeoutRef.current);
      clearInterval(turnTimerIntervalRef.current);
      clearInterval(gameTimerIntervalRef.current);
    };
  }, []);

  // *** 6. Render Logic (Using original UI structure) ***
  return (
    <div className="tic-tac-toe-ttd">
      {/* Name Input Popup */}
      {showNamePopup && (
        <div className="name-popup-ttd">
          {/* ... Name Popup JSX ... */}
          <h2 className="popup-title-ttd">Set Player Names</h2>
          <div className="popup-content-ttd">
            <div className="player-section-ttd">
              <label>
                {" "}
                Player 1 (X):
                <input
                  type="text"
                  className="name-input-ttd"
                  maxLength={15}
                  placeholder="Enter Player 1 Name"
                  value={
                    playerNames.player1 === "Player 1"
                      ? ""
                      : playerNames.player1
                  }
                  onChange={(e) =>
                    setPlayerNames((prev) => ({
                      ...prev,
                      player1: e.target.value || "Player 1",
                    }))
                  }
                  onKeyPress={(e) => e.key === "Enter" && handleNameSubmit()}
                />
              </label>
            </div>
            <div className="player-section-ttd">
              <label>
                {" "}
                Player 2 (O):
                <input
                  type="text"
                  className="name-input-ttd"
                  maxLength={15}
                  placeholder="Enter Player 2 Name"
                  value={
                    playerNames.player2 === "Player 2"
                      ? ""
                      : playerNames.player2
                  }
                  onChange={(e) =>
                    setPlayerNames((prev) => ({
                      ...prev,
                      player2: e.target.value || "Player 2",
                    }))
                  }
                  onKeyPress={(e) => e.key === "Enter" && handleNameSubmit()}
                />
              </label>
            </div>
          </div>
          <div className="popup-buttons-ttd">
            <button className="popup-button-ttd next" onClick={handleNameSubmit}>
              {" "}
              Start Game{" "}
            </button>
          </div>
        </div>
      )}

      {/* Main Game UI (Original Structure) */}
      {!showNamePopup && (
        <>
          <h1 className="header-ttd">Tic Tac Toe</h1> {/* Original Header */}
          {/* Original Status Container */}
          <div className="status-container-ttd">
            <div className="timer game-timer-ttd">
              Game Time:{" "}
              <span className={gameTimer <= 30 ? "text-red-600 font-bold" : ""}>
                {formatTime(gameTimer)}
              </span>
            </div>
            <div className="timer turn-timer-ttd">
              Turn Time:{" "}
              <span
                className={turnTimer <= 3 ? "text-orange-600 font-bold" : ""}
              >
                {turnTimer}s
              </span>
            </div>
          </div>
          <div className="game-container-ttd">
            {/* Original Grid Structure */}
            <div className="grid grid-cols-3 gap-4 bg-white/60 p-6 rounded-[20px] backdrop-blur-[10px] border-[10px] border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.3)]">
              {cells.map((cell, index) => {
                const isTargetCell = index === effectiveDiceValue - 1;
                const shouldHighlight = canMarkCell && isTargetCell && !cell;
                return (
                  <div
                    key={index}
                    className={`cell-ttd ${
                      cell === 1 ? "x" : cell === 2 ? "o" : ""
                    } ${cell ? "used" : ""} ${
                      shouldHighlight ? "highlight" : ""
                    }`}
                    onClick={
                      !gameOver && canMarkCell && !cell
                        ? () => handleCellClick(index)
                        : undefined
                    }
                  >
                    {cell === 1 ? "X" : cell === 2 ? "O" : index + 1}
                  </div>
                );
              })}
            </div>
          </div>
          {/* Original Players Structure */}
          <div className="players-ttd">
            <div
              className={`player player1-ttd ${
                currentPlayer === 1 && !gameOver ? "active" : ""
              }`}
            >
              {playerNames.player1} (X): {scores[0]} pts
              {consecutiveSkips[0] > 0 && (
                <span className="skips-ttd"> (Skips: {consecutiveSkips[0]})</span>
              )}
              {winner === 1 && <span className="winner-tag-ttd">🏆 Winner!</span>}
            </div>
            <div
              className={`player player2-ttd ${
                currentPlayer === 2 && !gameOver ? "active" : ""
              }`}
            >
              {playerNames.player2} (O): {scores[1]} pts
              {consecutiveSkips[1] > 0 && (
                <span className="skips-ttd"> (Skips: {consecutiveSkips[1]})</span>
              )}
              {winner === 2 && <span className="winner-tag-ttd">🏆 Winner!</span>}
            </div>
          </div>
          {/* Original Dice Interaction Area Structure */}
          <div className="dice-interaction-area-ttd">
            {/* Roll 6 Choice Buttons (Original Logic: Both always shown if rolledSix) */}
            {rolledSix && !gameOver && (
              <div className="roll-six-choice-ttd">
                <p>Player {currentPlayer}: Choose your action!</p>
                <button
                  onClick={() => handleRoll6Choice("mark")}
                  className="choice-button-ttd mark-button-ttd"
                >
                  {" "}
                  Mark Cell 6{" "}
                </button>
                <button
                  onClick={() => handleRoll6Choice("extra_turn")}
                  className="choice-button-ttd extra-turn-button-ttd"
                >
                  {" "}
                  Take Extra Turn{" "}
                </button>
              </div>
            )}

            {/* Dice Area */}
            <div className="dice-container-ttd">
              <div
                className={`dice-wrapper-ttd ${
                  rolling ? "rolling-animation" : ""
                } ${
                  diceDisabled ||
                  gameOver ||
                  rolledSix ||
                  !gameStarted ||
                  canMarkCell
                    ? "disabled"
                    : ""
                }`}
                onClick={rollDice}
              >
                <Dice3D currentNumber={diceResult} rolling={rolling} />
              </div>
            </div>

            {/* Action Prompt */}
            {/* JSX FIX: Corrected conditional rendering structure */}
            <div className="action-prompt-ttd">
              {
                gameOver ? (
                  winner ? (
                    winner === "draw" ? (
                      `Game Over - It's a Draw! (${playerNames.player1}: ${scores[0]}, ${playerNames.player2}: ${scores[1]})`
                    ) : (
                      `Game Over - ${
                        winner === 1 ? playerNames.player1 : playerNames.player2
                      } Wins! (${playerNames.player1}: ${scores[0]}, ${
                        playerNames.player2
                      }: ${scores[1]})`
                    )
                  ) : (
                    "Game Over!"
                  ) // Fallback if gameOver but no winner state (shouldn't happen)
                ) : gameStarted ? (
                  <span>
                    {rolledSix
                      ? `Player ${currentPlayer} (${
                          currentPlayer === 1
                            ? playerNames.player1
                            : playerNames.player2
                        }): Choose action for Roll 6!`
                      : isExtraTurn
                      ? `Player ${currentPlayer} (${
                          currentPlayer === 1
                            ? playerNames.player1
                            : playerNames.player2
                        }): Roll for Extra Turn!`
                      : canMarkCell
                      ? `Player ${currentPlayer} (${
                          currentPlayer === 1
                            ? playerNames.player1
                            : playerNames.player2
                        }): Mark Cell ${effectiveDiceValue}!`
                      : `Player ${currentPlayer} (${
                          currentPlayer === 1
                            ? playerNames.player1
                            : playerNames.player2
                        }): Roll the dice!`}
                  </span>
                ) : null /* Render nothing if game not started and not over */
              }
            </div>
          </div>
          {/* General Info Popup */}
          {popupMessage && (
            <div
              className={`popup game-popup-ttd ${
                popupMessage.includes("Invalid") ||
                popupMessage.includes("Cannot") ||
                popupMessage.includes("Incorrect") ||
                popupMessage.includes("points")
                  ? "error"
                  : ""
              }`}
            >
              {popupMessage}
            </div>
          )}
          {/* Reset Button */}
          {gameOver && (
            <button onClick={resetGame} className="reset-button-ttd">
              {" "}
              Play Again?{" "}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default TicTac;
