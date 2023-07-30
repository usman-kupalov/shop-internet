import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Review } from './review.model';
import { Model } from 'mongoose';
import { CreateReviewDto } from './dto/create-review';
import { REVIEW_NOT_FOUND } from './review.constants';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ReviewService {
  constructor(@InjectModel(Review.name) private readonly reviewModel: Model<Review>) {}

  async create(dto: CreateReviewDto): Promise<Review> {
    return this.reviewModel.create(dto);
  }

  async delete(id: string): Promise<void> {
    const deletedReview = await this.reviewModel.findByIdAndDelete(id).exec();
    if (!deletedReview) throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
  }

  async findReviewByProductId(productId: string): Promise<Review[]> {
    return this.reviewModel.find({ productId: productId }).exec();
  }

  async deleteReviewByProductId(productId: string): Promise<void> {
    const deletedReviews = await this.reviewModel.deleteMany({ productId: productId }).exec();
    if (!deletedReviews) throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}
