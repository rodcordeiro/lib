// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Readable } from 'node:stream';

// export function customStream() {
//   const streamFunc: any = {}; //process.stdout works however
//   streamFunc.writable = true;
//   streamFunc.write = function (data: any, ...rest: any) {
//     console.debug(data);
//     return data;
//   };
//   streamFunc.on = function (
//     _event: string,
//     _listener: (src?: Readable & Error) => void,
//   ) {
//     // console.debug('on', event, listener);
//     // callback();
//   };

//   streamFunc.on('data', (event: any, listener: (data: any) => void) =>
//     listener(event),
//   );
//   streamFunc.on('error', (err: Error) => console.error(err));
//   streamFunc.once = function (
//     _event: string,
//     _listener: (src?: Readable & Error) => void,
//   ) {
//     // console.debug('once', event);
//     // callback();
//   };
//   streamFunc.once = function (
//     _event: 'finish',
//     _listener: (src?: Readable & Error) => void,
//   ) {
//     // console.debug('finished', _event);
//     // listener();
//   };
//   streamFunc.end = function (event: string, ...callback: any) {
//     console.debug('end', event, callback);
//     // callback();
//   };
//   streamFunc.emit = function (event: string, callback: () => void) {
//     console.debug('emit', event, callback);
//     // callback();
//   };
//   // streamFunc.addListener = function (
//   //   event: string,
//   //   listener: (_src?: Readable & Error) => void
//   // ) {
//   //   console.log('addListener', event);
//   //   // listener();
//   // };
//   // streamFunc.removeListener = function (
//   //   _event: string,
//   //   _listener: (src?: Readable & Error) => void
//   // ) {
//   //   console.log('removeListener');
//   //   // listener();
//   // };
//   return streamFunc;
// }
