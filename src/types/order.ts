import { OrderStatus } from "@/common/enums";
import { Meta } from "./api";

export interface Order {
  total_price: number;
  status: OrderStatus;
  id: string;
  address: string;
  full_name: string;
  phone_number: string;
  user_id: string;
}

export interface ResGetOrdersByUser {
  data: {
    data: Array<Order>;
    meta: Meta;
  };
}
