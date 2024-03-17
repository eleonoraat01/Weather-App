import { makeQueryParam } from '@helpers';

/**
 * @description Retrieves the name of the city based on the provided latitude and longitude coordinates.
 */
export async function fetchCityName(latitude: string, longitude: string): Promise<string | undefined> {
  const queryParams = makeQueryParam({ latitude, longitude, localityLanguage: 'bg' });

  try {
    const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?${queryParams}`);
    const { city, countryName } = await response.json();

    if (city && countryName) {
      return `${city}, ${countryName}`;
    } else {
      throw new Error('City name or country name not found');
    }
  } catch (error) {
    console.error(`Failed to fetch the city name: ${(error as Error).message}.`);
    return undefined;
  }
}
