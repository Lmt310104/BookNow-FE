import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Order } from "@/types/order";
import ProductOrderTableRow from "./product-order-table-row";
import { ORDER_STATUS } from "@/common/constants/order";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface OrderTableRowProps {
  data: Order;
}

export const OrderTableRow: React.FC<OrderTableRowProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col text-sm border border-gray-300 rounded-md">
      <div className="flex flex-row justify-between py-2 px-4 bg-muted">
        <span>{data.user.full_name}</span>
        <span>{`Ma don hang: ${data.id}`}</span>
      </div>
      <div className="w-full flex flex-row items-center p-4">
        <div className="basis-[55%] space-y-4">
          {data.OrderItems.map((item, index) => {
            return <ProductOrderTableRow key={index} data={item} />;
          })}
        </div>
        <div className="basis-1/5 px-2 text-left">{data.total_price}</div>
        <div className="basis-1/5 px-2 text-left">
          <Badge variant="outline">{ORDER_STATUS[data.status]}</Badge>
        </div>
        <div className="basis-[5%] px-2 text-left">
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button size="icon" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-max p-1">
              <div className="py-2 px-3 w-full hover:bg-[#F4F4F5]" onClick={()=> navigate(`/portal/order/${data.id}`)}>
                Xem chi tiet
              </div>
              <div className="py-2 px-3 w-full hover:bg-[#F4F4F5]">
                In phieu giao
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};
