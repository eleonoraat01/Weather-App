// https://open-meteo.com/en/docs#current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m&hourly=temperature_2m,apparent_temperature,precipitation,weather_code,visibility,wind_speed_10m,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,uv_index_max,precipitation_sum&timeformat=unixtime&wind_speed_unit=ms

import { fetchLocationDetails, makeQueryParam } from '@helpers';
import type { WeatherData, CurrentWeatherData, DailyWeatherData, HourlyWeatherData, WeatherResponse } from '@types';

/**
 * @description Retrieves weather data from the API.
 */
export default async function getWeatherData(): Promise<WeatherData | null> {
  const { location, ...position } = await fetchLocationDetails();

  const queryParams = makeQueryParam({
    ...position,
    current: ['temperature_2m', 'relative_humidity_2m', 'apparent_temperature', 'is_day', 'weather_code', 'wind_speed_10m'],
    daily: ['weather_code', 'temperature_2m_max', 'temperature_2m_min', 'apparent_temperature_max', 'apparent_temperature_min', 'uv_index_max', 'precipitation_sum'],
    hourly: ['temperature_2m', 'apparent_temperature', 'precipitation', 'weather_code', 'visibility', 'wind_speed_10m', 'is_day'],
    timeformat: 'unixtime',
    wind_speed_unit: 'ms',
  });

  try {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${queryParams}`);
    const data = (await response.json()) as WeatherResponse;

    return {
      location,
      current: parseCurrentWeather(data),
      daily: parseDailyWeather(data),
      hourly: parseHourlyWeather(data),
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * @description Parses the current weather data.
 */
function parseCurrentWeather({ current, current_units, daily, daily_units, hourly, hourly_units }: WeatherResponse): CurrentWeatherData {
  const { temperature_2m, apparent_temperature, relative_humidity_2m, wind_speed_10m, weather_code, is_day } = current;
  const { precipitation_sum: [precipitation], uv_index_max: [uv] } = daily;
  const { visibility: [visibility] } = hourly;

  return {
    currentTemp: Math.round(temperature_2m).toString(),
    feelsLike: Math.round(apparent_temperature).toString(),
    humidity: Math.round(relative_humidity_2m).toString(),
    windSpeed: Math.round(wind_speed_10m).toString(),
    precipitation: (Math.round(precipitation * 100) / 100).toString(),
    visibility: Math.round(visibility / 1000).toString(),
    uvIndex: uv.toString(),
    isDay: Boolean(is_day),
    iconCode: weather_code,
    units: {
      currentTemp: current_units.temperature_2m,
      feelsLike: current_units.apparent_temperature,
      humidity: current_units.relative_humidity_2m,
      windSpeed: current_units.wind_speed_10m,
      precipitation: daily_units.precipitation_sum,
      visibility: `k${hourly_units.visibility}`,
      uvIndex: daily_units.uv_index_max,
      isDay: current_units.is_day,
      iconCode: current_units.weather_code,
    },
  };
}

/**
 * @description Parses the daily weather data.
 */
function parseDailyWeather({ daily, daily_units }: WeatherResponse): DailyWeatherData[] {
  return daily.time.map((time, index) => {
    return {
      timestamp: time * 1000,
      highTemp: Math.round(daily.temperature_2m_max[index]).toString(),
      lowTemp: Math.round(daily.temperature_2m_min[index]).toString(),
      iconCode: daily.weather_code[index],
      units: {
        timestamp: daily_units.time,
        highTemp: daily_units.temperature_2m_max,
        lowTemp: daily_units.temperature_2m_min,
        iconCode: daily_units.weather_code,
      },
    };
  }).sort((a, b) => a.timestamp - b.timestamp);
}

/**
 * @description Parses the hourly weather data.
 */
function parseHourlyWeather({ hourly, hourly_units, current }: WeatherResponse): HourlyWeatherData[] {
  return hourly.time.map((time, index) => {
    return {
      timestamp: time * 1000,
      currentTemp: Math.round(hourly.temperature_2m[index]).toString(),
      feelsLike: Math.round(hourly.apparent_temperature[index]).toString(),
      windSpeed: Math.round(hourly.wind_speed_10m[index]).toString(),
      precipitation: (Math.round(hourly.precipitation[index] * 100) / 100).toString(),
      isDay: Boolean(hourly.is_day[index]),
      iconCode: hourly.weather_code[index],
      units: {
        timestamp: hourly_units.time,
        currentTemp: hourly_units.temperature_2m,
        feelsLike: hourly_units.apparent_temperature,
        windSpeed: hourly_units.wind_speed_10m,
        precipitation: hourly_units.precipitation,
        isDay: hourly_units.is_day,
        iconCode: hourly_units.weather_code,
      },
    };
  }).filter(({ timestamp }) => timestamp >= current.time * 1000);
}
