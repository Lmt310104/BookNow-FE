import { Meta } from "./api";
import { Category } from "./category";

export interface BookData {
    id: string;
    title: string;
    author: string;
    categoryId: string;
    Category: Category;
    entryPrice: number;
    price: number;
    stock_quantity: number;
    description: string;
    image_url: string[];
    status: string;
}

export interface ResFetchAllBooks { 
    data: {
        data: Array<BookData>;
        meta: Meta;
    };
}
export interface ResFetchDetailBook {
    data: {
        data: BookData
    }
}
export interface ResFetchUpdateBook { 
    data: {
        data: BookData
    }
}

export interface ResFetchCreateBook {
    data: {
        data: BookData
    }
}