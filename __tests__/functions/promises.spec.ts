import { describe, it, expect } from '@jest/globals';

import { PromiseUtils } from '../../src';

describe('PromiseUtils', () => {
  describe('promiseWithTimeout', () => {
    it('should resolve if promise resolves before timeout', async () => {
      const result = await PromiseUtils.promiseWithTimeout(
        new Promise((resolve) => setTimeout(() => resolve('ok'), 50)),
        100,
      );
      expect(result).toBe('ok');
    });

    it('should reject if promise takes too long', async () => {
      await expect(
        PromiseUtils.promiseWithTimeout(
          new Promise((resolve) => setTimeout(() => resolve('too slow'), 200)),
          100,
        ),
      ).rejects.toThrow('Promise timed out');
    });

    it('should allow custom timeout error', async () => {
      const customError = new Error('Custom timeout!');
      await expect(
        PromiseUtils.promiseWithTimeout(
          new Promise((resolve) => setTimeout(resolve, 200)),
          100,
          customError,
        ),
      ).rejects.toThrow('Custom timeout!');
    });
  });

  describe('retry', () => {
    it('should resolve immediately if promise succeeds', async () => {
      const factory = jest.fn(() => Promise.resolve('success'));
      const result = await PromiseUtils.retry(factory, 3);
      expect(result).toBe('success');
      expect(factory).toHaveBeenCalledTimes(1);
    });

    it('should retry the specified number of times if it fails', async () => {
      const factory = jest
        .fn()
        .mockRejectedValueOnce(new Error('fail 1'))
        .mockRejectedValueOnce(new Error('fail 2'))
        .mockResolvedValue('eventually works');

      const result = await PromiseUtils.retry(factory, 3);
      expect(result).toBe('eventually works');
      expect(factory).toHaveBeenCalledTimes(3);
    });

    it('should throw if retries are exhausted', async () => {
      const factory = jest.fn(() => Promise.reject(new Error('always fails')));

      await expect(PromiseUtils.retry(factory, 2)).rejects.toThrow(
        'always fails',
      );
      expect(factory).toHaveBeenCalledTimes(3); // initial + 2 retries
    });
  });
});
