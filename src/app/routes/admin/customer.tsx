import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody } from "@/components/ui/table";
import { Search } from "lucide-react";

import DashBoardLayout from "@/components/layouts/dashboard-layout";
import { TablePagination } from "@/components/shared/table-pagination";
import { CustomerTableHeader } from "@/features/customer/components/customer-table-header";
import { CustomerTableRow } from "@/features/customer/components/customer-table-row";

export const CustomerRoute = () => {
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
                <CustomerTableRow />
                <CustomerTableRow />
                <CustomerTableRow />
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
