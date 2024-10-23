import DashBoardLayout from "@/components/layouts/dashboard-layout";
import { Button } from "@/components/ui/button";
import { ProductInfoSection } from "@/components/product/product-info-section";
import { ProductSaleSection } from "@/components/product/product-sale-section";
import { FormEvent, useState } from "react";
import { BookDetail } from "@/types/book";
import bookService from "@/services/book.service";

export default function AddProductRoute() {
  const [detailData, setDetailData] = useState<BookDetail>({
    title: "",
    author: "NXBVN",
    categoryId: "",
    entryPrice: 0,
    price: 0,
    stockQuantity: 0,
    description: "",
    image: null,
    preview: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await bookService.createBook(detailData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DashBoardLayout>
      <form
        className="flex flex-1 flex-col gap-6 p-6  bg-muted/40 overflow-y-auto"
        onSubmit={handleSubmit}
      >
        <ProductInfoSection detailData={detailData} onChange={setDetailData} />
        {/* <ProductSaleSection /> */}
        <div className="flex flex-row gap-4 mx-auto mb-12">
          <Button variant="outline" className="w-40">
            Huy
          </Button>
          <Button className="w-40" type="submit">
            Luu
          </Button>
        </div>
      </form>
    </DashBoardLayout>
  );
}
