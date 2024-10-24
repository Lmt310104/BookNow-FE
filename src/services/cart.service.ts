import { api } from "@/lib/api-client";
import { CartItem, ResGetCart } from "@/types/cart";

class CartService {
  async addToCart(data: CartItem) {
    return api.post("/carts/add-to-cart", data);
  }

  async getCart(): Promise<ResGetCart> {
    return api.get("/carts/get-all");
  }
}

export default new CartService();
