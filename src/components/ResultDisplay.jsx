import React from 'react';

function ResultDisplay({ suitMatches, valueMatches }) {
  return (
    <div className="results-display">
      <div className="suit-matches">
        Suit matches: {suitMatches}
      </div>
      <div className="value-matches">
        Value matches: {valueMatches}
      </div>
    </div>
  );
}

export default ResultDisplay;
