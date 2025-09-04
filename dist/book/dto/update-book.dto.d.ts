import { Category } from '../schemas/book.schema';
import { User } from '../../auth/schemas/user.schema';
export declare class UpdateBookDto {
    readonly title: string;
    readonly description: string;
    readonly author: string;
    readonly price: number;
    readonly category: Category;
    readonly user: User;
}
