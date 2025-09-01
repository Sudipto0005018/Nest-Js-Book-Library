import { Model } from 'mongoose';
import { Book } from './schemas/book.schema';
export declare class BookService {
    private readonly bookModel;
    constructor(bookModel: Model<Book>);
    findAll(): Promise<Book[]>;
    create(book: Book): Promise<Book>;
    findById(id: string): Promise<Book>;
    updateById(id: string, book: Book): Promise<Book | null>;
    deleteById(id: string): Promise<Book | null>;
}
