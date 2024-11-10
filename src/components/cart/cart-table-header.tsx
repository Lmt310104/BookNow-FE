import { Checkbox } from "@/components/ui/checkbox";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface CartTableHeaderProps {
  onCheck: (checked: boolean) => void;
  isCheck: boolean;
}

export const CartTableHeader: React.FC<CartTableHeaderProps> = ({
  onCheck,
  isCheck,
}) => {
  return (
    <TableHeader className="bg-white shadow-sm">
      <TableRow>
        <TableHead className="w-[30px]">
          <Checkbox checked={isCheck} onCheckedChange={onCheck} />
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