import React, { useEffect } from 'react'

function MessageBanner({ message, setMessage, currentCard, previousCard, setSuitMatches, setValueMatches, valueMatches, suitMatches}) {

  useEffect(() => {
    const resultHandler = () => {

      if (!currentCard || !previousCard) return;

      const valueMatch = 'SNAP VALUE'
      const suitMatch = 'SNAP SUIT'
      let valueMatchCount = valueMatches;
      let suitMatchCount = suitMatches;

      if(currentCard.value === previousCard.value) {
        setMessage(valueMatch)
        valueMatchCount++
        setValueMatches(valueMatchCount);

        
      }
      else if(currentCard.suit === previousCard.suit) {
        setMessage(suitMatch)
        suitMatchCount++
        setSuitMatches(suitMatchCount)
      }
      else {
        setMessage("")
        return;
      }
    }

    resultHandler();
  }, [currentCard])

  return (
<div
  data-testid="message-banner"
  className={
    message === "SNAP SUIT"
      ? "snap-suit"
      : message === "SNAP VALUE"
      ? "snap-value"
      : "" // fallback for no match
  }
>
  {message}
</div>
  )
}

export default MessageBanner