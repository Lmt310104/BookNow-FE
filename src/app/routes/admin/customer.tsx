import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody } from "@/components/ui/table";
import { Search } from "lucide-react";

import DashBoardLayout from "@/components/layouts/dashboard-layout";
import { TablePagination } from "@/components/shared/table-pagination";
import { CustomerTableHeader } from "@/components/customer/customer-table-header";
import { CustomerTableRow } from "@/components/customer/customer-table-row";
import { useEffect, useState } from "react";
import { Customer } from "@/types/customer";
import customerService from "@/services/customer.service";
import { Meta } from "@/types/api";

export default function CustomerRoute() {
  const [customers, setCustomers] = useState<Array<Customer>>([]);
  const [meta, setMeta] = useState<Meta>({
    page: 1,
    take: 10,
    itemCount: 0,
    pageCount: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  });

  const fetchAllCustomer = async () => {
    try {
      const response = await customerService.getAllCusomter({
        page: meta.page,
        take: meta.take,
      });
      setMeta(response.data.meta);
      setCustomers(response.data.data);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllCustomer();
  }, [meta.page]);

  return (
    <DashBoardLayout>
      <main className="flex flex-1 flex-col gap-6 p-6  bg-muted/40 overflow-y-auto">
        <h1 className="text-lg font-semibold">Danh Sach Khach Hang</h1>
        <Card x-chunk="dashboard-06-chunk-0">
          <CardContent className="flex flex-col gap-6 mt-6">
            <div className="flex flex-row gap-4">
              <div className="relative w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Nhap ten khach hang"
                  className="w-full rounded-lg bg-background pl-8"
                />
              </div>
              <Button>Ap dung</Button>
              <Button variant="outline" className="border border-black">
                Nhap lai
              </Button>
            </div>
            <Table>
              <CustomerTableHeader />
              <TableBody>
                {customers.map((item, index) => {
                  return (
                    <CustomerTableRow
                      key={index}
                      data={item}
                      onRefetch={fetchAllCustomer}
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
