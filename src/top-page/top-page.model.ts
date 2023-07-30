import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum TopLevelCategory {
  Courses,
  Service,
  Books,
  Products,
}

export class Hhdata {
  @Prop()
  countNumber: number;

  @Prop()
  juniorSalary: number;

  @Prop()
  middleSalary: number;

  @Prop()
  seniorsalary: number;
}

export class TopPageAdvantage {
  @Prop()
  title: string;

  @Prop()
  description: string;
}

@Schema({ timestamps: true, _id: true })
export class TopPage {

  @Prop({ enum: TopLevelCategory })
  firstLevelCategory: TopLevelCategory;

  @Prop()
  secondCategory: string;

  @Prop({ unique: true })
  alias: string;

  @Prop()
  title: string;
  
  @Prop()
  category: string;

  @Prop({ type: () => Hhdata })
  hh?: Hhdata;

  @Prop({ type: () => [TopPageAdvantage] })
  advantages: TopPageAdvantage[];

  @Prop()
  seoText: string;

  @Prop()
  tagTitle: string;

  @Prop(({ type: [String] }))
  tags: string[];
}

export const TopPageSchema = SchemaFactory.createForClass(TopPage);
