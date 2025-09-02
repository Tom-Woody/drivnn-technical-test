import { useState, useEffect } from "react";
import DrawButton from "./components/DrawButton";
import CardDisplay from "./components/CardDisplay";
import MessageBanner from "./components/MessageBanner";
import ResultDisplay from "./components/ResultDisplay";
import ProbabilityDisplay from "./components/probabilityDisplay";
import GameOver from "./components/GameOver";
import "./App.css";

function App() {
  const [deckId, setDeckId] = useState("");
  const [currentCard, setCurrentCard] = useState(null);
  const [previousCard, setPreviousCard] = useState(null);
  const [remainingCards, setRemainingCards] = useState(52);
  const [message, setMessage] = useState("");
  const [buttonCount, setButtonCount] = useState(0);
  const [suitMatches, setSuitMatches] = useState(0);
  const [valueMatches, setValueMatches] = useState(0);

  useEffect(() => {
    const getDeck = async () => {
      try {
        const response = await fetch(
          "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
        );
        if (!response.ok) throw new Error(`Response status: ${response.status}`);
        const result = await response.json();
        setDeckId(result.deck_id);
      } catch (error) {
        console.error(error.message);
      }
    };

    getDeck();
  }, []);

    const restartGame = async () => {
    const url = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
    try {
      const response = await fetch(url);
      const result = await response.json();
      setDeckId(result.deck_id);

      setCurrentCard(null);
      setPreviousCard(null);
      setButtonCount(0);
      setRemainingCards(52);
      setMessage("");
      setSuitMatches(0);
      setValueMatches(0);
    } catch (err) {
      console.error(err);
    }
  };

  if (remainingCards <= 0) {
    return <GameOver 
      suitMatches={suitMatches} 
      valueMatches={valueMatches} 
      onRestart={restartGame} 
    />;
  }

  return (
    <>
      <MessageBanner
        message={message}
        setMessage={setMessage}
        currentCard={currentCard}
        previousCard={previousCard}
        suitMatches={suitMatches}
        valueMatches={valueMatches}
        setSuitMatches={setSuitMatches}
        setValueMatches={setValueMatches}
      />

      <CardDisplay
        buttonCount={buttonCount}
        currentCard={currentCard}
        previousCard={previousCard}
      />

      <DrawButton
        setButtonCount={setButtonCount}
        buttonCount={buttonCount}
        deckId={deckId}
        setPreviousCard={setPreviousCard}
        setCurrentCard={setCurrentCard}
        currentCard={currentCard}
        previousCard={previousCard}
        remainingCards={remainingCards}
        setRemainingCards={setRemainingCards}
      />

      <ResultDisplay
        suitMatches={suitMatches}
        setSuitMatches={setSuitMatches}
        valueMatches={valueMatches}
        setValueMatches={setValueMatches}
      />

      <ProbabilityDisplay
        currentCard={currentCard}
        remainingCards={remainingCards}
      />
    </>
  );
}

export default App;
