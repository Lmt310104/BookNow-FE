import { Checkbox } from "@/components/ui/checkbox";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const CartTableHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[30px]">
          <Checkbox />
        </TableHead>
        <TableHead>San pham</TableHead>
        <TableHead>Don gia</TableHead>
        <TableHead>So luong</TableHead>
        <TableHead>So tien</TableHead>
        <TableHead className="w-[30px]">
          <span className="sr-only">Thao tac</span>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};
