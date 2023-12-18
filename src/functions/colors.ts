/**
 * Creates a random HEX code color
 * @returns {string} color hex code
 */
export const randomHexColor = (): string => {
  const randomColor = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0');
  return `#${randomColor}`;
};

/**
 * Applies lumiance control to a given color hex code.
 * @param {string} hex color hex code
 * @param {number} luminosity light or darkness intensity to apply
 * @returns {string} hex code
 */
export function lumiance(hex: string, luminosity: number = 0): string {
  hex = hex.replace(/[^0-9a-f]/gi, '');

  const isValidHex = hex.length === 3 || hex.length === 6;
  if (!isValidHex) throw new Error('Invalid color hex code');
  if (hex.length === 3)
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  const twoDigitGroup = hex.match(/([0-9a-f]){2}/gi) as RegExpMatchArray;

  let newHex = '#';
  for (let twoDigit of twoDigitGroup) {
    const numberFromHex = parseInt(twoDigit, 16);
    const calculateLuminosity = numberFromHex + luminosity * 255;
    const blackOrLuminosity = Math.max(0, calculateLuminosity);
    const partialColor = Math.min(255, blackOrLuminosity);

    const newColor = Math.round(partialColor);
    const numberToHex = newColor.toString(16);
    const result = `0${numberToHex}`.slice(-2);
    newHex += result;
  }
  return newHex;
}
