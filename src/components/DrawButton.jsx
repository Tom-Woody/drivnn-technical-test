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
  if (!deckId || remainingCards <= 0) return;

  try {


    const drawResponse = await fetch(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    );
    if (!drawResponse.ok) throw new Error("Failed to draw card.");
    const drawResult = await drawResponse.json();
    const newCard = drawResult.cards[0];

    if (currentCard) {
      await fetch(
        `https://deckofcardsapi.com/api/deck/${deckId}/pile/discard/add/?cards=${currentCard.code}`
      );
    }

    setPreviousCard(currentCard);
    setCurrentCard(newCard);
    setRemainingCards(drawResult.remaining);
    setButtonCount(prev => prev + 1);

  } catch (err) {
    console.error(err);
  }
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
