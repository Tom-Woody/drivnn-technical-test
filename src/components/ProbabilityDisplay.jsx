import React from "react";
import calculateProbabilities from "./utils/probability";

function ProbabilityDisplay({ currentCard, remainingCards }) {
  // Calculate probabilities using the helper
  const { suitMatch, valueMatch, either } = calculateProbabilities(
    currentCard,
    remainingCards
  );

  return (
    <div className="probability-display">
      <h3>Next Card Probabilities</h3>
      <p>Suit Match Probability: {(suitMatch * 100).toFixed(2)}%</p>
      <p>Value Match Probability: {(valueMatch * 100).toFixed(2)}%</p>
      <p>Suit OR Value Match Probability: {(either * 100).toFixed(2)}%</p>
    </div>
  );
}

export default ProbabilityDisplay;
