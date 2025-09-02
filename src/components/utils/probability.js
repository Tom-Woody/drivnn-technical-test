export default function calculateProbabilities(currentCard, remainingCards) {
  if (!currentCard || remainingCards <= 0) {
    return { suitMatch: 0, valueMatch: 0, either: 0 };
  }

  // Total cards in a full suit
  const totalInSuit = 13;
  
  // Total cards for a given value/rank
  const totalInValue = 4;

  // How many cards are left in the current suit?
  // (Minus the current card that’s already drawn)
  const suitLeft = totalInSuit - 1;

  // How many cards are left in the current value?
  const valueLeft = totalInValue - 1;

  // Probabilities
  const suitMatch = suitLeft / remainingCards;
  const valueMatch = valueLeft / remainingCards;

  // Combined probability (suit OR value)
  // No overlap since there’s only one copy of each card
  const either = suitMatch + valueMatch;

  return {
    suitMatch,
    valueMatch,
    either,
  };
}
