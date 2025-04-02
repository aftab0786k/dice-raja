import React from 'react';
import { COLORS_POTS } from './Constants';

import "./SnakeLadder.css"

export const Board = ({ players, playersCount }) => {
  const drawBoard = () => {
    let content = [];
    let boxCount = 101;
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (i % 2 === 0) boxCount--;
        content.push(
          <div key={boxCount} className="box" id={`potBox${boxCount}`}>
            {players.map((player, index) => {
              if (index < playersCount && player.score === boxCount) {
                return (
                  <div key={index} className={`pot ${COLORS_POTS[index]}`}></div>
                );
              }
              return null;
            })}
          </div>
        );
        if (i % 2 !== 0) boxCount++;
      }
      boxCount -= 10;
    }
    return content;
  };

  return (
    <div className="boardArea">
      <div className="bigBoard">
        <img src="/images/board.png" className="board" alt="Snake and Ladders Board" />
        <div className="potsBoard">{drawBoard()}</div>
      </div>
    </div>
  );
};