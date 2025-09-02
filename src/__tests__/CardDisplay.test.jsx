import React from 'react';
import { render, screen } from '@testing-library/react';
import CardDisplay from '../components/CardDisplay';

describe('CardDisplay Component', () => {
  const buttonCount = 4;

  test('renders correctly when previousCard or currentCard is null', () => {
    render(<CardDisplay previousCard={null} currentCard={null} buttonCount={buttonCount} />);

    const prevCard = screen.getByTestId('card-previous').querySelector('img');
    const currCard = screen.getByTestId('card-current').querySelector('img');

    expect(prevCard).toBeNull(); // no img should be rendered
    expect(currCard).toBeNull(); // no img should be rendered
  });

  test('renders correctly with actual previousCard and currentCard', () => {
    const previousCard = { image: 'prev.png' };
    const currentCard = { image: 'curr.png' };

    render(<CardDisplay previousCard={previousCard} currentCard={currentCard} buttonCount={buttonCount} />);

    const prevCardImg = screen.getByTestId('card-previous').querySelector('img');
    const currCardImg = screen.getByTestId('card-current').querySelector('img');

    expect(prevCardImg).toHaveAttribute('src', 'prev.png');
    expect(currCardImg).toHaveAttribute('src', 'curr.png');
  });
});
