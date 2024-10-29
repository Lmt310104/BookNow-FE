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
import { useNavigate } from "react-router-dom";
import bookService from "@/services/book.service";
import { useEffect, useState } from "react";
import { Meta } from "@/types/api";
import { ResBookDetail } from "@/types/book";
import { BookStatus } from "@/common/enums";

export default function ProductRoute() {
  const [books, setBooks] = useState<ResBookDetail[]>([]);
  const [meta, setMeta] = useState<Meta>({
    page: 1,
    take: 20,
    itemCount: 0,
    pageCount: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  });
  const navigate = useNavigate();
  const [tabState, setTabState] = useState<string>("all");

  const getAllBooks = async () => {
  
    try {
      const response = await bookService.getAllBooks({
        page: meta.page,
        take: meta.take,
      }, tabState);

      setBooks(response.data.data);
      setMeta(response.data.meta);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllBooks();
  }, [meta.page, tabState]);

  return (
    <DashBoardLayout>
      <main className="flex flex-1 flex-col gap-6 p-6  bg-muted/40 overflow-y-auto">
        <div className="flex">
          <h1 className="text-lg font-semibold">San Pham</h1>
          <Button
            className="gap-1 ml-auto"
            onClick={() => navigate("/portal/book/new")}
          >
            <PlusCircle className="h-3.5 w-3.5" />
            <span>Them san pham moi</span>
          </Button>
        </div>
        <Tabs value={tabState}>
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="all" onClick={() => setTabState("all")}>
                Tat ca
              </TabsTrigger>
              <TabsTrigger value={BookStatus.ACTIVE} onClick={() => setTabState(BookStatus.ACTIVE)}>
                Dang ban
              </TabsTrigger>
              <TabsTrigger
                value={BookStatus.INACTIVE}
                onClick={() => setTabState(BookStatus.INACTIVE)}
              >
                Da an
              </TabsTrigger>
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
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <ProductTableHeader />
              <TableBody>
                {books &&
                  books.map((item, index) => {
                    return (
                      <ProductTableRow
                        key={index}
                        data={item}
                        onRefetch={getAllBooks}
                      />
                    );
                  })}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="bg-muted/50">
            <TablePagination data={meta} onChange={setMeta} />
          </CardFooter>
        </Card>
      </main>
    </DashBoardLayout>
  );
}
