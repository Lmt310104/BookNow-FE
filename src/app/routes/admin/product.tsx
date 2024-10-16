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

import image from "@/assets/placeholder.svg";

import DashBoardLayout from "@/components/layouts/dashboard-layout";
import { TablePagination } from "@/components/shared/table-pagination";
import { ProductTableHeader } from "@/features/product/components/product-table-header";
import { ProductTableRow } from "@/features/product/components/product-table-row";

export const ProductRoute = () => {
  console.log(image);

  return (
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
                <ProductTableRow />
                <ProductTableRow />
                <ProductTableRow />
                <ProductTableRow />
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="bg-muted/50">
            <TablePagination />
          </CardFooter>
        </Card>
      </main>
    </DashBoardLayout>
  );
};
