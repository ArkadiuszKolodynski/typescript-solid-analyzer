import { exec } from 'child_process';

export function cloneRepo(url: string, cwd: string): Promise<void> {
  return new Promise((resolve, reject) => {
    exec(`git clone ${url} .`, { cwd }, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}
