import { Request } from 'express';
import { v4 as uuid } from 'uuid';

export const fileNameEditor = (
  req: Request,
  file: any,
  cb: (error: any, filename) => void,
) => {
  cb(null, `${uuid()}${file.originalname}`);
};
