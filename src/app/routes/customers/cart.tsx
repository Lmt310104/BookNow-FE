import { CartTableHeader } from "@/components/cart/cart-table-header";
import { CartTableRow } from "@/components/cart/cart-table-row";
import ProductLayout from "@/components/layouts/product-layout";
import { Table, TableBody } from "@/components/ui/table";

export default function CartRoute() {
  return (
    <ProductLayout>
      <div className="w-full h-[500px] border border-red-500">
        <Table>
          <CartTableHeader />
          <TableBody>
            <CartTableRow /> <CartTableRow /> <CartTableRow /> <CartTableRow />
            <CartTableRow />
          </TableBody>
        </Table>
      </div>
    </ProductLayout>
  );
}
