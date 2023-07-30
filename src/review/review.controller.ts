import { Body, Controller, Delete, Get, HttpCode, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review';
import { ReviewService } from './review.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { IdValidationPipe } from 'src/pipes/id-validation-pipe';

@Controller('/review')
export class ReviewController {

  constructor(private readonly reviewService: ReviewService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(201)
  @Post()
  async create(@Body() dto: CreateReviewDto) {
    return this.reviewService.create(dto);
  }

  @UseGuards(new JwtAuthGuard)
  @HttpCode(204)
  @Delete('/:id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    return this.reviewService.delete(id);
  }

  @HttpCode(200)
  @Get('/:productId')
  async getReviewByProductId(@Param('productId', IdValidationPipe) productId: string) {
    return this.reviewService.findReviewByProductId(productId);
  }
}
