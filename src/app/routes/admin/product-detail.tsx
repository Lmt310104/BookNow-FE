import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashBoardLayout from "@/components/layouts/dashboard-layout";
import { Button } from "@/components/ui/button";
import { ProductInfoSection } from "@/components/product/product-info-section";
import { ProductSaleSection } from "@/components/product/product-sale-section";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BookData } from "@/types/book";
import bookService from "@/services/book.service";

export default function ProductDetailRoute() {
  const { bookId } = useParams<{bookId: string}>();
  const [book, setBook] = useState<BookData>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  async function getBookDetail() {
    try {
      if (!bookId) {
        throw new Error('Book id is required');
      }
      const response = await bookService.fetchBookById(bookId);
      if (response) {
        setBook(response.data.data);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getBookDetail()
  }, []);
  return (
    <>
    {isLoading && <p>Is loading ...</p> }
    {!isLoading &&
      <DashBoardLayout>
        <main className="flex flex-1 flex-col gap-6 p-6  bg-muted/40 overflow-y-auto">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="active">Thong tin chi tiet</TabsTrigger>
                <TabsTrigger value="archived" className="hidden sm:flex">
                  Thong tin ban hang
                </TabsTrigger>
              </TabsList>
            </div>
          </Tabs>
          <ProductInfoSection data = {book}/>
          <ProductSaleSection data = {book}/>
          <div className="w-full flex flex-row gap-4 justify-end mb-12">
            <Button variant="outline" className="w-40">
              Huy
            </Button>
            <Button variant="outline" className="w-40">
              Luu & An
            </Button>
            <Button className="w-40">Luu & Hien thi</Button>
          </div>
        </main>
      </DashBoardLayout>
    }
    </>
  );
}
