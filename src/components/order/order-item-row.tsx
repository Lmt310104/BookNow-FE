import { Order } from "@/types/order";
import { Button } from "../ui/button";
import image from "@/assets/placeholder.svg";
import React from "react";
import { ORDER_STATUS } from "@/common/constants/order";
import { OrderStatus } from "@/common/enums";
import { useNavigate } from "react-router-dom";

interface OrderItemRowProps {
  data: Order;
}

export const OrderItemRow: React.FC<OrderItemRowProps> = ({ data }) => {
  const navigate = useNavigate();
  const handleShowDetail = () => {
    navigate(`/customer/purchase/${data.id}`);
  };
  return (
    <div className="rounded-lg border border-dashed shadow-sm w-full bg-white gap-4">
      <div className="flex flex-row justify-between p-4">
        <span>{`Ma Don Hang: ${data.id}`}</span>
        <span>{ORDER_STATUS[data.status]}</span>
      </div>
      <div
        className="flex flex-row p-4 border-y border-grey-100 gap-4 hover:cursor-pointer hover:bg-gray-50"
        onClick={handleShowDetail}
      >
        <div className="overflow-hidden aspect-square rounded-md h-[64px]">
          <img
            alt="Product image"
            className="object-cover w-full h-full"
            src={image}
          />
        </div>
        <div className="flex flex-col gap-1">
          <div>San Pham Chi Mang Tinh Chat Minh Hoa</div>
          <div className="text-sm">
            <span className="text-[#787C80]">So luong:</span> 2
          </div>
        </div>
        <div className="my-auto ml-auto">20000</div>
      </div>
      <div className="w-full  flex flex-col gap-4 p-4 items-end">
        <div>{`Thanh tien: ${data.total_price}`}</div>
        {data.status === OrderStatus.PENDING && (
          <Button variant="outline">Huy don hang</Button>
        )}
      </div>
    </div>
  );
};
