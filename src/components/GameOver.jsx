import React from "react";

const GameOver = ({ suitMatches, valueMatches, onRestart }) => {
  return (
    <div className="game-over">
      <h2>Game Over!</h2>
      <p>All cards have been used.</p>
      <p>Your final score:</p>
      <ul>
        <li>Suit Matches: {suitMatches}</li>
        <li>Value Matches: {valueMatches}</li>
      </ul>
      {onRestart && (
        <button onClick={onRestart}>Restart Game</button>
      )}
    </div>
  );
};

export default GameOver;
