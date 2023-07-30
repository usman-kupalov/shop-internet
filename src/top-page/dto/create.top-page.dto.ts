import { IsArray, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { TopLevelCategory } from '../top-page.model';
import { Type } from 'class-transformer';

export class HhdataDto {
  @IsNumber()
  countNumber: number;

  @IsNumber()
  juniorSalary: number;

  @IsNumber()
  middleSalary: number;

  @IsNumber()
  seniorsalary: number;
}

export class TopPageAdvantageDto {
  @IsString()
  title: string;

  @IsString()
  description: string;
}

export class CreateTopPageDto {
  @IsEnum(TopLevelCategory)
  firstLevelCategory: TopLevelCategory;
  
  @IsString()
  secondCategory: string;

  @IsString()
  alias: string;

  @IsString()
  title: string

  @IsString()
  category: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => HhdataDto)
  hh?: HhdataDto;

  @IsArray()
  @ValidateNested()
  @Type(() => TopPageAdvantageDto)
  advantages: TopPageAdvantageDto[];

  @IsString()
  seoText: string;

  @IsString()
  tagTitle: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];
}