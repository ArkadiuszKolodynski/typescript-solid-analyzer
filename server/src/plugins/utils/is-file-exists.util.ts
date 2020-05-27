import { exists } from 'fs';

export function isFileExists(pathToFile: string): Promise<boolean> {
  return new Promise((resolve) => {
    exists(pathToFile, (exists) => {
      resolve(exists);
    });
  });
}
