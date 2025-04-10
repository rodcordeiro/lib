/**
 * Formata números em R$.
 *
 * @param {number} value Valor em Number
 * @return R$ X.XXX
 * @example formatToCurrency(1234) => 'R$ 1.234,00'
 *
 */
export const formatToCurrency = (value: number): string =>
  Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);

export function formatToCurrencyAsNumber(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export const splitNumberCreditCard = (num: number): string[] => {
  if (!num) return [];
  const numStr = num.toString();
  const parts = numStr.match(/.{1,4}/g);

  return parts || [];
};

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
