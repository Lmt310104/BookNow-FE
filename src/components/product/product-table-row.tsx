import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import image from "@/assets/placeholder.svg";
import { ResBookDetail } from "@/types/book";
import React, { useState } from "react";
import { BOOK_STATUS } from "@/common/constants";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useNavigate } from "react-router-dom";

interface ProductTableRowProps {
  data: ResBookDetail;
  onRefetch: () => Promise<void>;
}

export const ProductTableRow: React.FC<ProductTableRowProps> = ({
  data,
  onRefetch,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleUpdate = () => {
    navigate(`/portal/book/${data.id}`);
  };
  return (
    <TableRow>
      {/* <TableCell>
        <Checkbox />
      </TableCell> */}
      <TableCell className="flex flex-row gap-4">
        <img
          alt="Product image"
          className="aspect-square rounded-md object-cover"
          height="64"
          src={(data.image_url.length > 0 && data.image_url[0]) || image}
          width="64"
        />
        <div className="w-full flex flex-col justify-center">
          <div className="font-medium">{data.title}</div>
          <div>{`Id: ${data.id}`}</div>
        </div>
      </TableCell>
      <TableCell>{data.Category?.name}</TableCell>
      <TableCell>
        <Badge variant="outline">{BOOK_STATUS[data.status]}</Badge>
      </TableCell>
      <TableCell>{data.entry_price}</TableCell>
      <TableCell>{data.price}</TableCell>
      <TableCell>{data.stock_quantity}</TableCell>
      <TableCell>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-max p-1">
            <div
              className="py-2 px-3  w-full hover:bg-[#F4F4F5]"
              onClick={handleUpdate}
            >
              Chinh sua
            </div>
            {/* {data.is_disable ? (
              <div
                className="py-2 px-3  w-full hover:bg-[#F4F4F5]"
                onClick={handleActive}
              >
                Hien thi
              </div>
            ) : (
              <div
                className="py-2 px-3  w-full hover:bg-[#F4F4F5]"
                onClick={handleDisable}
              >
                An
              </div>
            )} */}
          </PopoverContent>
        </Popover>
        '
      </TableCell>
    </TableRow>
  );
};
