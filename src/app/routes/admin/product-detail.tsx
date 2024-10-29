import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashBoardLayout from "@/components/layouts/dashboard-layout";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import bookService from "@/services/book.service";
import { FormEvent, useEffect, useState } from "react";
import { BookDetail } from "@/types/book";
import { ProductInfoSection } from "@/components/product/product-info-section";
// import { ProductInfoSection } from "@/components/product/product-info-section";

export default function ProductDetailRoute() {
  const param = useParams();
  const [detailData, setDetailData] = useState<BookDetail>({
    title: "",
    author: "NXBVN",
    categoryId: "",
    entryPrice: 0,
    price: 0,
    stockQuantity: 0,
    description: "",
    images: [],
    preview: "",
  });

  const getBookDetail = async (id: string) => {
    try {
      const response = await bookService.getBookById(id);
      const responseData = response.data.data;
      const imagePreview =
        responseData.image_url.length > 0 && responseData.image_url[0];
      setDetailData({
        title: responseData.title,
        author: responseData.author,
        categoryId: responseData.category_id,
        entryPrice: responseData.entry_price,
        price: responseData.price,
        stockQuantity: responseData.stock_quantity,
        description: responseData.description,
        images: [],
        preview: imagePreview || "",
        id: responseData.id
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (param?.bookId) {
      getBookDetail(param.bookId);
    }
  }, [param]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await bookService.updateBookById(detailData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DashBoardLayout>
      <form className="flex flex-1 flex-col gap-6 p-6  bg-muted/40 overflow-y-auto" onSubmit={handleSubmit}>
        {/* <Tabs defaultValue="detail">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="detail">Thong tin chi tiet</TabsTrigger>
              <TabsTrigger value="sale">Thong tin ban hang</TabsTrigger>
            </TabsList>
          </div>
        </Tabs> */}
        <ProductInfoSection detailData={detailData} onChange={setDetailData}/>
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
