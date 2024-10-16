import { Button } from "@/components/ui/button";

import { PlusCircle } from "lucide-react";

import CustomerLayout from "@/components/layouts/customer-layout";

export const AccountAddressRoute = () => {
  return (
    <CustomerLayout>
      <main className="flex flex-1 flex-col gap-6 py-6 pl-6 bg-[#f9f9f9] overflow-y-auto">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">Dia Chi Cua Toi</h1>
          <div className="ml-auto flex items-center gap-2">
            <Button className="gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Them dia chi moi
              </span>
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="  flex flex-row justify-between rounded-lg border border-dashed shadow-sm w-full bg-white p-4">
            <div className="flex flex-col gap-1">
              <div>DAO DUY THONG</div>
              <div className="text-sm">
                <span className="text-[#787C80]">Dia chi:</span> đường Hàn
                Thuyên, Phường Linh Trung, Thành phố Thủ Đức, Hồ Chí Minh
              </div>
              <div className="text-sm">
                <span className="text-[#787C80]">Dien thoai:</span> 0343800708
              </div>
            </div>
            <div className="flex flex-row gap-4 items-center">
              <Button variant="secondary">Chinh sua</Button>
              <Button variant="outline">Xoa</Button>
            </div>
          </div>
          <div className="  flex flex-row justify-between rounded-lg border border-dashed shadow-sm w-full bg-white p-4">
            <div className="flex flex-col gap-1">
              <div>DAO DUY THONG</div>
              <div className="text-sm">
                <span className="text-[#787C80]">Dia chi:</span> đường Hàn
                Thuyên, Phường Linh Trung, Thành phố Thủ Đức, Hồ Chí Minh
              </div>
              <div className="text-sm">
                <span className="text-[#787C80]">Dien thoai:</span> 0343800708
              </div>
            </div>
            <div className="flex flex-row gap-4 items-center">
              <Button variant="secondary">Chinh sua</Button>
              <Button variant="outline">Xoa</Button>
            </div>
          </div>{" "}
          <div className="  flex flex-row justify-between rounded-lg border border-dashed shadow-sm w-full bg-white p-4">
            <div className="flex flex-col gap-1">
              <div>DAO DUY THONG</div>
              <div className="text-sm">
                <span className="text-[#787C80]">Dia chi:</span> đường Hàn
                Thuyên, Phường Linh Trung, Thành phố Thủ Đức, Hồ Chí Minh
              </div>
              <div className="text-sm">
                <span className="text-[#787C80]">Dien thoai:</span> 0343800708
              </div>
            </div>
            <div className="flex flex-row gap-4 items-center">
              <Button variant="secondary">Chinh sua</Button>
              <Button variant="outline">Xoa</Button>
            </div>
          </div>{" "}
          <div className="  flex flex-row justify-between rounded-lg border border-dashed shadow-sm w-full bg-white p-4">
            <div className="flex flex-col gap-1">
              <div>DAO DUY THONG</div>
              <div className="text-sm">
                <span className="text-[#787C80]">Dia chi:</span> đường Hàn
                Thuyên, Phường Linh Trung, Thành phố Thủ Đức, Hồ Chí Minh
              </div>
              <div className="text-sm">
                <span className="text-[#787C80]">Dien thoai:</span> 0343800708
              </div>
            </div>
            <div className="flex flex-row gap-4 items-center">
              <Button variant="secondary">Chinh sua</Button>
              <Button variant="outline">Xoa</Button>
            </div>
          </div>
        </div>
      </main>
    </CustomerLayout>
  );
};
