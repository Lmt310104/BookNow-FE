import { Order } from "@/types/order";
import { Button } from "../ui/button";
import image from "@/assets/placeholder.svg";
import React from "react";
import { ORDER_STATUS } from "@/common/constants/order";
import { OrderStatus } from "@/common/enums";
import { useNavigate } from "react-router-dom";
import { OrderItemRow } from "./order-item-row";
import SectionCard from "../shared/section-card";

interface OrderRowProps {
  data: Order;
}

export const OrderRow: React.FC<OrderRowProps> = ({ data }) => {
  console.log(data);
  const navigate = useNavigate();
  const handleShowDetail = () => {
    navigate(`/customer/purchase/${data.id}`);
  };
  return (
    <SectionCard>
      <div className="flex flex-row justify-between p-4">
        <span>{`Ma Don Hang: ${data.id}`}</span>
        <span>{ORDER_STATUS[data.status]}</span>
      </div>
      <div onClick={handleShowDetail}>
        {data.OrderItems.map((item, index) => {
          return <OrderItemRow key={index} data={item} />;
        })}
      </div>
      <div className="w-full  flex flex-col gap-4 p-4 items-end">
        <div>{`Tong tien: ${data.total_price}`}</div>
        {data.status === OrderStatus.PENDING && (
          <Button variant="outline">Huy don hang</Button>
        )}
      </div>
    </SectionCard>
  );
};
