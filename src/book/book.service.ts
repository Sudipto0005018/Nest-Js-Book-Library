/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './schemas/book.schema';

import { Query } from 'express-serve-static-core';
@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private readonly bookModel: Model<Book>,
  ) {}

  async findAll(query: Query): Promise<Book[]> {
    console.log(query);

    const resPerPage = 2;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const keyword = query.keyword
      ? {
          title: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};
    return await this.bookModel
      .find({ ...keyword })
      .limit(resPerPage)
      .skip(skip)
      .exec();
  }

  async create(book: Book): Promise<Book> {
    return await this.bookModel.create(book);
  }

  async findById(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id);
    if (!book) {
      throw new NotFoundException('Book Not Found!');
    }
    return book;
  }

  async updateById(id: string, book: Book): Promise<Book | null> {
    return await this.bookModel.findByIdAndUpdate(id, book, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<Book | null> {
    return await this.bookModel.findByIdAndDelete(id);
  }
}
