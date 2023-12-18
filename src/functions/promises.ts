export function promiseWithTimeout<T>(
  promise: Promise<T>,
  ms: number,
  timeoutError = new Error('Promise timed out'),
): Promise<T> {
  // create a promise that rejects in milliseconds
  const timeout = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(timeoutError);
    }, ms);
  });

  // returns a race between timeout and the passed promise
  return Promise.race<T>([promise, timeout]);
}
export async function retry<T = any>(
  promiseFactory: (...args: any) => Promise<T>,
  retryCount = 3,
): Promise<T> {
  try {
    return await promiseFactory();
  } catch (error) {
    console.debug(`[retring] ${retryCount}`);
    console.error(error);
    if (retryCount <= 0) {
      throw error;
    }
    return await retry(promiseFactory, retryCount - 1);
  }
}
