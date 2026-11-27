import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { fetchCountries } from './utils/api';

jest.mock('./utils/api', () => ({
  fetchCountries: jest.fn(),
}));

test('shows countries returned by the API in the destination selector', async () => {
  fetchCountries.mockResolvedValue(['Mexico', 'Colombia']);

  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: 'Comenzar' }));

  expect(await screen.findByRole('option', { name: 'Mexico' })).toBeInTheDocument();
  expect(fetchCountries).toHaveBeenCalledTimes(1);
});

test('allows retrying after the country request fails', async () => {
  fetchCountries
    .mockRejectedValueOnce(new Error('No se pudieron cargar los países.'))
    .mockResolvedValueOnce(['Mexico']);

  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: 'Comenzar' }));

  expect(await screen.findByRole('alert')).toHaveTextContent(
    'No se pudieron cargar los países.',
  );

  fireEvent.click(screen.getByRole('button', { name: 'Reintentar' }));

  expect(await screen.findByRole('option', { name: 'Mexico' })).toBeInTheDocument();
  expect(fetchCountries).toHaveBeenCalledTimes(2);
});
