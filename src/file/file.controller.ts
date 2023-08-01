import { Controller, HttpCode, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileElementResponse } from './dto/file-response';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';

@Controller('/file')
export class FileController {
  constructor(private fileService: FileService) {} 

  @HttpCode(201)
  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async createFile (@UploadedFile() file: Express.Multer.File): Promise<FileElementResponse> {
    return this.fileService.saveFile(file);
  }
}
