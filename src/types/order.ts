import { OrderStatus } from "@/common/enums";
import { Meta } from "./api";
import { ResBookDetail } from "./book";
import { User } from "./user";

export interface OrderItem {
  book: ResBookDetail;
  book_id: string;
  id: string;
  order_id: string;
  price: number;
  quantity: number;
  total_price: number;
}

export interface Order {
  total_price: number;
  status: OrderStatus;
  id: string;
  address: string;
  full_name: string;
  phone_number: string;
  user_id: string;
  OrderItems: Array<OrderItem>;
  user: {
    email: string;
    full_name: string;
    id: string;
  };
}

export interface ResGetOrdersByUser {
  data: {
    data: Array<Order>;
    meta: Meta;
  };
}

export interface ResGetOrderById {
  data: {
    data: Order;
  };
}
