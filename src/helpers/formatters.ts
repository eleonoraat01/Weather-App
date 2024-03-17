import { capitalize } from '@helpers';

/**
 * @description Formats the given timestamp to display the day of the week in the specified locale.
 */
export const formatDay = (timestamp: number, locale = 'BG-bg'): string =>
  capitalize(new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(timestamp));

/**
 * @description Formats the given timestamp to display the hour and minute in the specified locale.
 */
export const formatHour = (timestamp: number, locale = 'BG-bg'): string =>
  new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: 'numeric' }).format(timestamp);
