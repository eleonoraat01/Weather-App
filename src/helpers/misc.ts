/**
 * @description Returns a string representation of the given query parameters object.
 */
export function makeQueryParam(params: Record<string, string | Array<string>>): string {
  if (!params || Object.keys(params).length === 0) return '';

  try {
    return Object.entries(params)
      .filter(([key, value]) => {
        const isKeyValid = typeof key === 'string' && key.trim().length > 0;
        const isValueValid = typeof value === 'string'
          ? value.trim().length > 0
          : Array.isArray(value) && value.every(v => typeof v === 'string' && v.trim().length > 0);

        return isKeyValid && isValueValid;
      })
      .map(([key, value]) => {
        const encodedValues = Array.isArray(value)
          ? value.map(v => encodeURIComponent(v.trim())).join(',')
          : encodeURIComponent(value.trim());

        return `${encodeURIComponent(key.trim())}=${encodedValues}`;
      })
      .join('&');
  } catch (error) {
    console.error(error);
    return '';
  }
}

/**
 * @description Capitalizes the first letter of a string.
 */
export function capitalize(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
