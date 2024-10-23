import { api } from "@/lib/api-client";
import { BookDetail } from "@/types/book";

class BookService {
  async createBook(data: BookDetail) {
    console.log(data)
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
}

export default new BookService();
