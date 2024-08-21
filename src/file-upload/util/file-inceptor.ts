import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { fileDestination, fileFilter, fileNameEditor } from '../util';

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
