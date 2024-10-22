import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Search } from "lucide-react";
import DashBoardLayout from "@/components/layouts/dashboard-layout";
import { TablePagination } from "@/components/shared/table-pagination";
import { ProductTableHeader } from "@/components/product/product-table-header";
import { ProductTableRow } from "@/components/product/product-table-row";
import { useState, useEffect } from "react";
import { Meta } from "@/types/api";
import bookService from "@/services/book.service";
import { BookData } from "@/types/book";

export default function ProductRoute() {
  const [books, setBooks] = useState<BookData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [meta, setMeta] = useState<Meta>();
  
  async function getAllBooks() {
    try {
      const response = await bookService.fetchAllBooks();
      if (response) {
        setBooks(response.data.data);
        setIsLoading(false);
        setMeta(response.data.meta);
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      await getAllBooks();
    };
    fetchData();
  }, [])
  return (
    <>
    {isLoading && <div>Is loading</div>}
    {!isLoading && 
    <DashBoardLayout>
      <main className="flex flex-1 flex-col gap-6 p-6  bg-muted/40 overflow-y-auto">
        <div className="flex">
          <h1 className="text-lg font-semibold">San Pham</h1>
          <Button className="gap-1 ml-auto">
            <PlusCircle className="h-3.5 w-3.5" />
            <span>Them san pham moi</span>
          </Button>
        </div>
        <Tabs defaultValue="all">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="all">Tat ca (0)</TabsTrigger>
              <TabsTrigger value="active">Dang ban (0)</TabsTrigger>
              <TabsTrigger value="archived">Da an (0)</TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <div className="relative flex flex-row gap-4">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Nhap ten san pham"
                className="w-full rounded-lg bg-background pl-8"
              />
              <Button>Ap dung</Button>
              <Button variant="outline" className="border border-black">
                Nhap lai
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <ProductTableHeader />
              <TableBody>
                {
                  books.map((book) => (
                    <ProductTableRow key={book.id} data={book} />
                  ))
                }
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="bg-muted/50">
            <TablePagination data={meta} />
          </CardFooter>
        </Card>
      </main>
    </DashBoardLayout>
    }
    </>
  );
}
