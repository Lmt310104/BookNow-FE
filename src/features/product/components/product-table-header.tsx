import { Checkbox } from "@/components/ui/checkbox";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const ProductTableHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[30px]">
          <Checkbox />
        </TableHead>
        <TableHead>Ten san pham</TableHead>
        <TableHead>Danh muc</TableHead>
        <TableHead>Trang thai</TableHead>
        <TableHead>Gia</TableHead>
        <TableHead>Kho hang</TableHead>
        <TableHead>
          <span className="sr-only">Thao tac</span>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};
