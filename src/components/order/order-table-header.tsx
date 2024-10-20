import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const OrderTableHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Mã đơn hàng</TableHead>
        <TableHead>Trạng thái</TableHead>

        <TableHead>Han xac nhan</TableHead>
        <TableHead>Đánh giá</TableHead>
        <TableHead>Nội dung</TableHead>
        <TableHead>Người đánh giá</TableHead>
        <TableHead>
          <span className="sr-only">Thao tac</span>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};
