import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put,Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Product } from './product.model';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { IdValidationPipe } from 'src/pipes/id-validation-pipe';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';

@Controller('/product')
export class ProductController {

  constructor(private readonly productService: ProductService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  async create(@Body() dto: CreateProductDto) {
    return this.productService.createProduct(dto);
  }

  // @HttpCode(200)
  // @Get('/:id')
  // async getProduct(@Param('id') id: string) {
  //   return this.productService.findProductById(id);
  // }

  @HttpCode(200)
  @Get()
  async getAllProducts() {
    return this.productService.getAllProducts();
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put('/:id')
  async update(@Param('id', IdValidationPipe) id: string, @Body() dto: Product) {
    return this.productService.updateProductById(id, dto);
  }

  @UsePipes(JwtAuthGuard)
  @HttpCode(204)
  @Delete('/:id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    this.productService.deleteProductById(id);
  }

  @HttpCode(200)
  @Get('/reviews')
  async findProductWithReview(@Query('category') category: string, @Query('limit', ParseIntPipe) limit: number) {
    return this.productService.findProductWithReviews(category, limit);
  }
}
