import { BookStatus } from "@/common/enums";
import { Meta } from "./api";
import { Category } from "./category";

export interface Book {
  title: string;
  price: number;
  description: string;
  author?: string;
}

export interface BookDetail extends Book {
  entryPrice: number;
  description: string;
  stockQuantity: number;
  images: Array<File>;
  preview?: string;
  categoryId: string;
  id?: string;
}

export interface CreateBookDetail extends Book {
  entryPrice: number;
  description: string;
  stockQuantity: number;
  images: Array<File>;
  categoryId: string;
}

export interface ResBookDetail extends Book {
  Category?: Category;
  status: BookStatus;
  image_url: string[];
  id: string;
  entry_price: number;
  stock_quantity: number;
  category_id: string;
  sold_quantity: number;
  total_reviews: number;
  avg_stars: number;
}

export interface ResGetAllBooks extends Response {
  data: {
    data: Array<ResBookDetail>;
    meta: Meta;
  };
}

export interface ResGetBookById extends Response {
  data: {
    data: ResBookDetail;
  };
}
