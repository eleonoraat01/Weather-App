export type LocationDetails = {
  latitude: string;
  longitude: string;
  timezone: string;
  location?: string;
};

export type WeatherData = {
  location?: string;
  current: CurrentWeatherData;
  daily: DailyWeatherData[];
  hourly: HourlyWeatherData[];
};

export type CurrentWeatherData = {
  currentTemp: string;
  feelsLike: string;
  humidity: string;
  windSpeed: string;
  precipitation: string;
  visibility: string;
  uvIndex: string;
  isDay: boolean;
  iconCode: number;
  units: {
    currentTemp: string;
    feelsLike: string;
    humidity: string;
    windSpeed: string;
    precipitation: string;
    visibility: string;
    uvIndex: string;
    isDay: string;
    iconCode: string;
  };
};

export type DailyWeatherData = {
  timestamp: number;
  highTemp: string;
  lowTemp: string;
  iconCode: number;
  units: {
    timestamp: string;
    highTemp: string;
    lowTemp: string;
    iconCode: string;
  };
};

export type HourlyWeatherData = {
  timestamp: number;
  currentTemp: string;
  feelsLike: string;
  windSpeed: string;
  precipitation: string;
  isDay: boolean;
  iconCode: number;
  units: {
    timestamp: string;
    currentTemp: string;
    feelsLike: string;
    windSpeed: string;
    precipitation: string;
    isDay: string;
    iconCode: string;
  };
};

export type WeatherResponse = {
  current: CurrentWeatherResponse<number>;
  current_units: CurrentWeatherResponse<string>;
  daily: DailyWeatherResponse<number[]>;
  daily_units: DailyWeatherResponse<string>;
  hourly: HourlyWeatherResponse<number[]>;
  hourly_units: HourlyWeatherResponse<string>;
  elevation: number;
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  utc_offset_seconds: number;
  generationtime_ms: number;
};

type CurrentWeatherResponse<T> = {
  time: T;
  interval: T;
  temperature_2m: T;
  apparent_temperature: T;
  relative_humidity_2m: T;
  wind_speed_10m: T;
  is_day: T;
  weather_code: T;
};

type DailyWeatherResponse<T> = {
  time: T;
  temperature_2m_max: T;
  temperature_2m_min: T;
  apparent_temperature_max: T;
  apparent_temperature_min: T;
  uv_index_max: T;
  precipitation_sum: T;
  weather_code: T;
};

type HourlyWeatherResponse<T> = {
  time: T;
  temperature_2m: T;
  apparent_temperature: T;
  wind_speed_10m: T;
  precipitation: T;
  visibility: T;
  is_day: T;
  weather_code: T;
};
