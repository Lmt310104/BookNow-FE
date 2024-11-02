import { api } from "@/lib/api-client";
import { Page } from "@/types/api";
import { CreateOrder, ResGetOrderById, ResGetOrdersByUser } from "@/types/order";

class OrderService {
  async getOrdersByUser({page, take}: Page, status: string): Promise<ResGetOrdersByUser> {
    if(status==="all")
    return api.get(`orders/get-all?page=${page}&take=${take}`);
  else
    return api.get(`orders/get-all?page=${page}&take=${take}&status=${status}`);
  }

  async getOrderDetail(id: string): Promise<ResGetOrderById> {
    return api.get(`orders/get-details/${id}`);
  }

  async getOrdersByAdmin(): Promise<ResGetOrdersByUser> {
    return api.get("orders/list");
  }

  async getOrderDetailByAdMin(id: string): Promise<ResGetOrderById> {
    return api.get(`orders/get-details-by-admin/${id}`);
  }

  async cancelOrder(id: string) {
    return api.patch(`orders/${id}/cancel-order`);
  }

  async createOrder(data: CreateOrder) {
    return api.post('orders/create', data);
  }

}

export default new OrderService();
