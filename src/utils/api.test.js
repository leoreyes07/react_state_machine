import { fetchCountries } from './api';

const originalFetch = global.fetch;

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  if (originalFetch) {
    global.fetch = originalFetch;
  } else {
    delete global.fetch;
  }
});

test('returns countries from the Americas and excludes aggregate regions', async () => {
  global.fetch.mockResolvedValue({
    ok: true,
    json: async () => [
      { total: 4 },
      [
        { name: 'Mexico', region: { id: 'LCN' } },
        { name: 'Canada', region: { id: 'NAC' } },
        { name: 'Latin America & Caribbean', region: { id: 'NA' } },
        { name: 'France', region: { id: 'ECS' } },
      ],
    ],
  });

  await expect(fetchCountries()).resolves.toEqual(['Canada', 'Mexico']);
  expect(global.fetch).toHaveBeenCalledWith(
    'https://api.worldbank.org/v2/country?format=json&per_page=400',
  );
});

test('reports an HTTP error instead of returning an empty country list', async () => {
  global.fetch.mockResolvedValue({ ok: false });

  await expect(fetchCountries()).rejects.toThrow(
    'No se pudieron cargar los países.',
  );
});
