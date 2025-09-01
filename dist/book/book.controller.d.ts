import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
export declare class BookController {
    private readonly bookservice;
    constructor(bookservice: BookService);
    getAllBooks(): Promise<Book[]>;
    createBook(book: CreateBookDto): Promise<Book>;
    getBook(id: string): Promise<Book | null>;
    updateBook(id: string, book: UpdateBookDto): Promise<Book | null>;
    deleteBook(id: string): Promise<Book | null>;
}
