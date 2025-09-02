import React from 'react';
import Card from './Card';

function CardDisplay({ previousCard, currentCard, buttonCount }) {
  return (
    <div className="card-container">
      <Card
        role="previous"
        dataTestId="card-previous"
        cardImage={previousCard ? previousCard.image : null}
        previousCard={previousCard}
        currentCard={currentCard}
        buttonCount={buttonCount}
      />
      <Card
        role="current"
        dataTestId="card-current"
        cardImage={currentCard ? currentCard.image : null}
        previousCard={previousCard}
        currentCard={currentCard}
        buttonCount={buttonCount}
      />
    </div>
  );
}

export default CardDisplay;
