import { TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@headlessui/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import image from "@/assets/placeholder.svg";
import { ResGetBook } from "@/types/book";
import React from "react";
import { BOOK_STATUS } from "@/common/constants";

interface ProductTableRowProps {
  data: ResGetBook;
  onRefetch: () => Promise<void>;
}

export const ProductTableRow: React.FC<ProductTableRowProps> = ({
  data,
  onRefetch,
}) => {
  console.log(data);
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
      <TableCell>{data.Category.name}</TableCell>
      <TableCell>
        <Badge variant="outline">{BOOK_STATUS[data.status]}</Badge>
      </TableCell>
      <TableCell>{data.entry_price}</TableCell>
      <TableCell>{data.price}</TableCell>
      <TableCell>{data.stock_quantity}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Chinh sua</DropdownMenuItem>
            <DropdownMenuItem>An</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};
