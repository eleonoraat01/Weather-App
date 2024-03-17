import { fetchCityName } from '@helpers';
import type { LocationDetails } from '@types';

/**
 * @description Get the current location details including latitude, longitude, time zone, and location name.
 */
export async function fetchLocationDetails(): Promise<LocationDetails> {
  try {
    const { latitude, longitude } = await getCurrentPosition();
    const { timeZone: timezone } = Intl.DateTimeFormat().resolvedOptions();

    const location = await fetchCityName(latitude, longitude);

    return { latitude, longitude, timezone, location };
  } catch (geolocationError) {
    console.error(`${(geolocationError as GeolocationPositionError).message}. Using https://ipinfo.io/json instead.`);

    try {
      const { latitude, longitude, timezone, location: loc } = await fetchLocationByIP();
      const location = (await fetchCityName(latitude, longitude)) || loc;

      return { latitude, longitude, timezone, location };
    } catch (fetchError) {
      console.error(`${(fetchError as Error).message}. Using default location instead.`);
      return getDefaultLocation();
    }
  }
}

/**
 * @description Fetches the current position using geolocation API.
 */
async function getCurrentPosition(): Promise<{ latitude: string; longitude: string }> {
  const permission = await navigator.permissions.query({ name: 'geolocation' });

  if (permission.state === 'denied') {
    throw new Error('Geolocation permission denied');
  }

  const response = await new Promise<GeolocationPosition>((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true })
  );

  return {
    latitude: response.coords.latitude.toString(),
    longitude: response.coords.longitude.toString(),
  };
}

/**
 * @description Fetches location information using IP.
 */
async function fetchLocationByIP(): Promise<LocationDetails> {
  const response = await fetch('https://ipinfo.io/json');
  const { loc = [], timezone, city, country } = await response.json();

  const [latitude, longitude] = loc.split(',');
  const location = `${city}, ${country}`;

  return { latitude, longitude, timezone, location };
}

/**
 * @description Returns default location.
 */
function getDefaultLocation(): LocationDetails {
  return {
    latitude: '42.6977',
    longitude: '23.3219',
    timezone: 'Europe/Sofia',
    location: 'София, България',
  };
}
