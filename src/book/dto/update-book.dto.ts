/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */

import {
  IsArray,
  IsEmpty,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Category } from '../schemas/book.schema';
import { User } from '../../auth/schemas/user.schema';

class ImageDto {
  @IsString()
  filename: string;

  @IsString()
  path: string;

  @IsString()
  mimetype: string;

  @IsNumber()
  size: number;
}

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  readonly title?: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @IsString()
  readonly author?: string;

  @IsOptional()
  @IsNumber()
  readonly price?: number;

  @IsOptional()
  @IsEnum(Category, { message: 'Please enter correct Category.' })
  readonly category?: Category;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageDto)
  readonly images?: ImageDto[];

  @IsEmpty({ message: 'You cannot pass userId' })
  readonly user: User;
}
