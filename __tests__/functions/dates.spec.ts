import { describe, it, expect } from '@jest/globals';
import { DateUtils } from '../../src';

describe('DateUtils', () => {
  describe('formatDate', () => {
    it('should format ISO string to pt-BR format', () => {
      const result = DateUtils.formatDate('2010-10-01T00:00:00Z');
      expect(result).toBe('01/10/2010');
    });

    it('should handle invalid dates gracefully (still returns string)', () => {
      const result = DateUtils.formatDate('invalid');
      expect(typeof result).toBe('string'); // May return something like "NaN/NaN/NaN"
    });
  });

  describe('addDays', () => {
    it('should add days to an ISO string date', () => {
      const result = DateUtils.addDays('2023-01-01', 5);
      expect(result.toISOString().startsWith('2023-01-06')).toBe(true);
    });

    it('should add days to a Date object', () => {
      const base = new Date('2023-01-01');
      const result = DateUtils.addDays(base, 10);
      expect(result.toISOString().startsWith('2023-01-11')).toBe(true);
    });
  });

  describe('convertDate', () => {
    it('should handle Date object', () => {
      const date = new Date();
      expect(DateUtils.convertDate(date)).toEqual(date);
    });

    it('should handle array [year, month, day]', () => {
      const result = DateUtils.convertDate([2023, 0, 1]);
      expect(result.toISOString().startsWith('2023-01-01')).toBe(true);
    });

    it('should handle timestamp (number)', () => {
      const now = Date.now();
      expect(DateUtils.convertDate(now).getTime()).toBe(now);
    });

    it('should handle string', () => {
      const str = '2023-01-01';
      const result = DateUtils.convertDate(str);
      expect(result.toISOString().startsWith('2023-01-01')).toBe(true);
    });

    it('should handle object with year/month/date', () => {
      const obj = { year: 2022, month: 11, day: 25 };
      const result = DateUtils.convertDate(obj);
      expect(result.toISOString().startsWith('2022-12-25')).toBe(true);
    });

    it('should throw for invalid input', () => {
      expect(() => DateUtils.convertDate(undefined as any)).toThrow(
        'Parameter is not a valid date input or could not be converted',
      );
    });
  });

  describe('compareDates', () => {
    it('should return 0 for equal dates', () => {
      expect(DateUtils.compareDates('2023-01-01', '2023-01-01')).toBe(0);
    });

    it('should return -1 if first is earlier', () => {
      expect(DateUtils.compareDates('2022-01-01', '2023-01-01')).toBe(-1);
    });

    it('should return 1 if first is later', () => {
      expect(DateUtils.compareDates('2024-01-01', '2023-01-01')).toBe(1);
    });

    it('should return NaN if any date is invalid', () => {
      expect(
        Number.isNaN(DateUtils.compareDates('invalid', '2023-01-01')),
      ).toBe(true);
    });
  });

  describe('isInRange', () => {
    it('should return true if date is within range (inclusive)', () => {
      expect(
        DateUtils.isInRange('2023-06-15', '2023-01-01', '2023-12-31'),
      ).toBe(true);
    });

    it('should return false if date is before range', () => {
      expect(
        DateUtils.isInRange('2022-12-31', '2023-01-01', '2023-12-31'),
      ).toBe(false);
    });

    it('should return false if date is after range', () => {
      expect(
        DateUtils.isInRange('2024-01-01', '2023-01-01', '2023-12-31'),
      ).toBe(false);
    });

    it('should return NaN if any date is invalid', () => {
      expect(
        Number.isNaN(
          DateUtils.isInRange('invalid', '2023-01-01', '2023-12-31'),
        ),
      ).toBe(true);
    });
  });

  describe('AddHour', () => {
    it('should correctly add hours to a date', () => {
      const date = new Date('2023-01-01T00:00:00Z');
      const result = DateUtils.AddHour(date, 5);
      const expected = new Date('2023-01-01T05:00:00Z');
      expect(result).toEqual(expected);
    });

    it('should work with negative hours', () => {
      const date = new Date('2023-01-01T12:00:00Z');
      const result = DateUtils.AddHour(date, -2);
      const expected = new Date('2023-01-01T10:00:00Z');
      expect(result).toEqual(expected);
    });
  });
});
