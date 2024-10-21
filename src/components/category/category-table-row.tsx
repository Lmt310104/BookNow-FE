import { TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Category } from "@/types/category";
import { CategoryState } from "@/common/enums/category-state";

export const CategoryTableRow: React.FC<{ data: Category }> = ({ data }) => {
  return (
    <TableRow>
      <TableCell>
        <Checkbox />
      </TableCell>
      <TableCell>{data.id}</TableCell>
      <TableCell>{data.name}</TableCell>
      <TableCell>
        <Badge variant="secondary">
          {data.is_disable ? CategoryState.HIDE : CategoryState.ACTIVE}
        </Badge>
      </TableCell>
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
            {data.is_disable ? (
              <DropdownMenuItem>Hien thi</DropdownMenuItem>
            ) : (
              <DropdownMenuItem>An</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};
