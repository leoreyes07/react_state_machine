export const fetchCountries = async () => {
  const response = await fetch(
    'https://api.worldbank.org/v2/country?format=json&per_page=400',
  );

  if (!response.ok) {
    throw new Error('No se pudieron cargar los países.');
  }

  const [, countries] = await response.json();

  if (!Array.isArray(countries)) {
    throw new Error('La API no devolvió una lista de países válida.');
  }

  const countryNames = countries
    .filter(({ region }) => ['LCN', 'NAC'].includes(region?.id))
    .map(({ name }) => name)
    .sort((firstCountry, secondCountry) =>
      firstCountry.localeCompare(secondCountry),
    );

  if (countryNames.length === 0) {
    throw new Error('La API no devolvió países de América.');
  }

  return countryNames;
};