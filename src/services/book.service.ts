import { api } from "@/lib/api-client";
import { Page } from "@/types/api";
import { BookDetail, ResGetAllBooks, ResGetBookById } from "@/types/book";

class BookService {
  async createBook(data: BookDetail) {
    const formData = new FormData();
    formData.append("description", data.description);
    formData.append("categoryId", data.categoryId);
    formData.append("title", data.title);
    formData.append("price", data.price.toString());
    formData.append("stockQuantity", data.stockQuantity.toString());
    formData.append("entryPrice", data?.entryPrice.toString());
    formData.append("author", data?.author || "");
    if (data.image) {
      formData.append("image", data.image);
    }
    return api.post("/books/create", formData);
  }

  async getAllBooks({ page, take }: Page): Promise<ResGetAllBooks> {
    return api.get(`/books/get-all?page=${page}&take=${take}`);
  }

  async getBookById(id: string): Promise<ResGetBookById> {
    return api.get(`/books/${id}`);
  }

  async updateBookById(data: BookDetail) {
    const formData = new FormData();
    formData.append("description", data.description);
    formData.append("categoryId", data.categoryId);
    formData.append("title", data.title);
    formData.append("price", data.price.toString());
    formData.append("stockQuantity", data.stockQuantity.toString());
    formData.append("entryPrice", data?.entryPrice.toString());
    formData.append("author", data?.author || "");
    if (data.image) {
      formData.append("image", data.image);
    }
    return api.patch(`/books/update/${data.id}`, formData);
  }
}

export default new BookService();
