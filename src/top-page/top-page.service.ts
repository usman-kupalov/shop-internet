import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TopLevelCategory, TopPage } from './top-page.model';
import { CreateTopPageDto } from './dto/create.top-page.dto';
import { Model } from 'mongoose';
import { NOT_FOUND } from './top-page.constants';

@Injectable()
export class TopPageService {
  constructor(@InjectModel(TopPage.name) private readonly topPageModel: Model<TopPage>) {}

  async create(dto: CreateTopPageDto): Promise<TopPage> {
    return this.topPageModel.create(dto);
  }

  async findById(id: string): Promise<TopPage> {
    const topPage = await this.topPageModel.findById(id).exec();
    if (!topPage) throw new HttpException(NOT_FOUND, HttpStatus.NOT_FOUND);
    return topPage;
  }

  async findCategoryByFirstLevelCategory(firstLevelCategory: TopLevelCategory): Promise<TopPage[]> {
    const a = await this.topPageModel
      .aggregate()
      .match({
        $expr: { firstLevelCategory }
      })
      .group({
        _id: { secondCategory: '$secondCategory' },
        pages: { $push: { alias: '$alias', title: '$title' } }
      })
      .exec();
      return a;
  }

  async findTopPageByAlias(alias: string): Promise<TopPage> {
    const topPage = await this.topPageModel.findOne({ alias }).exec();
    if (!topPage) throw new HttpException(NOT_FOUND, HttpStatus.NOT_FOUND);
    return topPage;
  }

  async updateTopPage(id: string, dto: CreateTopPageDto): Promise<TopPage> {
    const topPage = await this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    if (!topPage) throw new HttpException(NOT_FOUND, HttpStatus.NOT_FOUND);
    return topPage;
  }

  async deleteProductById(id: string): Promise<void> {
    const topPage = await this.topPageModel.findByIdAndDelete(id).exec();
    if (!topPage) throw new HttpException(NOT_FOUND, HttpStatus.NOT_FOUND)
  }
}
