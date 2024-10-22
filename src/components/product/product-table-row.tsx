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
import React from "react";
import { BookData } from "@/types/book";
import { Link } from "react-router-dom";

export const ProductTableRow : React.FC<{data: BookData}> = ({data}) => {
  return (
    <TableRow>
      <TableCell>
        <Checkbox />
      </TableCell>
      <TableCell className="font-medium flex flex-row gap-4 items-center">
        <img
          alt="Product image"
          className="aspect-square rounded-md object-cover"
          height="64"
          src={data.image_url[0]}
          width="64"
        />
        {data.title}
      </TableCell>
      <TableCell>{data.Category?.name}</TableCell>{" "}
      <TableCell>
        <Badge variant="outline">{data.status}</Badge>
      </TableCell>
      <TableCell>{data.price} VND</TableCell>
      <TableCell className="hidden md:table-cell">{data.stock_quantity}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link to={`${data.id}`}>
                Chinh 
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>An</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};
