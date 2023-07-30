import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Product } from 'src/product/product.model';

@Schema({ timestamps: true, _id: true })
export class Review extends Document {
  @Prop()
  fullName: string;

  @Prop()
  title: string;

  @Prop()
  description: string;
  
  @Prop()
  rating: number;

  @Prop()
  productId: Types.ObjectId;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
