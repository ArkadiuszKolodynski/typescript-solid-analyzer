import * as rimraf from 'rimraf';
import { Logger } from '@nestjs/common';

export function cleanup(path: string): void {
  rimraf(path, (err) => {
    if (err) Logger.error(err.name, err.stack);
  });
}

// export function cleanup(path: string): Promise<void> {
//   return new Promise((resolve, reject) => {
//     rimraf(path, (err) => {
//       if (err) {
//         reject(err);
//         return;
//       }
//       resolve();
//     });
//   });
// }
