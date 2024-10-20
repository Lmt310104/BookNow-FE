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

export const ProductTableRow = () => {
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
          src={image}
          width="64"
        />
        Laser Lemonade Machine
      </TableCell>
      <TableCell>Khac</TableCell>{" "}
      <TableCell>
        <Badge variant="outline">Draft</Badge>
      </TableCell>
      <TableCell>$499.99</TableCell>
      <TableCell className="hidden md:table-cell">25</TableCell>
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
