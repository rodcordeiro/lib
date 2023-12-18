interface ObjectType extends Object {
  [key: string]: any;
}
/**
 * Transforms object keys to lowercase
 * @param {Array} data *-> Array of objects to pass or object to be passed*
 * */
export function minimizer(
  data: Array<ObjectType> | ObjectType,
): Array<any> | any {
  if (Array.isArray(data)) {
    return data.map((item) =>
      Object.fromEntries(
        Object.entries(item).map((pair) => [
          pair[0].toLowerCase(),
          pair[1] === -1 ? '-' : pair[1],
        ]),
      ),
    );
  }
  return Object.fromEntries(
    Object.entries(data).map((pair) => [
      pair[0].toLowerCase(),
      pair[1] === -1 ? '-' : pair[1],
    ]),
  );
}

function createBatch<T>(data: T[], batchLength: number) {
  const batch: [T[]] = [] as unknown as [T[]];
  let arr: T[] = [];
  data.map((item, index) => {
    if (arr.length === batchLength) {
      batch.push(arr);
      arr = [];
    }
    if (index === data.length - 1) {
      arr.push(item);
      batch.push(arr);
      return;
    }

    arr.push(item);
  });
  return batch;
}
export async function asyncBatchProcess<T = unknown>(
  data: T[],
  cb: (batch: T[]) => Promise<void>,
  batchLength = 10,
  filter?: (item: T, index?: number, array?: Array<T>) => boolean,
) {
  const batchData = filter
    ? createBatch(data.filter(filter), batchLength)
    : createBatch(data, batchLength);
  // eslint-disable-next-line no-restricted-syntax
  for await (const batch of batchData) {
    await cb(batch);
  }
}
export function batchProcess<T = unknown>(
  data: T[],
  cb: (batch: T[]) => void,
  batchLength = 10,
  filter?: (item: T, index?: number, array?: Array<T>) => boolean,
) {
  const batchData = filter
    ? createBatch(data.filter(filter), batchLength)
    : createBatch(data, batchLength);
  // eslint-disable-next-line no-restricted-syntax
  for (const batch of batchData) {
    cb(batch);
  }
}
export function process<T = unknown>(
  data: T[],
  cb: (batch: T) => void,
  filter?: (item: T, index?: number, array?: Array<T>) => boolean,
) {
  const array = filter ? data.filter(filter) : data;
  // eslint-disable-next-line no-restricted-syntax
  for (const batch of array) {
    cb(batch);
  }
}
export async function asyncProcess<T = unknown>(
  data: T[],
  cb: (batch: T) => Promise<void>,
  filter?: (item: T, index?: number, array?: Array<T>) => boolean,
) {
  const array = filter ? data.filter(filter) : data;
  // eslint-disable-next-line no-restricted-syntax
  for await (const batch of array) {
    await cb(batch);
  }
}
