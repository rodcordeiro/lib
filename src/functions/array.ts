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

export function groupByFields<T>(
  array: Array<T>,
  f: (item: T) => Array<any>,
): Array<T[]> {
  /*
    params description :
    array : array of data to group e.g. : [{...}, {...}]       
        f : function which return the array of fields 
        e.g. :  (item) => {
            return [itemField1, itemField2];
        }
    */
  var groups: { [key: string]: T[] } = {};
  array.forEach((o) => {
    var group = JSON.stringify(f(o));
    groups[group] = groups[group] || [];
    groups[group].push(o);
  });

  return Object.keys(groups).map((group) => {
    return groups[group];
  });
}

/**
 * split array into chunks
 * @param array - array to split
 * @param chunkSize - chunk size
 * @returns
 */
export function splitArray<T>(array: Array<T>, chunkSize: number) {
  const chunks = Array(Math.ceil(array.length / chunkSize))
    .fill(1)
    .map((_, index) => index * chunkSize)
    .map((begin) => array.slice(begin, begin + chunkSize));
  return chunks;
}

export async function asyncBatchProcess<T = unknown>(
  data: T[],
  cb: (batch: T[]) => Promise<void>,
  batchLength = 10,
  filter?: (item: T, index?: number, array?: Array<T>) => boolean,
) {
  const batchData = filter
    ? splitArray(data.filter(filter), batchLength)
    : splitArray(data, batchLength);
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
    ? splitArray(data.filter(filter), batchLength)
    : splitArray(data, batchLength);
  // eslint-disable-next-line no-restricted-syntax
  for (const batch of batchData) {
    cb(batch);
  }
}
export function process<T = unknown>(
  data: T[],
  cb: (batch: T) => T | void,
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
  cb: (batch: T) => Promise<T | void>,
  filter?: (item: T, index?: number, array?: Array<T>) => boolean,
) {
  const array = filter ? data.filter(filter) : data;
  // eslint-disable-next-line no-restricted-syntax
  for await (const batch of array) {
    await cb(batch);
  }
}
