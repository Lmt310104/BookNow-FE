import CustomerLayout from "@/components/layouts/customer-layout";
import orderService from "@/services/order.service";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";

import { TablePagination } from "@/components/shared/table-pagination";
import { Meta } from "@/types/api";
import { Order } from "@/types/order";
import { OrderRow } from "@/components/order/order-row";
import { OrderStatus } from "@/common/enums";

export default function PurchaseRoute() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [meta, setMeta] = useState<Meta>({
    page: 1,
    take: 20,
    itemCount: 0,
    pageCount: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  });
  const [tabState, setTabState] = useState<string>("all");

  const getAllOrdersByUser = async () => {
    try {
      const response = await orderService.getOrdersByUser({
        page: meta.page,
        take: meta.take,
      },tabState );
      console.log(response);
      setOrders(response.data.data);
      setMeta(response.data.meta);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllOrdersByUser();
  }, [meta.page, tabState]);

  return (
    <CustomerLayout>
      <main className="flex flex-1 flex-col gap-6 py-6 pl-6">
        <Tabs value={tabState} className="mx-auto">
          <TabsList>
            <TabsTrigger value="all" onClick={()=> setTabState("all")}>Tat ca</TabsTrigger>
            <TabsTrigger value={OrderStatus.PENDING} onClick={()=> setTabState(OrderStatus.PENDING)}>Cho xac nhan</TabsTrigger>
            <TabsTrigger value={OrderStatus.PROCESSING} onClick={()=> setTabState(OrderStatus.PROCESSING)}>Dang xu ly</TabsTrigger>
            <TabsTrigger value={OrderStatus.DELIVERED} onClick={()=> setTabState(OrderStatus.DELIVERED)}>Dang van chuyen</TabsTrigger>
            <TabsTrigger value={OrderStatus.SUCCESS} onClick={()=> setTabState(OrderStatus.SUCCESS)}>Da giao hang</TabsTrigger>
            <TabsTrigger value={OrderStatus.CANCELLED} onClick={()=> setTabState(OrderStatus.CANCELLED)}>Da huy</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex flex-row gap-4">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Nhap ID don hang hoac ten san pham"
              className="w-full rounded-lg bg-background pl-8"
            />
          </div>
          <Button>Ap dung</Button>
        </div>
        <div className="flex flex-col gap-3">
          {orders.map((item, index) => {
            return <OrderRow key={index} data={item} />;
          })}
        </div>
        <TablePagination data={meta} onChange={setMeta} />
      </main>
    </CustomerLayout>
  );
}
