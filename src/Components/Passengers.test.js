import { render, screen } from '@testing-library/react';
import { Passengers } from './Passengers';

test('shows added passengers between the heading and the name input', () => {
  render(
    <Passengers
      state={{ context: { passengers: ['Ada Lovelace'] } }}
      send={jest.fn()}
    />,
  );

  const heading = screen.getByText('Agrega a las personas que van a volar ✈️');
  const passenger = screen.getByText('Ada Lovelace');
  const input = screen.getByRole('combobox');

  expect(passenger).toBeInTheDocument();
  expect(
    passenger.compareDocumentPosition(input) & Node.DOCUMENT_POSITION_FOLLOWING,
  ).toBeTruthy();
  expect(
    heading.compareDocumentPosition(passenger) &
      Node.DOCUMENT_POSITION_FOLLOWING,
  ).toBeTruthy();
});
