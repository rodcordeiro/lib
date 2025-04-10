/**
 *  Função que retorna data formatada em pt-BR
 *  @param {string} value Recebe um valor ISO
 *  @example formatDate('2010-10-01T00:00:00Z') => '01/10/2010'
 */

export const formatDate = (value: string): string =>
  new Date(value)
    .toISOString()
    .split('T')[0]
    .split('-')
    .slice(0, 3)
    .reverse()
    .join('/');

/**
 *  Função para adicionar x dias a data e retorná-lano formato Date
 *  @param {string} value Recebe um valor ISO
 *  @example formatDate('2010-10-01T00:00:00Z',5) => '2010-10-06T00:00:00Z'
 */
export function addDays(date: string | Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

interface DateOptions {
  year: number;
  month: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
  day: number;
}

/**
 * Converts the date in d to a date-object. The input can be:
 *
 *   a date object: returned without modification
 *   an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
 *   a number     : Interpreted as number of milliseconds
 *                   since 1 Jan 1970 (a timestamp)
 *   a string     : Any format supported by the javascript engine, like
 *                   "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
 *   an object     : Interpreted as an object with year, month and date
 *                   attributes.  **NOTE** month is 0-11.
 */
export function convertDate(d: any) {
  if (d.constructor === Date) return d;
  if (d.constructor === Array) return new Date(d[0], d[1], d[2]);
  if (d.constructor === Number) return new Date(+d);
  if (d.constructor === String) return new Date(String(d));
  if (typeof d === 'object') return new Date(d.year, d.month, d.date);

  return NaN;
}

type DateCompare = string | Date | number | DateOptions;

/**
Compare two dates (could be of any type supported by the convert
function above) and returns:

  _-1_ : if a < b

    _0_ : if a = b

    _1_ : if a > b

 NaN : if a or b is an illegal date

 NOTE: The code inside isFinite does an assignment (=).
 */
export function compareDates(a: DateCompare, b: DateCompare): number {
  const firstDate = convertDate(a).valueOf();
  const secondDate = convertDate(b).valueOf();

  if (!Number.isFinite(firstDate) || !Number.isFinite(secondDate)) {
    return NaN;
  }

  return firstDate > secondDate ? 1 : firstDate < secondDate ? -1 : 0;
}
/**
Checks if date in d is between dates in start and end.
 Returns a boolean or NaN:
  
   true  : if d is between start and end (inclusive)
  
      false : if d is before start or after end
  
      NaN   : if one or more of the dates is illegal.
  
      __NOTE__ : The code inside isFinite does an assignment (=).
 */

export function isInRange(
  d: DateCompare,
  start: DateCompare,
  end: DateCompare,
) {
  const date = convertDate(d).valueOf();
  const startDate = convertDate(start).valueOf();
  const endDate = convertDate(end).valueOf();
  return Number.isFinite(date) &&
    Number.isFinite(startDate) &&
    Number.isFinite(endDate)
    ? startDate <= date && date <= endDate
    : NaN;
}

export function AddHour(date: Date, hour: number) {
  return date.setHours(date.getHours() + hour);
}
