import mongoose, { Model } from 'mongoose';
import { Book } from './schemas/book.schema';
import { Query } from 'express-serve-static-core';
import { User } from '../auth/schemas/user.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
export declare class BookService {
    private readonly bookModel;
    constructor(bookModel: Model<Book>);
    findAll(query: Query): Promise<Book[]>;
    create(book: CreateBookDto, user: User): Promise<Book>;
    findById(id: string): Promise<Book>;
    updateById(id: string, book: UpdateBookDto): Promise<Book | null>;
    deleteById(id: string): Promise<Book | null>;
    addImages(id: string, images: any[]): Promise<mongoose.Document<unknown, {}, Book, {}, {}> & Book & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
}
