import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Review } from 'src/review/review.model';

class ProductCharacteristic {
  @Prop()
  name: string;

  @Prop()
  value: string;
} 

@Schema({ timestamps: true, _id: true })
export class Product extends Document {

  @Prop()
  image: string;

  @Prop()
  title: string;
  
  @Prop()
  price: number;

  @Prop()
  oldPrice?: number;

  @Prop()
  credit: number;

  @Prop()
  calculatedRating: number;

  @Prop()
  description: string;

  @Prop()
  advantages: string;

  @Prop()
  disAdvantages: string;

  @Prop({ type: () => [String] })
  categories: string[];

  @Prop({ type: () => [String] })
  tags: string[];

  @Prop({ type: () => [ProductCharacteristic], _id: false })
  characteristics: ProductCharacteristic[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
