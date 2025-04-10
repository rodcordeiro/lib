import { describe, it, expect } from '@jest/globals';
import { Transformers } from '../../src';

describe('Transformers', () => {
  describe('formatToCurrency', () => {
    it('should format number to BRL currency', () => {
      expect(Transformers.formatToCurrency(1234)).toBe('R$ 1.234,00');
      expect(Transformers.formatToCurrency(0)).toBe('R$ 0,00');
      expect(Transformers.formatToCurrency(1234.56)).toBe('R$ 1.234,56');
    });
  });

  describe('formatToCurrencyAsNumber', () => {
    it('should format number with two decimals and thousands separator', () => {
      expect(Transformers.formatToCurrencyAsNumber(1234)).toBe('1.234,00');
      expect(Transformers.formatToCurrencyAsNumber(1234.5)).toBe('1.234,50');
      expect(Transformers.formatToCurrencyAsNumber(0)).toBe('0,00');
    });
  });

  describe('splitNumberCreditCard', () => {
    it('should split number into 4-digit blocks', () => {
      expect(Transformers.splitNumberCreditCard(1234567812345678)).toEqual([
        '1234',
        '5678',
        '1234',
        '5678',
      ]);
      expect(Transformers.splitNumberCreditCard(1234)).toEqual(['1234']);
      expect(Transformers.splitNumberCreditCard(0)).toEqual([]);
    });

    it('should return empty array for falsy input', () => {
      expect(Transformers.splitNumberCreditCard(undefined as any)).toEqual([]);
      expect(Transformers.splitNumberCreditCard(null as any)).toEqual([]);
    });
  });

  describe('extractMonthAndYear', () => {
    it('should extract month and short year from date string', () => {
      expect(Transformers.extractMonthAndYear('2025-04')).toEqual({
        month: '04',
        year: '25',
      });
      expect(Transformers.extractMonthAndYear('1999-12')).toEqual({
        month: '12',
        year: '99',
      });
    });

    it('should return empty strings for invalid input', () => {
      expect(Transformers.extractMonthAndYear('')).toEqual({
        month: '',
        year: '',
      });
      expect(Transformers.extractMonthAndYear(undefined as any)).toEqual({
        month: '',
        year: '',
      });
    });
  });
});
