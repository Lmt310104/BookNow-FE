import { api } from "@/lib/api-client";
import { ResGetOrderById, ResGetOrdersByUser } from "@/types/order";

class OrderService {
  async getOrdersByUser(): Promise<ResGetOrdersByUser> {
    return api.get("orders/get-all");
  }

  async getOrderDetail(id: string): Promise<ResGetOrderById> {
    return api.get(`orders/get-details/${id}`);
  }

  async getOrdersByAdmin(): Promise<ResGetOrdersByUser> {
    return api.get("orders/list");
  }

  async getOrderDetailByAdMin(id: string):Promise<ResGetOrderById> {
    return api.get(`orders/get-details-by-admin/${id}`);
  }
}

export default new OrderService();
