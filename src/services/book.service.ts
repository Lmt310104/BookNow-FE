import { BookStatus } from "@/common/enums";
import { api } from "@/lib/api-client";
import { Page } from "@/types/api";
import { BookDetail, CreateBookDetail, ResGetAllBooks, ResGetBookById } from "@/types/book";

class BookService {
  async createBook(data: CreateBookDetail) {
    const formData = new FormData();
    formData.append("description", data.description);
    formData.append("categoryId", data.categoryId);
    formData.append("title", data.title);
    formData.append("price", data.price.toString());
    formData.append("stockQuantity", data.stockQuantity.toString());
    formData.append("entryPrice", data?.entryPrice.toString());
    formData.append("author", "John");
    if (data.images && data.images.length > 0) {
      data.images.forEach((image) => {
        formData.append("images", image);
      });
    }
    return api.post("/books/create", formData);
  }

  async getAllBooks({ page, take }: Page, status: string): Promise<ResGetAllBooks> {
    if(status=== BookStatus.ACTIVE || status === BookStatus.INACTIVE){
    return api.get(`/books/get-all?page=${page}&take=${take}&status=${status}`);
  } else {
    return api.get(`/books/get-all?page=${page}&take=${take}`);
  }
}

  async getBookById(id: string): Promise<ResGetBookById> {
    return api.get(`books/get-one/${id}`);
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
    // if (data.image) {
    //   formData.append("image", data.image);
    // }
    return api.patch(`/books/update/${data.id}`, formData);
  }

  async activeBookById(id: string){
    return api.post(`/books/active/${id}`);
  }

  async inactiveBookById(id: string){
    return api.post(`/books/inactive/${id}`);
  }
}

export default new BookService();
