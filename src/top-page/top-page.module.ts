import { Module } from '@nestjs/common';
import { TopPageController } from './top-page.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TopPage, TopPageSchema } from './top-page.model';
import { TopPageService } from './top-page.service';

@Module({
  controllers: [TopPageController],
  imports: [
    MongooseModule.forFeature([
      {
        name: TopPage.name,
        schema: TopPageSchema,
        collection: 'TopPage'
      }
    ])
  ],
  providers: [TopPageService]
})
export class TopPageModule {}
