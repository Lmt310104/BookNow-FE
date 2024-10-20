import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const CustomerTableHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Ma khach hang</TableHead>
        <TableHead>Ho va ten</TableHead>
        <TableHead>Ngay sinh</TableHead>
        <TableHead>Gioi tinh</TableHead>
        <TableHead>so dien thoai</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>
          <span className="sr-only">Thao tac</span>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};
