import mongoose from 'mongoose';
import { User } from '../../auth/schemas/user.schema';
export declare enum Category {
    ADVENTURE = "Adventure",
    CRIME = "Crime",
    FANTASY = "Fantasy",
    CLASSICS = "Classics"
}
export declare class Book {
    title: string;
    description: string;
    author: string;
    price: number;
    category: Category;
    user: User;
    images: {
        filename: string;
        path: string;
        mimetype: string;
        size: number;
    }[];
}
export declare const BookSchema: mongoose.Schema<Book, mongoose.Model<Book, any, any, any, mongoose.Document<unknown, any, Book, any, {}> & Book & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Book, mongoose.Document<unknown, {}, mongoose.FlatRecord<Book>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<Book> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
