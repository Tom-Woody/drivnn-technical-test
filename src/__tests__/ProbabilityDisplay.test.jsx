import React from "react";
import { render, screen } from "@testing-library/react";
import ProbabilityDisplay from "../components/probabilityDisplay";
import calculateProbabilities from "../components/utils/probability";

// Mock the probability calculation function
vi.mock("../components/utils/probability");

describe("ProbabilityDisplay Component", () => {
  beforeEach(() => {
    // Reset mock before each test
    calculateProbabilities.mockReset();
  });

  test("displays correct probabilities when a current card and remaining cards are provided", () => {
    // Mock return value
    calculateProbabilities.mockReturnValue({
      suitMatch: 0.25,
      valueMatch: 0.1,
      either: 0.32,
    });

    const currentCard = { suit: "hearts", value: "7" };
    const remainingCards = 51;

    render(
      <ProbabilityDisplay
        currentCard={currentCard}
        remainingCards={remainingCards}
      />
    );

    // Check that the probabilities are displayed correctly
    expect(screen.getByText("Suit Match Probability: 25.00%")).toBeInTheDocument();
    expect(screen.getByText("Value Match Probability: 10.00%")).toBeInTheDocument();
    expect(screen.getByText("Suit OR Value Match Probability: 32.00%")).toBeInTheDocument();
  });

  test("handles null currentCard gracefully", () => {
    // Mock return value when no current card
    calculateProbabilities.mockReturnValue({
      suitMatch: 0,
      valueMatch: 0,
      either: 0,
    });

    render(<ProbabilityDisplay currentCard={null} remainingCards={52} />);

    expect(screen.getByText("Suit Match Probability: 0.00%")).toBeInTheDocument();
    expect(screen.getByText("Value Match Probability: 0.00%")).toBeInTheDocument();
    expect(screen.getByText("Suit OR Value Match Probability: 0.00%")).toBeInTheDocument();
  });
});
