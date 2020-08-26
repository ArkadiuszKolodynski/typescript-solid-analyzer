import { HttpException, HttpStatus } from '@nestjs/common';
import { cleanup } from 'src/common/utils/cleanup.utils';

export class PluginsIdMismatchException extends HttpException {
  constructor(directoriesToCleanup?: string[]) {
    super('Plugins id mismatch. Cannot update.', HttpStatus.BAD_REQUEST);

    if (directoriesToCleanup) {
      directoriesToCleanup.forEach((directory) => {
        cleanup(directory);
      });
    }
  }
}
