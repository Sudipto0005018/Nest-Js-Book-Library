import { Model } from 'mongoose';
import { Book } from './schemas/book.schema';
import { Query } from 'express-serve-static-core';
import { User } from '../auth/schemas/user.schema';
export declare class BookService {
    private readonly bookModel;
    constructor(bookModel: Model<Book>);
    findAll(query: Query): Promise<Book[]>;
    create(book: Book, user: User): Promise<Book>;
    findById(id: string): Promise<Book>;
    updateById(id: string, book: Book): Promise<Book | null>;
    deleteById(id: string): Promise<Book | null>;
}
