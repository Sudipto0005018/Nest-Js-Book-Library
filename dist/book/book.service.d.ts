import mongoose, { Model } from 'mongoose';
import { Book } from './schemas/book.schema';
import { Query } from 'express-serve-static-core';
import { User } from '../auth/schemas/user.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { v2 as Cloudinary } from 'cloudinary';
export declare class BookService {
    private readonly bookModel;
    private cloudinary;
    constructor(bookModel: Model<Book>, cloudinary: typeof Cloudinary);
    findAll(query: Query): Promise<Book[]>;
    create(book: CreateBookDto, user: User): Promise<Book>;
    findById(id: string): Promise<Book>;
    updateById(id: string, book: UpdateBookDto): Promise<Book | null>;
    deleteById(id: string): Promise<Book | null>;
    addImages(id: string, files: Express.Multer.File[]): Promise<mongoose.Document<unknown, {}, Book, {}, {}> & Book & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
}
