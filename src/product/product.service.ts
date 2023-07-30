import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.model';
import { Model, Types } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { NOT_FOUND } from './product.constants';
import { Review } from 'src/review/review.model';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private readonly productModel:  Model<Product>) {}

  async createProduct(dto: CreateProductDto): Promise<Product> {
    return this.productModel.create(dto);
  }

  async findProductById(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) throw new HttpException(NOT_FOUND, HttpStatus.NOT_FOUND);
    return product;
  }

  async getAllProducts(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async deleteProductById(id: string): Promise<void> {
    const product = await this.productModel.findById(id);
    if (!product) throw new HttpException(NOT_FOUND, HttpStatus.NOT_FOUND);
    this.productModel.findByIdAndRemove(id).exec();
  }

  async updateProductById(id: string, dto: CreateProductDto): Promise<Product> {
    const product = await this.productModel.findById(id);
    if (!product) throw new HttpException(NOT_FOUND, HttpStatus.NOT_FOUND);
    return this.productModel.findByIdAndUpdate(id, dto, {new: true }).exec();
  }

  async findProductWithReviews(category: string, limit: number) {
    return this.productModel
      .aggregate()
      .match({
        categories: category
      })
      .sort({ _id: 1 })
      .limit(limit)
      .lookup({
        from: 'Review',
        localField: '_id',
        foreignField: 'productId',
        as: 'reviews'
      })
      .addFields({
        reviewCount: { $size: '$reviews' },
        reviewAvg: { $avg: '$reviews.rating' }
      })
      .exec() as unknown | Product & { reviews: Review[], reviewCount: number, reviewAvg: number }[];
  }
}
