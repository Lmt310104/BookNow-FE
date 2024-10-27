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
import { Order } from "@/types/order";
import { Meta } from "@/types/api";
import orderService from "@/services/order.service";
import { useEffect, useState } from "react";

export default function OrderRoute() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [meta, setMeta] = useState<Meta>({
    page: 1,
    take: 20,
    itemCount: 0,
    pageCount: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  });

  const getOrdersByAdmin = async () => {
    try {
      const response = await orderService.getOrdersByAdmin();
      setOrders(response.data.data);
      setMeta(response.data.meta);
      console.log(response)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOrdersByAdmin();
  }, [meta.page]);

  return (
    <DashBoardLayout>
      <main className="flex flex-1 flex-col gap-6 p-6  bg-muted/40 overflow-y-auto">
        <h1 className="text-lg font-semibold">Danh Sach Don Hang</h1>
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">Tat ca</TabsTrigger>
            <TabsTrigger value="awaiting">Cho xac nhan</TabsTrigger>
            <TabsTrigger value="processing">Dang xu ly</TabsTrigger>
            <TabsTrigger value="shipping">Dang van chuyen</TabsTrigger>
            <TabsTrigger value="delivered">Da giao hang</TabsTrigger>
            <TabsTrigger value="canceled">Da huy</TabsTrigger>
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
            <div className="space-y-4">
              <OrderTableHeader />
              {orders.map((item, index) => {
                return <OrderTableRow key={index} data={item} />;
              })}
            </div>
          </CardContent>
          <CardFooter className="bg-muted/50">
            <TablePagination data={meta} onChange={setMeta} />
          </CardFooter>
        </Card>
      </main>
    </DashBoardLayout>
  );
}
