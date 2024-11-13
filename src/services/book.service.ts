import { BookStatus } from "@/common/enums";
import { api } from "@/lib/api-client";
import { Page } from "@/types/api";
import {
  BookQuery,
  CreateBookDetail,
  ResGetAllBooks,
  ResGetBookById,
  UpdateBookDetail,
} from "@/types/book";
import { trimObjectAttributes } from "@/utils/format";

class BookService {
  async createBook(data: CreateBookDetail) {
    const trimmedData = trimObjectAttributes(data);
    const formData = new FormData();
    formData.append("description", trimmedData.description);
    formData.append("categoryId", trimmedData.categoryId);
    formData.append("title", trimmedData.title);
    formData.append("price", trimmedData.price.toString());
    formData.append("stockQuantity", trimmedData.stockQuantity.toString());
    formData.append("entryPrice", trimmedData?.entryPrice.toString());
    formData.append("author", "John");
    if (trimmedData.images && trimmedData.images.length > 0) {
      trimmedData.images.forEach((image) => {
        formData.append("images", image);
      });
    }
    return api.post("/books/create", formData);
  }

  async getAllBooks(
    { page, take }: Page,
    query: BookQuery,
  ): Promise<ResGetAllBooks> {
    let url = `/books/get-all?page=${page}&take=${take}`;
    const trimmedData = trimObjectAttributes(query);
    if (trimmedData?.status && trimmedData.status in BookStatus) {
      url += `&status=${trimmedData.status}`;
    }
    if (trimmedData.title) {
      url += `&title=${trimmedData.title}`
    }
    if (trimmedData?.order)
      url += `&order=${trimmedData.order}`;
    if (trimmedData?.sortBy)
      url += `&sortBy=${trimmedData.sortBy}`;
    if (trimmedData?.max_price)
      url += `&max_price=${trimmedData.max_price}`;
    if (trimmedData?.min_price)
      url += `&min_price=${trimmedData.min_price}`;
    if (trimmedData?.min_star)
      url += `&min_star=${trimmedData.min_star}`;
    if (trimmedData?.categoryId)
      url += `&categoryId=${trimmedData.categoryId}`;
    return api.get(url);
  }

  async getBookById(id: string): Promise<ResGetBookById> {
    return api.get(`books/get-one/${id}`);
  }

  async updateBookById(data: UpdateBookDetail) {
    const formData = new FormData();
    const trimmedData = trimObjectAttributes(data);
    formData.append("description", trimmedData.description);
    formData.append("categoryId", trimmedData.categoryId);
    formData.append("title", trimmedData.title);
    formData.append("price", trimmedData.price.toString());
    formData.append("stockQuantity", trimmedData.stockQuantity.toString());
    formData.append("entryPrice", trimmedData.entryPrice.toString());
    formData.append("author", "John");
    if (trimmedData.image_url && trimmedData.image_url.length > 0) {
      trimmedData.image_url.forEach((image) => {
        formData.append("image_url[]", image);
      });
    }

    if (trimmedData.images && trimmedData.images.length > 0) {
      trimmedData.images.forEach((image) => {
        formData.append("images_update", image);
      });
    }
    return api.patch(`/books/update/${trimmedData.id}`, formData);
  }

  async activeBookById(id: string) {
    return api.post(`/books/active/${id}`);
  }

  async inactiveBookById(id: string) {
    return api.post(`/books/inactive/${id}`);
  }
}

export default new BookService();
