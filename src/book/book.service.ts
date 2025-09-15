/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Book } from './schemas/book.schema';

import { Query } from 'express-serve-static-core';
import { User } from '../auth/schemas/user.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { v2 as Cloudinary } from 'cloudinary';
@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private readonly bookModel: Model<Book>,
    @Inject('CLOUDINARY') private cloudinary: typeof Cloudinary,
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

  async create(book: CreateBookDto, user: User): Promise<Book> {
    const data = Object.assign(book, { user: user._id });
    return await this.bookModel.create(data);
  }

  async findById(id: string): Promise<Book> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Please Enter Correct id.');
    }

    const book = await this.bookModel.findById(id);

    if (!book) {
      throw new NotFoundException('Book Not Found!');
    }

    return book;
  }

  async updateById(id: string, book: UpdateBookDto): Promise<Book | null> {
    return await this.bookModel.findByIdAndUpdate(id, book, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<Book | null> {
    return await this.bookModel.findByIdAndDelete(id);
  }

  /** upload array of files to Cloudinary and push into images[] */
  async addImages(id: string, files: Express.Multer.File[]) {
    if (!mongoose.isValidObjectId(id))
      throw new BadRequestException('Invalid book id');

    // Upload each file to Cloudinary
    const uploadPromises = files.map((file) =>
      this.cloudinary.uploader.upload(file.path, {
        folder: 'books', // optional folder in Cloudinary
        resource_type: 'image',
      }),
    );
    const uploadResults = await Promise.all(uploadPromises);

    const images = uploadResults.map((res) => ({
      filename: res.original_filename,
      path: res.secure_url,
      mimetype: res.format,
      size: res.bytes,
    }));

    const updatedBook = await this.bookModel.findByIdAndUpdate(
      id,
      { $push: { images: { $each: images } } },
      { new: true },
    );
    if (!updatedBook) throw new BadRequestException('Book not found');
    return updatedBook;
  }
}
