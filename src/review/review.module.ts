import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from './review.model';
import { ReviewService } from './review.service';

@Module({
  controllers: [ReviewController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Review.name,
        schema: ReviewSchema,
        collection: 'Review'
      }
    ])
  ],
  providers: [ReviewService]
})
export class ReviewModule {}
