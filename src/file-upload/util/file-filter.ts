import { BadRequestException } from '@nestjs/common';
import { Request } from 'express';

export const fileFilter = (
  req: Request,
  file: any,
  cb: (error: any, valid: boolean) => void,
) => {
  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (!allowedMimeTypes.includes(file.mimetype)) {
    cb(
      new BadRequestException(
        'Invalid file type. Only jpeg, jpg, and png are allowed.',
      ),
      false,
    );
    return;
  }
  cb(null, true);
};
