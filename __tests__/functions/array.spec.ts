import { describe, it, expect } from '@jest/globals';
import { ArrayUtils } from '../../src';

describe('ArrayUtils', () => {
  describe('minimizer', () => {
    it('should convert object keys to lowercase', () => {
      const input = { NAME: 'John', AGE: 30 };
      const result = ArrayUtils.minimizer(input);
      expect(result).toEqual({ name: 'John', age: 30 });
    });

    it('should replace -1 values with "-"', () => {
      const input = { Value: -1, Other: 10 };
      const result = ArrayUtils.minimizer(input);
      expect(result).toEqual({ value: '-', other: 10 });
    });

    it('should handle an array of objects', () => {
      const input = [{ KeyOne: 1, KeyTwo: -1 }, { AnotherKey: 'Test' }];
      const result = ArrayUtils.minimizer(input);
      expect(result).toEqual([
        { keyone: 1, keytwo: '-' },
        { anotherkey: 'Test' },
      ]);
    });
  });

  describe('groupByFields', () => {
    it('should group by specified fields', () => {
      const input = [
        { a: 1, b: 2 },
        { a: 1, b: 2 },
        { a: 2, b: 3 },
      ];
      const result = ArrayUtils.groupByFields(input, (item) => [
        item.a,
        item.b,
      ]);
      expect(result.length).toBe(2);
      expect(result[0].length).toBe(2);
      expect(result[1].length).toBe(1);
    });
  });

  describe('splitArray', () => {
    it('should split array into chunks', () => {
      const input = [1, 2, 3, 4, 5];
      const result = ArrayUtils.splitArray(input, 2);
      expect(result).toEqual([[1, 2], [3, 4], [5]]);
    });

    it('should handle empty array', () => {
      const result = ArrayUtils.splitArray([], 3);
      expect(result).toEqual([]);
    });
  });

  describe('batchProcess', () => {
    it('should process batches synchronously', () => {
      const input = [1, 2, 3, 4];
      const processed: number[][] = [];
      ArrayUtils.batchProcess(input, (batch) => processed.push(batch), 2);
      expect(processed).toEqual([
        [1, 2],
        [3, 4],
      ]);
    });

    it('should apply filter if provided', () => {
      const input = [1, 2, 3, 4];
      const processed: number[][] = [];
      ArrayUtils.batchProcess(
        input,
        (batch) => processed.push(batch),
        2,
        (x) => x % 2 === 0,
      );
      expect(processed).toEqual([[2, 4]]);
    });
  });

  describe('asyncBatchProcess', () => {
    it('should process batches asynchronously', async () => {
      const input = [1, 2, 3];
      const processed: number[][] = [];
      await ArrayUtils.asyncBatchProcess(
        input,
        async (batch) => {
          processed.push(batch);
        },
        2,
      );
      expect(processed).toEqual([[1, 2], [3]]);
    });

    it('should apply async filter correctly', async () => {
      const input = [1, 2, 3, 4, 5];
      const processed: number[][] = [];
      await ArrayUtils.asyncBatchProcess(
        input,
        async (batch) => {
          processed.push(batch);
        },
        2,
        (x) => x > 2,
      );
      expect(processed).toEqual([[3, 4], [5]]);
    });
  });

  describe('process', () => {
    it('should call callback for each item', () => {
      const input = [1, 2, 3];
      const processed: number[] = [];
      ArrayUtils.process(input, (item) => processed.push(item));
      expect(processed).toEqual([1, 2, 3]);
    });

    it('should apply filter if provided', () => {
      const input = [1, 2, 3, 4];
      const processed: number[] = [];
      ArrayUtils.process(
        input,
        (item) => processed.push(item),
        (x) => x > 2,
      );
      expect(processed).toEqual([3, 4]);
    });
  });

  describe('asyncProcess', () => {
    it('should process items asynchronously', async () => {
      const input = [1, 2];
      const processed: number[] = [];
      await ArrayUtils.asyncProcess(input, async (item) =>
        processed.push(item),
      );
      expect(processed).toEqual([1, 2]);
    });

    it('should apply async filter', async () => {
      const input = [1, 2, 3, 4];
      const processed: number[] = [];
      await ArrayUtils.asyncProcess(
        input,
        async (item) => processed.push(item),
        (x) => x % 2 === 0,
      );
      expect(processed).toEqual([2, 4]);
    });
  });
});
