/**
 * @description Returns the weather description based on the WMO code.
 */
export function getWeatherDescription(code: number): string {
  switch (code) {
    case 0:
      return 'Слънчево';
    case 1:
      return 'Предимно слънчево';
    case 2:
      return 'Предимно облачно';
    case 3:
      return 'Облачно';
    case 45:
      return 'Мъгла';
    case 48:
      return 'Слана';
    case 51:
    case 56:
    case 61:
    case 66:
    case 80:
      return 'Слаби превалявания';
    case 53:
    case 63:
    case 81:
      return 'Умерени превалявания';
    case 55:
    case 57:
    case 65:
    case 67:
    case 82:
      return 'Силни превалявания';
    case 71:
    case 85:
      return 'Слаб снеговалеж';
    case 73:
      return 'Умерен снеговалеж';
    case 75:
    case 86:
      return 'Силен снеговалеж';
    case 77:
      return 'Градушка';
    case 95:
      return 'Гръмотевична буря';
    case 96:
    case 99:
      return 'Гръмотевична буря с градушка';
    default:
      return 'Неизвестни условия';
  }
}
