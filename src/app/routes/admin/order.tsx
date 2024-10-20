import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";

import DashBoardLayout from "@/components/layouts/dashboard-layout";
import { OrderTableHeader } from "@/components/order/order-table-header";
import { OrderTableRow } from "@/components/order/order-table-row";
import { TablePagination } from "@/components/shared/table-pagination";

export default function OrderRoute() {
  return (
    <DashBoardLayout>
      <main className="flex flex-1 flex-col gap-6 p-6  bg-muted/40 overflow-y-auto">
        <h1 className="text-lg font-semibold">Danh Sach Don Hang</h1>
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">Tat ca (0)</TabsTrigger>
            <TabsTrigger value="awaiting">Cho xac nhan (0)</TabsTrigger>
            <TabsTrigger value="processing">Dang xu ly (0)</TabsTrigger>
            <TabsTrigger value="shipping">Dang van chuyen (0)</TabsTrigger>
            <TabsTrigger value="delivered">Da giao hang (0)</TabsTrigger>
            <TabsTrigger value="canceled">Da huy (0)</TabsTrigger>
          </TabsList>
        </Tabs>
        <Card x-chunk="dashboard-06-chunk-0">
          <CardContent className="flex flex-col gap-6 mt-6">
            <div className="flex flex-row gap-4">
              <div className="relative w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Nhap ma don hang"
                  className="w-full rounded-lg bg-background pl-8"
                />
              </div>
              <Button>Ap dung</Button>
              <Button variant="outline" className="border border-black">
                Nhap lai
              </Button>
            </div>
            <Table>
              <OrderTableHeader />
              <TableBody>
                <OrderTableRow />
                <OrderTableRow />
                <OrderTableRow />
                <OrderTableRow />
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
}
