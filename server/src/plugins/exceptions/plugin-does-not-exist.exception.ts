import { HttpException, HttpStatus } from '@nestjs/common';
import { cleanup } from 'src/common/utils/cleanup.utils';

export class PluginDoesNotExistException extends HttpException {
  constructor(directoriesToCleanup?: string[]) {
    super('Plugin does not exist', HttpStatus.BAD_REQUEST);

    if (directoriesToCleanup) {
      directoriesToCleanup.forEach((directory) => {
        cleanup(directory);
      });
    }
  }
}
