import DashBoardLayout from "@/components/layouts/dashboard-layout";
import { Button } from "@/components/ui/button";
import { ProductInfoSection } from "@/components/product/product-info-section";
import { ProductSaleSection } from "@/components/product/product-sale-section";

export default function AddProductRoute() {


  return (
    <DashBoardLayout>
      <form className="flex flex-1 flex-col gap-6 p-6  bg-muted/40 overflow-y-auto" >
        <ProductInfoSection />
        {/* <ProductSaleSection /> */}
        <div className="w-full flex flex-row gap-4 justify-end mb-12">
          <Button variant="outline" className="w-40">
            Huy
          </Button>
          <Button variant="outline" className="w-40">
            Luu & An
          </Button>
          <Button className="w-40">Luu & Hien thi</Button>
        </div>
      </form>
    </DashBoardLayout>
  );
}
