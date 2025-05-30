import React from 'react';
import './App.css';
import TicTacToeClassic from './TicTacToeClassic';

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
            <span style={{ opacity: 0.6, fontSize: "1rem" }}>Tic Tac Toe Classic</span>
          </div>
        </div>
      </nav>
      <main>
        <TicTacToeClassic />
      </main>
    </div>
  );
}

export default App;