/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './schemas/book.schema';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private readonly bookModel: Model<Book>,
  ) {}

  async findAll(): Promise<Book[]> {
    return await this.bookModel.find().exec();
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
