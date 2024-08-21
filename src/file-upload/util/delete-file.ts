import { resolve } from 'path';
import { unlink } from 'fs/promises';
import { InternalServerErrorException } from '@nestjs/common';

export const deleteFile = async (filePath) => {
  /*
        The resolve function from the path module in Node.js is used to normalize a path by resolving it to an absolute path. This function converts a relative path or a path with segments like . and .. into a single absolute path.
    */

  const absoluteOldPath = resolve(process.cwd(), filePath);

  try {
    await unlink(absoluteOldPath);
  } catch (err) {
    throw new InternalServerErrorException(
      'Cannot delete prevoius profile photo.',
    );
  }
};
