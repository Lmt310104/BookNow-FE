import { api } from "@/lib/api-client";
import { ResGetOrderById, ResGetOrdersByUser } from "@/types/order";

class OrderService {
  async getOrdersByUser(): Promise<ResGetOrdersByUser> {
    return api.get("orders/get-all");
  }

  async getOrderById(id: string): Promise<ResGetOrderById> {
    return api.get(`orders/get-details/${id}`);
  }
}

export default new OrderService();
