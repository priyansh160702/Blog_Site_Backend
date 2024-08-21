import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { fileDestination } from './file-destination';
import { fileNameEditor } from './file-name-editor';
import { fileFilter } from './file-filter';

export const fileInceptor = (folder: string) => {
  return FileInterceptor('image', {
    storage: diskStorage({
      destination: (req, file, cb) => {
        cb(null, fileDestination(folder));
      },
      filename: fileNameEditor,
    }),
    fileFilter,
  });
};
