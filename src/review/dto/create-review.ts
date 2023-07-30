import { IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  fullName: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  @Max(5)
  @Min(1)
  rating: number;

  @IsString()
  productId: string;
}