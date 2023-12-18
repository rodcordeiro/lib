// import Crypto from 'node:crypto';

// class Encrypter {
//   public validaToken<T = {}>(data: string, token: string) {
//     let key = Crypto.enc.Utf8.parse(token);
//     key = Crypto.MD5(key);
//     key.words.push(key.words[0], key.words[1]);
//     const options = { mode: Crypto.mode.ECB };
//     const decrypted = Crypto.TripleDES.decrypt(
//       {
//         ciphertext: Crypto.enc.Base64.parse(String(data)),
//       },
//       key,
//       options,
//     );
//     const user = decrypted.toString(Crypto.enc.Utf8);
//     return JSON.parse(String(user)) as T;
//   }

//   public encrypt<T = {}>(data: T, token: string): string {
//     let key = Crypto.enc.Utf8.parse(token);
//     key = Crypto.MD5(key);
//     key.words.push(key.words[0], key.words[1]);
//     const user = JSON.stringify(data);
//     const encrypted = Crypto.TripleDES.encrypt(user, key, {
//       mode: Crypto.mode.ECB,
//     });
//     return encrypted.toString();
//   }
// }
// export { Encrypter };
