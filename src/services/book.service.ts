import { api } from "@/lib/api-client";
import { ResFetchAllBooks, ResFetchDetailBook, ResFetchUpdateBook } from "@/types/book";
class BookService {
//   async addNewBook(data) {
//     api.post(".book/create", data);
//   }
  async fetchBookById(id:string): Promise<ResFetchDetailBook> {
    return await api.get(`/books/${id}`)
  }
  async fetchAllBooks() : Promise<ResFetchAllBooks> {
    return await api.get("/books/get-all")
  }
  async updateBookById(id: string) : Promise<ResFetchUpdateBook> {
    return await api.patch(`/books/update/${id}`)
  }
  async storeBook() {}
}

export default new BookService();
