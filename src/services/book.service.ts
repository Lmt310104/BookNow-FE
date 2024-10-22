import { api } from "@/lib/api-client";

interface BookData {
  title: string;
  author: string;
  categoryId: string;
  entryPrice: number;
  price: number;
  stockQuantity: number;
  description: string;
}

class BookService {
//   async addNewBook(data) {
//     api.post(".book/create", data);
//   }
  async fetchBookById() {}
  async fetchAllBooks() {
    return await api.get("/books/get-all")
  }
  async updateBookById() {}
  async storeBook() {}
}

export default new BookService();
