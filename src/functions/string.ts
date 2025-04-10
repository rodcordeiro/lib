/**
 * Remove os acentos de uma string
 * @param {string} s String a ser renderizada
 * @returns {string} valor sem acentos
 * @example removeAccents('líção') => 'licao'
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
 * Preenche uma string à esquerda até o tamanho desejado
 * @param {string} str Valor base
 * @param {number} padlen Tamanho total da string desejada
 * @param {string} padchar Caractere de preenchimento (default '0')
 * @returns {string} String preenchida
 * @example paddy('7', 3) => '007'
 */
export function paddy(str: string, padlen: number, padchar?: string): string {
  const pad_char = typeof padchar !== 'undefined' ? padchar : '0';
  const pad = new Array(1 + padlen).join(pad_char);
  return `${pad}${str}`.slice(-pad.length);
}

/** Converte CamelCase para underscore_case */
export const CamelCaseToUnderscore = (str: string) =>
  str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();

/** Converte underscore_case para camelCase */
export const UnderscoreToCamelCase = (str: string) =>
  str.replace(/(_\w)/g, (m) => m[1].toUpperCase());

/** Capitaliza a primeira letra de uma string */
export const Capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

/** Verifica se uma string não está vazia ou é inválida */
export const IsNotEmpty = (str: string | undefined | null): boolean => {
  if (!str || str.trim() === '') return false;
  if (['undefined', 'null'].includes(str)) return false;
  return true;
};

/** Remove quebras de linha de uma string */
export const RemoveBreakLines = (str: string) =>
  str.replace(/(\r\n|\n|\r)/gm, '');

/** Remove todos os espaços de uma string */
export const RemoveSpaces = (str: string) => str.replace(/\s+/g, '');

/** Remove todos os caracteres especiais, mantendo apenas letras e números */
export const RemoveSpecialCharacters = (str: string) =>
  str.replace(/[^a-zA-Z0-9]/g, '');

/** Retorna somente os números de uma string */
export const GetOnlyNumbers = (str: string) => str.replace(/\D/g, '');

/** Retorna somente as letras de uma string */
export const GetOnlyLetters = (str: string) => str.replace(/[^a-zA-Z]/g, '');

/** Retorna os últimos caracteres da string */
export const GetLastCharacters = (str: string, length: number) =>
  str.slice(-length);

/** Retorna os primeiros caracteres da string */
export const GetFirstCharacters = (str: string, length: number) =>
  str.slice(0, length);
