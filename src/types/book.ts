import { BookStatus } from "@/common/enums";
import { Meta } from "./api";
import { Category } from "./category";

export interface Book {
  title: string;
  categoryId: string;
  entryPrice: number;
  price: number;
  description: string;
  author?: string;
}

export interface BookDetail extends Book {
  entryPrice: number;
  description: string;
  stockQuantity: number;
  image?: File | null;
  preview?: string;
}

export interface ResGetBook extends Book {
  Category: Category;
  status: BookStatus;
  image_url: Array<string>;
  id: string;
  entry_price: number;
  stock_quantity: number;
}

export interface ResGetAllBooks extends Response {
  data: {
    data: Array<ResGetBook>;
    meta: Meta;
  };
}
