import { Category } from '../schemas/book.schema';
import { User } from '../../auth/schemas/user.schema';
declare class ImageDto {
    filename: string;
    path: string;
    mimetype: string;
    size: number;
}
export declare class UpdateBookDto {
    readonly title?: string;
    readonly description?: string;
    readonly author?: string;
    readonly price?: number;
    readonly category?: Category;
    readonly images?: ImageDto[];
    readonly user: User;
}
export {};
