import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  providers: [FileService],
  controllers: [FileController],
  imports: [ServeStaticModule.forRoot({
    rootPath: 'public',
    serveRoot: '/api/v1/static'
  })]
})
export class FileModule {}
