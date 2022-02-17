import React, { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";

const Square = (props) => (
  <button className="square" onClick={props.onClick}>
    {props.value}
  </button>
);

const Board = ({ squares, onClick }) => {
  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={() => onClick(i)} />;
  };

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

export const TicTacToe = ({ onWin }) => {
  const { sendMessage, lastMessage } = useWebSocket("ws://localhost:3000/api");

  const [state, setState] = useState({
    history: [
      {
        squares: Array(9).fill(null),
      },
    ],
    stepNumber: 0,
    xIsNext: true,
  });

  useEffect(() => {
    console.log(lastMessage);
    if (lastMessage != null) {
      if (lastMessage?.data) {
        const message = JSON.parse(lastMessage.data);
        switch (message.type) {
          case "init":
            console.log("Init game");
            break;
          case "play":
            setState(message.payload);
            break;
          default:
            break;
        }
      }
    }
  }, [lastMessage]);

  const handleClick = (i) => {
    const history = state.history.slice(0, state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = state.xIsNext ? "X" : "O";
    sendMessage(
      JSON.stringify({
        type: "play",
        payload: {
          history: history.concat([
            {
              squares: squares,
            },
          ]),
          stepNumber: history.length,
          xIsNext: !state.xIsNext,
        },
      })
    );
  };

  const jumpTo = (step) => {
    sendMessage(
      JSON.stringify({
        ...state,
        stepNumber: step,
        xIsNext: step % 2 === 0,
      })
    );
  };
  const history = state.history;
  const current = history[state.stepNumber];
  const winner = calculateWinner(current.squares);

  useEffect(() => {
    if (winner) {
      onWin();
    }
  }, [winner, onWin]);

  const moves = history.map((step, move) => {
    const desc = move ? "Go to move #" + move : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (state.xIsNext ? "X" : "O");
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

// ========================================

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
