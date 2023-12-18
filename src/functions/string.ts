/**
 * Remove os acentos de uma string
 * @param {string} s String a ser renderizada
 * @returns {string} valor sem acentos
 *
 * @example removeAccents('líção') -> licao
 */
export function removeAccents(s: string): string {
  let r: string = s;
  const non_asciis = {
    A: '[ÀÁÂÃÄÅ]',
    AE: 'Æ',
    C: 'Ç',
    E: '[ÈÉÊË]',
    I: '[ÌÍÎÏ]',
    N: 'Ñ',
    O: '[ÒÓÔÕÖ]',
    OE: 'Œ',
    U: '[ÙÚÛŰÜ]',
    Y: '[ÝŸ]',
    a: '[àáâãäå]',
    ae: 'æ',
    c: 'ç',
    e: '[èéêë]',
    i: '[ìíîï]',
    n: 'ñ',
    o: '[òóôõö]',
    oe: 'œ',
    u: '[ùúûűü]',
    y: '[ýÿ]',
  };
  for (const i in non_asciis) {
    // @ts-ignore
    r = String(r).replace(new RegExp(non_asciis[i], 'g'), i);
  }
  return r;
}

/**
 * Transforms a number to a predefined size string.
 * @param {string} str param to set fixed size
 * @param {number} padlen length
 * @param {string} padchar Character used to fullfill the string. `Defaults to 0`.
 * @returns
 */
export function paddy(str: string, padlen: number, padchar?: string) {
  const pad_char = typeof padchar !== 'undefined' ? padchar : '0';
  const pad = new Array(1 + padlen).join(pad_char);
  return `${pad}${str}`.slice(-pad.length);
}

export const CamelCaseToUnderscore = (str: string) =>
  str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();

export const UnderscoreToCamelCase = (str: string) =>
  str.replace(/(\_\w)/g, (m) => m[1].toUpperCase());

export const Capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const IsNotEmpty = (str: string) => {
  if (str === undefined) return false;
  if (str === null) return false;
  if (str === 'undefined') return false;
  if (str === 'null') return false;
  if (str === '') return false;
  return str.trim() !== '';
};

export const RemoveBreakLines = (str: string) =>
  str.replace(/(\r\n|\n|\r)/gm, '');

export const RemoveSpaces = (str: string) => str.replace(/\s+/g, '');

export const RemoveSpecialCharacters = (str: string) =>
  str.replace(/[^a-zA-Z0-9]/g, '');

export const GetOnlyNumbers = (str: string) => str.replace(/\D/g, '');

export const GetOnlyLetters = (str: string) => str.replace(/[^a-zA-Z]/g, '');

export const GetLastCharacters = (str: string, length: number) =>
  str.slice(-length);

export const GetFirstCharacters = (str: string, length: number) =>
  str.slice(0, length);
