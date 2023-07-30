import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { TopLevelCategory } from './top-page.model';
import { CreateTopPageDto } from './dto/create.top-page.dto';
import { TopPageService } from './top-page.service';
import { IdValidationPipe } from 'src/pipes/id-validation-pipe';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';

@Controller('/top-page')
export class TopPageController {
  constructor(private readonly topPageService: TopPageService) {}

  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  @Post()
  async create(@Body() dto: CreateTopPageDto) {
    return this.topPageService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Get('/:id')
  async findById(@Param('id', IdValidationPipe) id: string) {
    return this.topPageService.findById(id);
  }

  @HttpCode(200)
  @Get()
  async getAllTopPageByCategory(@Query('firstLevelCategory') firstLevelCategory: TopLevelCategory) {
    return this.topPageService.findCategoryByFirstLevelCategory(firstLevelCategory);
  }

  @HttpCode(200)
  @Get('/:alias/alias')
  async getTopPageByAlias(@Param('alias') alias: string) {
    return this.topPageService.findTopPageByAlias(alias);
  }  

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Put('/:id')
  async update(@Param('id', IdValidationPipe) id: string, @Body() dto: CreateTopPageDto) {
    return this.topPageService.updateTopPage(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  @Delete('/:id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    return this.topPageService.deleteProductById(id);
  }
}
