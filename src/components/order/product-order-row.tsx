import { OrderItem } from "@/types/order";
import image from "@/assets/placeholder.svg";
import React from "react";
import { formatNumber } from "@/utils/format";

interface ProductOrderRowProps {
  data: OrderItem;
  onShowBookDetail?: () => void;
}

export const ProductOrderRow: React.FC<ProductOrderRowProps> = ({
  data,
  onShowBookDetail,
}) => {
  return (
    <div
      className="flex flex-row p-4 border-y border-grey-100 gap-4 hover:cursor-pointer"
      onClick={onShowBookDetail}
    >
      <div className="overflow-hidden aspect-square rounded-md h-[64px]">
        <img
          alt="Product image"
          className="object-cover w-full h-full"
          src={
            (data.book.image_url.length > 0 && data.book.image_url[0]) || image
          }
        />
      </div>
      <div className="flex flex-col gap-1">
        <div>{data.book.title}</div>
        <div className="text-sm">
          <span className="text-[#787C80]">Số lượng: </span>
          {data.quantity}
        </div>
      </div>
      <div className="my-auto ml-auto">{formatNumber(data.price)}</div>
    </div>
  );
};
