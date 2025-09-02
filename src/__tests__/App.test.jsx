// src/__tests__/App.test.jsx
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import App from "../App";
import GameOver from "../components/GameOver";

describe("App Component", () => {
  beforeEach(() => {
    // Reset fetch mock before each test
    global.fetch = vi.fn();
  });

  test("fetches a new deck on mount", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        deck_id: "testdeck123",
        remaining: 52,
      }),
    });

    render(<App />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
      );
    });
  });

  test("renders child components", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, deck_id: "deck456", remaining: 52 }),
    });

    render(<App />);

    expect(await screen.findByRole("button", { name: /Draw Card/i })).toBeInTheDocument();
    expect(screen.getByText(/REMAINING CARDS/i)).toBeInTheDocument();
  });

  test("displays game over message when remainingCards is 0", () => {
    // Option 1: directly render GameOver component for isolated testing
    render(<GameOver suitMatches={2} valueMatches={3} />);

    expect(screen.getByText(/Game Over/i)).toBeInTheDocument();
    expect(screen.getByText(/All cards have been used/i)).toBeInTheDocument();
    expect(screen.getByText(/Suit Matches: 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Value Matches: 3/i)).toBeInTheDocument();
  });

  test("integration: drawing a card updates remaining cards", async () => {
    // Mock shuffle deck
    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, deck_id: "deck789", remaining: 52 }),
      })
      // Mock draw card
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          cards: [{ value: "7", suit: "SPADES", code: "7S" }],
          remaining: 51,
        }),
      });

    render(<App />);

    // Wait for initial fetch
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    // Click draw button
    await userEvent.click(screen.getByRole("button", { name: /Draw Card/i }));

    // Wait for second fetch and UI update
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(2);
      expect(screen.getByText(/REMAINING CARDS:51/i)).toBeInTheDocument();
    });
  });
});
