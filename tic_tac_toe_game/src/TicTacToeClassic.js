import React, { useState } from "react";

// Color palette from requirements
const COLORS = {
  primary: "#9234df",
  secondary: "#5e5e5e",
  accent: "#7accf5",
  bg: "#f9f9fa",
  x: "#9234df",
  o: "#7accf5",
  border: "#e0e0e0"
};

const initialBoard = () => Array(9).fill(null);

const WINNING_COMBOS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

// PUBLIC_INTERFACE
function TicTacToeClassic() {
  /**
   * Main container component for TicTacToe Classic.
   * Handles board state, win/draw detection, player turn, and UI logic.
   */
  const [board, setBoard] = useState(initialBoard());
  const [xIsNext, setXIsNext] = useState(true);
  const [status, setStatus] = useState("ongoing"); // "ongoing", "draw", "win"
  const [winner, setWinner] = useState(null);

  // Compute whose turn it is
  const currentPlayer = xIsNext ? "X" : "O";

  // PUBLIC_INTERFACE
  function handleCellClick(idx) {
    /**
     * Handles a click on a cell: update board, check for win/draw, update state.
     */
    if (status !== "ongoing" || board[idx]) return;
    const updated = board.slice();
    updated[idx] = currentPlayer;
    const outcome = getGameOutcome(updated);
    setBoard(updated);

    if (outcome === "win") {
      setStatus("win");
      setWinner(currentPlayer);
    } else if (outcome === "draw") {
      setStatus("draw");
      setWinner(null);
    } else {
      setXIsNext((prev) => !prev);
    }
  }

  // PUBLIC_INTERFACE
  function getGameOutcome(bd) {
    /**
     * Checks if the game has been won or drawn given a board state.
     */
    for (let combo of WINNING_COMBOS) {
      const [a, b, c] = combo;
      if (bd[a] && bd[a] === bd[b] && bd[a] === bd[c]) {
        return "win";
      }
    }
    if (bd.every(Boolean)) {
      return "draw";
    }
    return "ongoing";
  }

  // PUBLIC_INTERFACE
  function handleRestart() {
    /**
     * Resets the board to start a new game.
     */
    setBoard(initialBoard());
    setXIsNext(true);
    setStatus("ongoing");
    setWinner(null);
  }

  // PUBLIC_INTERFACE
  function renderStatus() {
    /**
     * Returns the current game status string.
     */
    if (status === "win") {
      return (
        <span style={{ color: COLORS.primary, fontWeight: 600 }}>
          Player {winner} wins!
        </span>
      );
    }
    if (status === "draw") {
      return (
        <span style={{ color: COLORS.secondary, fontWeight: 500 }}>
          It's a draw!
        </span>
      );
    }
    // Ongoing
    return (
      <span style={{ color: COLORS.secondary, fontWeight: 500 }}>
        Game in progress...
      </span>
    );
  }

  // Styling
  const wrapperStyle = {
    minHeight: "100vh",
    background: COLORS.bg,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const containerStyle = {
    background: "#fff",
    padding: "40px 32px",
    borderRadius: 16,
    boxShadow: "0 6px 40px 0 rgba(60,60,120,0.07)",
    minWidth: 320,
    maxWidth: 340,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 24,
  };
  const boardStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 68px)",
    gridTemplateRows: "repeat(3, 68px)",
    gap: 0,
    border: `2px solid ${COLORS.border}`,
    borderRadius: 12,
    overflow: "hidden",
    background: "#fafaff"
  };
  const cellStyle = (idx) => ({
    width: "68px",
    height: "68px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2.3rem",
    fontWeight: "700",
    cursor: board[idx] || status !== "ongoing" ? "not-allowed" : "pointer",
    color: board[idx] === "X" ? COLORS.x : board[idx] === "O" ? COLORS.o : COLORS.secondary,
    background: "#fff",
    border: getBorder(idx),
    userSelect: "none",
    outline: "none",
    transition: "background 0.16s"
  });
  function getBorder(idx) {
    // Borders for grid lines
    let b = "";
    if (Math.floor(idx / 3) < 2) b += `border-bottom: 2px solid ${COLORS.border};`;
    if (idx % 3 < 2) b += `border-right: 2px solid ${COLORS.border};`;
    return b;
  }
  const turnBoxStyle = {
    fontWeight: "600",
    fontSize: "1.2rem",
    letterSpacing: 0.5,
    marginBottom: 2,
    color: xIsNext ? COLORS.primary : COLORS.accent,
    minHeight: 32
  };
  const statusBoxStyle = {
    marginTop: 16,
    marginBottom: 12,
    fontSize: 18,
    minHeight: 32,
    textAlign: "center"
  };
  const restartBtnStyle = {
    backgroundColor: COLORS.primary,
    color: "#fff",
    fontWeight: "600",
    fontSize: "1.1rem",
    border: "none",
    borderRadius: 8,
    padding: "10px 32px",
    marginTop: 8,
    cursor: "pointer",
    boxShadow: "0 2px 8px 0 rgba(60,60,120,0.06)",
    transition: "background 0.15s"
  };

  return (
    <div style={wrapperStyle}>
      <div style={containerStyle} className="tictactoe-main-container-light">
        <div style={turnBoxStyle}>
          {status === "ongoing"
            ? <>Current turn: <span style={{color: xIsNext ? COLORS.primary : COLORS.accent}}>{currentPlayer}</span></>
            : null}
        </div>
        <div style={boardStyle} aria-label="Tic Tac Toe Board">
          {board.map((cell, idx) => (
            <button
              key={idx}
              style={cellStyle(idx)}
              className="ttt-cell-btn"
              aria-label={`cell ${idx + 1}${cell ? ' – ' + cell : ''}`}
              onClick={() => handleCellClick(idx)}
              disabled={!!cell || status !== "ongoing"}
            >
              {cell}
            </button>
          ))}
        </div>
        <div style={statusBoxStyle}>{renderStatus()}</div>
        <button
          style={restartBtnStyle}
          className="btn btn-large"
          aria-label="Restart Game"
          onClick={handleRestart}
        >
          Restart Game
        </button>
      </div>
    </div>
  );
}

export default TicTacToeClassic;
