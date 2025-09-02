// src/__tests__/DrawButton.test.jsx
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DrawButton from "../components/DrawButton";

describe("DrawButton Component", () => {
  beforeEach(() => {
    global.fetch = vi.fn(); // mock fetch
  });

  test("renders with initial button count", () => {
    render(
      <DrawButton
        buttonCount={0}
        setButtonCount={vi.fn()}
        deckId="testdeck"
        setPreviousCard={vi.fn()}
        setCurrentCard={vi.fn()}
        currentCard={null}
        previousCard={null}
        setRemainingCards={vi.fn()}
        remainingCards={52}
      />
    );

    expect(screen.getByText(/Draw Card \(0\)/)).toBeInTheDocument();
    expect(screen.getByText(/REMAINING CARDS:52/)).toBeInTheDocument();
  });

  test("calls fetch and updates state on button click", async () => {
    // Mock fetch response
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        cards: [{ value: "KING", suit: "HEARTS", code: "KH" }],
        remaining: 51,
      }),
    });

    const setButtonCount = vi.fn();
    const setPreviousCard = vi.fn();
    const setCurrentCard = vi.fn();
    const setRemainingCards = vi.fn();

    render(
      <DrawButton
        buttonCount={0}
        setButtonCount={setButtonCount}
        deckId="testdeck"
        setPreviousCard={setPreviousCard}
        setCurrentCard={setCurrentCard}
        currentCard={null}
        previousCard={null}
        setRemainingCards={setRemainingCards}
        remainingCards={52}
      />
    );

    await userEvent.click(screen.getByRole("button", { name: /Draw Card/ }));

    // Ensure fetch was called with the right URL
    expect(global.fetch).toHaveBeenCalledWith(
      "https://deckofcardsapi.com/api/deck/testdeck/draw/?count=1"
    );

    // Ensure state setters were called correctly
    await waitFor(() => {
      expect(setPreviousCard).toHaveBeenCalledWith(null);
      expect(setCurrentCard).toHaveBeenCalledWith({
        value: "KING",
        suit: "HEARTS",
        code: "KH",
      });
      expect(setRemainingCards).toHaveBeenCalledWith(51);
      expect(setButtonCount).toHaveBeenCalled();
    });
  });
});
