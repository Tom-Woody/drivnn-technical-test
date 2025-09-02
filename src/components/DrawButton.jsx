import React, { useEffect } from "react";

function DrawButton({
  buttonCount,
  setButtonCount,
  deckId,
  setPreviousCard,
  setCurrentCard,
  currentCard,
  previousCard,
  setRemainingCards,
  remainingCards,
}) {
  const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`;
  const drawNewCard = async () => {
    if (!deckId) return;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const result = await response.json();
      const newCard = result.cards[0];

      setPreviousCard(currentCard);
      setCurrentCard(newCard);
      setRemainingCards(result.remaining);

    } catch (error) {
      console.error(error.message);
    }
    return;
  };

  const handleClick = () => {
    drawNewCard(); 
    setButtonCount((prev) => prev + 1);
  };

  return (
    <>
      <button
        onClick={handleClick}
        type="button"

      >
        Draw Card ({buttonCount})
      </button>
      <div className="remaining">
        REMAINING CARDS:
        {remainingCards}
      </div>
    </>
  );
}

export default DrawButton;
