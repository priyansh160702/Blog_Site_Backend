import { join } from 'path';

export const fileDestination = (folder: string) => {
  return join(process.cwd(), 'public', folder);
};
