const DAY_ICON_MAP = new Map<number, string>();
const NIGHT_ICON_MAP = new Map<number, string>();
const BASE_URL = `${import.meta.env.BASE_URL}assets/images/weather-icons`;

const addMapping = (values: number[], name: string, map: Map<number, string>) =>
  values.forEach(value => map.set(value, `${BASE_URL}/${name}.svg`));

// Day icons mapping
addMapping([0], 'day-clear', DAY_ICON_MAP);
addMapping([1], 'day-mainly-clear', DAY_ICON_MAP);
addMapping([2], 'day-partly-cloudy', DAY_ICON_MAP);
addMapping([3], 'overcast', DAY_ICON_MAP);
addMapping([45, 48], 'smog', DAY_ICON_MAP);
addMapping([51, 53, 55, 56, 57, 61, 63, 65, 66, 67], 'day-showers-light', DAY_ICON_MAP);
addMapping([80, 81, 82], 'day-showers-heavy', DAY_ICON_MAP);
addMapping([71, 73, 75], 'day-snowfall-light', DAY_ICON_MAP);
addMapping([85, 86], 'day-snowfall-heavy', DAY_ICON_MAP);
addMapping([77], 'hail-heavy', DAY_ICON_MAP);
addMapping([95, 96, 99], 'thunderstorm', DAY_ICON_MAP);

// Night images/weather-icons mapping
addMapping([0], 'night-clear', NIGHT_ICON_MAP);
addMapping([1], 'night-mainly-clear', NIGHT_ICON_MAP);
addMapping([2], 'night-partly-cloudy', NIGHT_ICON_MAP);
addMapping([3], 'overcast', NIGHT_ICON_MAP);
addMapping([45, 48], 'smog', NIGHT_ICON_MAP);
addMapping([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82], 'night-showers', NIGHT_ICON_MAP);
addMapping([71, 73, 75, 85, 86], 'night-snowfall', NIGHT_ICON_MAP);
addMapping([77], 'hail-heavy', NIGHT_ICON_MAP);
addMapping([95, 96, 99], 'thunderstorm', NIGHT_ICON_MAP);

/**
 * @description Returns the weather icon based on the WMO code.
 */
export function getWeatherIcon(code: number, isDay = true): string {
  return (isDay ? DAY_ICON_MAP : NIGHT_ICON_MAP).get(code) || 'icons/not-applicable.svg';
}
