import React, { useState, useEffect } from 'react';
import './App.css';

// Define the game constants
const BOARD_SIZE = 3;
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [board, setBoard] = useState(Array(BOARD_SIZE * BOARD_SIZE).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  // Check for a winner or a draw
  useEffect(() => {
    const calculateWinner = (squares) => {
      for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
        const [a, b, c] = WINNING_COMBINATIONS[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a];
        }
      }
      return squares.every(square => square) ? 'Draw' : null;
    };

    setWinner(calculateWinner(board));
  }, [board]);

  // Handle a click on a square
  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  // Restart the game
  const handleRestart = () => {
    setBoard(Array(BOARD_SIZE * BOARD_SIZE).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <div className="game">
      <h1>Puma Protocol Game</h1>
      <div className="board">
        {board.map((square, index) => (
          <div
            key={index}
            className={`square ${square}`}
            onClick={() => handleClick(index)}
          >
            {square}
          </div>
        ))}
      </div>
      {winner && (
        <div className="winner">
          {winner === 'Draw' ? 'It\'s a draw!' : `Winner: ${winner}`}
        </div>
      )}
      <button className="restart" onClick={handleRestart}>
        Restart Game
      </button>
    </div>
  );
}

export default App;
