import { ORDER_STATUS } from "@/common/constants/order";
import { OrderStatus } from "@/common/enums";
import { api } from "@/lib/api-client";
import { Page } from "@/types/api";
import {
  CreateOrder,
  ResGetOrderById,
  ResGetOrdersByUser,
} from "@/types/order";

class OrderService {
  async getOrdersByUser(
    { page, take }: Page,
    status: string,
  ): Promise<ResGetOrdersByUser> {
    if (status === "all")
      return api.get(`orders/get-all?page=${page}&take=${take}`);
    else
      return api.get(
        `orders/get-all?page=${page}&take=${take}&status=${status}`,
      );
  }

  async getOrderDetail(id: string): Promise<ResGetOrderById> {
    return api.get(`orders/get-details/${id}`);
  }

  async getOrdersByAdmin(
    { page, take }: Page,
    status: string,
  ): Promise<ResGetOrdersByUser> {
    if (status in ORDER_STATUS) {
      return api.get(`/orders/list?page=${page}&take=${take}&status=${status}`);
    } else {
      return api.get(`/orders/list?page=${page}&take=${take}`);
    }
  }

  async getOrderDetailByAdMin(id: string): Promise<ResGetOrderById> {
    return api.get(`orders/get-details-by-admin/${id}`);
  }

  async cancelOrder(id: string) {
    return api.patch(`orders/${id}/cancel-order`);
  }

  async createOrder(data: CreateOrder) {
    return api.post("orders/create", data);
  }

  async updateOrderStatus({ id, status }: { id: string; status: OrderStatus }) {
    return api.post(`orders/status/update/${id}`, { status: status });
  }
}

export default new OrderService();
