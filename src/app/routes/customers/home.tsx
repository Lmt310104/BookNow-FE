import { BookStatus } from "@/common/enums";
import ProductLayout from "@/components/layouts/product-layout";
import ProductItemCard from "@/components/product/product-item-card";
import bookService from "@/services/book.service";
import { Meta } from "@/types/api";
import { ResBookDetail } from "@/types/book";
import { useEffect, useState } from "react";

export default function HomeRoute() {
  const [books, setBooks] = useState<ResBookDetail[]>([]);
  const [meta, setMeta] = useState<Meta>({
    page: 1,
    take: 20,
    itemCount: 0,
    pageCount: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  });
  const [sortBy, setSortBy] = useState<string>("created_at");
  const [order, setOrder] = useState<string>("desc");
  const [searchText, setSearchText] = useState<string>("");

  const getAllBooks = async () => {
    try {
      const response = await bookService.getAllBooks(
        {
          page: meta.page,
          take: meta.take,
        },
        {
          status: BookStatus.ACTIVE,
          order: order,
          sortBy: sortBy,
          title: searchText,
        }
      );

      setBooks(response.data.data);
      setMeta(response.data.meta);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllBooks();
  }, [meta.page]);

  return (
    <ProductLayout>
      <div className="grid grid-cols-[220px_1fr] py-4 gap-4 h-full">
        <div className="border border-red-500 w-full h-full"></div>
        <div className="w-full grid grid-cols-5 gap-4">
          {books.map((item, index) => {
            return <ProductItemCard key={index} data={item} />;
          })}
        </div>
      </div>
    </ProductLayout>
  );
}
