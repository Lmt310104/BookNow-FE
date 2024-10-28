import { CartTableHeader } from "@/components/cart/cart-table-header";
import { CartTableRow } from "@/components/cart/cart-table-row";
import ProductLayout from "@/components/layouts/product-layout";
import { Table, TableBody } from "@/components/ui/table";
import cartService from "@/services/cart.service";
import { Meta } from "@/types/api";
import { ResCartItem } from "@/types/cart";
import { useEffect, useState } from "react";

export default function CartRoute() {
  const [cart, setCart] = useState<Array<ResCartItem>>([]);
  const [meta, setMeta] = useState<Meta>({
    page: 1,
    take: 20,
    itemCount: 0,
    pageCount: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  });
  const getCart = async () => {
    try {
      const response = await cartService.getCart();
      setCart(response.data.data);
      setMeta(response.data.meta);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCart();
  }, [meta.page]);

  return (
    <ProductLayout>
      <main className="flex flex-1 flex-col gap-6 py-6 pl-6">
        <Table>
          <CartTableHeader />
          <TableBody>
            {cart.map((item, index) => {
              return (
                <CartTableRow key={index} data={item} onRefetch={getCart} />
              );
            })}
          </TableBody>
        </Table>
      </main>
    </ProductLayout>
  );
}
