import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashBoardLayout from "@/components/layouts/dashboard-layout";
import { Button } from "@/components/ui/button";
import { ProductInfoSection } from "@/components/product/product-info-section";
import { ProductSaleSection } from "@/components/product/product-sale-section";

export default function AddProductRoute() {
  return (
    <DashBoardLayout>
      <main className="flex flex-1 flex-col gap-6 p-6  bg-muted/40 overflow-y-auto">
        <Tabs defaultValue="all">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="active">Thong tin chi tiet</TabsTrigger>
              <TabsTrigger value="archived" className="hidden sm:flex">
                Thong tin ban hang
              </TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
        <ProductInfoSection />
        <ProductSaleSection />
        <div className="w-full flex flex-row gap-4 justify-end mb-12">
          <Button variant="outline" className="w-40">
            Huy
          </Button>
          <Button variant="outline" className="w-40">
            Luu & An
          </Button>
          <Button className="w-40">Luu & Hien thi</Button>
        </div>
      </main>
    </DashBoardLayout>
  );
}
