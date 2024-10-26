import { api } from "@/lib/api-client";
import { ResGetOrdersByUser } from "@/types/order";

class OrderService {
  async getOrdersByUser():Promise<ResGetOrdersByUser> {
    return api.get("orders/get-all");
  }
}

export default new OrderService();
