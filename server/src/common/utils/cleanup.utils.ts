import * as rimraf from 'rimraf';

export function cleanup(path: string): Promise<void> {
  return new Promise((resolve, reject) => {
    rimraf(path, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}
