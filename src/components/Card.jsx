import React from 'react';

function Card({ cardImage, previousCard, currentCard, buttonCount, role, dataTestId }) {
  const cardClass = `card ${!cardImage ? 'no-border' : ''}`;

  return (
    <div data-testid={dataTestId} className={cardClass}>
      {cardImage ? (
        <img src={cardImage} alt="card" />
      ) : (
        <div className="empty-card">?</div>
      )}
    </div>
  );
}

export default Card;
