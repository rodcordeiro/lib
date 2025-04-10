/**
 * Formata números em R$.
 *
 * @param {number} value Valor numérico a ser formatado
 * @returns {string} Valor formatado como moeda BRL (R$)
 * @example
 * formatToCurrency(1234) // 'R$ 1.234,00'
 */
export const formatToCurrency = (value: number): string =>
  Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);

/**
 * Formata um número com duas casas decimais, sem símbolo de moeda.
 *
 * @param {number} value Valor numérico a ser formatado
 * @returns {string} Valor formatado com separador de milhar e duas casas decimais
 * @example
 * formatToCurrencyAsNumber(1234) // '1.234,00'
 */
export function formatToCurrencyAsNumber(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Divide um número de cartão de crédito em blocos de 4 dígitos.
 *
 * @param {number} num Número do cartão de crédito
 * @returns {string[]} Array com os blocos de 4 dígitos
 * @example
 * splitNumberCreditCard(1234567812345678) // ['1234', '5678', '1234', '5678']
 */
export const splitNumberCreditCard = (num: number): string[] => {
  if (!num) return [];
  const numStr = num.toString();
  const parts = numStr.match(/.{1,4}/g);
  return parts || [];
};

/**
 * Extrai mês e ano (formato YY) de uma string ISO (YYYY-MM).
 *
 * @param {string} date Data no formato ISO (ex: '2025-04')
 * @returns {{ month: string, year: string }} Objeto com mês e ano
 * @example
 * extractMonthAndYear('2025-04') // { month: '04', year: '25' }
 */
export const extractMonthAndYear = (
  date: string,
): { month: string; year: string } => {
  if (!date) return { month: '', year: '' };
  const [year, month] = date.split('-');
  return {
    month,
    year: year.slice(-2),
  };
};
