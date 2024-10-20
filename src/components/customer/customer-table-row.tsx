import { TableCell, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

export const CustomerTableRow = () => {
  return (
    <TableRow>
      <TableCell>2252</TableCell>
      <TableCell>Le Minh Toan</TableCell>
      <TableCell>31/01/2004</TableCell>
      <TableCell>Nam</TableCell>
      <TableCell>1234567890</TableCell>
      <TableCell>lmtoan311@gmail.com</TableCell>
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
