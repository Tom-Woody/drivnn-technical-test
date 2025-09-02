// src/__tests__/MessageBanner.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import MessageBanner from "../components/MessageBanner";

describe("MessageBanner Component", () => {
  let setMessageMock;
  let setSuitMatchesMock;
  let setValueMatchesMock;

  beforeEach(() => {
    setMessageMock = vi.fn();
    setSuitMatchesMock = vi.fn();
    setValueMatchesMock = vi.fn();
  });

  test("renders without crashing with no cards", () => {
    render(
      <MessageBanner
        message=""
        setMessage={setMessageMock}
        currentCard={null}
        previousCard={null}
        suitMatches={0}
        setSuitMatches={setSuitMatchesMock}
        valueMatches={0}
        setValueMatches={setValueMatchesMock}
      />
    );

    const banner = screen.getByTestId("message-banner");
    expect(banner).toBeInTheDocument();
    expect(banner).toHaveTextContent("");
    expect(banner).not.toHaveClass("snap-suit");
    expect(banner).not.toHaveClass("snap-value");
  });

  test("displays SNAP VALUE when card values match", () => {
    const currentCard = { value: "5", suit: "HEARTS" };
    const previousCard = { value: "5", suit: "SPADES" };

    render(
      <MessageBanner
        message=""
        setMessage={setMessageMock}
        currentCard={currentCard}
        previousCard={previousCard}
        suitMatches={0}
        setSuitMatches={setSuitMatchesMock}
        valueMatches={0}
        setValueMatches={setValueMatchesMock}
      />
    );

    expect(setMessageMock).toHaveBeenCalledWith("SNAP VALUE");
    expect(setValueMatchesMock).toHaveBeenCalledWith(1);
  });

  test("displays SNAP SUIT when card suits match", () => {
    const currentCard = { value: "7", suit: "HEARTS" };
    const previousCard = { value: "9", suit: "HEARTS" };

    render(
      <MessageBanner
        message=""
        setMessage={setMessageMock}
        currentCard={currentCard}
        previousCard={previousCard}
        suitMatches={0}
        setSuitMatches={setSuitMatchesMock}
        valueMatches={0}
        setValueMatches={setValueMatchesMock}
      />
    );

    expect(setMessageMock).toHaveBeenCalledWith("SNAP SUIT");
    expect(setSuitMatchesMock).toHaveBeenCalledWith(1);
  });

  test("resets message when no match", () => {
    const currentCard = { value: "2", suit: "HEARTS" };
    const previousCard = { value: "3", suit: "SPADES" };

    render(
      <MessageBanner
        message=""
        setMessage={setMessageMock}
        currentCard={currentCard}
        previousCard={previousCard}
        suitMatches={0}
        setSuitMatches={setSuitMatchesMock}
        valueMatches={0}
        setValueMatches={setValueMatchesMock}
      />
    );

    expect(setMessageMock).toHaveBeenCalledWith("");
  });
});