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
  image?: File | null;
  preview?: string;
  categoryId: string;
  id?: string;
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
