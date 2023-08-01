import { Injectable } from '@nestjs/common';
import { FileElementResponse } from './dto/file-response';
import { format } from 'date-fns';
import { ensureDir, writeFile } from 'fs-extra';

@Injectable()
export class FileService {

  async saveFile(file: Express.Multer.File): Promise<FileElementResponse> {
    const dateFolder = format(new Date(), 'yyyy/MM/dd');
    const uploadFolder = `public/${dateFolder}`;
    await ensureDir(uploadFolder);

    const filenameWithoutSpace = file.originalname.replace(/\s+/g, '');
    await writeFile(`${uploadFolder}/${filenameWithoutSpace}`, file.buffer);
    const res: FileElementResponse = { url: `${uploadFolder}/${filenameWithoutSpace}`, filename: filenameWithoutSpace };
    return res;
  }
}
