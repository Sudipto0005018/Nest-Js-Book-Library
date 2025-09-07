/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../../auth/schemas/user.schema';

export enum Category {
  ADVENTURE = 'Adventure',
  CRIME = 'Crime',
  FANTASY = 'Fantasy',
  CLASSICS = 'Classics',
}

@Schema({ timestamps: true })
export class Book {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  author: string;

  @Prop()
  price: number;

  @Prop()
  category: Category;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

@Prop([
    {
      filename: String,
      path: String,
      mimetype: String,
      size: Number,
    },
],
)
  images: {
    filename: string;
    path: string;
    mimetype: string;
    size: number;
  }[];
}
export const BookSchema = SchemaFactory.createForClass(Book);
