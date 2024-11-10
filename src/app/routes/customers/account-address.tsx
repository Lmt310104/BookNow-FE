import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import CustomerLayout from "@/components/layouts/customer-layout";
import { CustomerAddress } from "@/components/customer/customer-address";
import AddressDialog, {
  AddressDialogRef,
} from "@/components/customer/address-dialog";
import { useRef } from "react";

export default function AccountAddressRoute() {
  const dialogRef = useRef<AddressDialogRef>(null);

  const handleAddNew = () => {
    dialogRef.current?.onOpen();
  };

  return (
    <CustomerLayout>
      <AddressDialog ref={dialogRef} />
      <main className="flex flex-1 flex-col gap-6 py-6 pl-6">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">Dia Chi Cua Toi</h1>
          <div className="ml-auto flex items-center gap-2">
            <Button className="gap-1" onClick={handleAddNew}>
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Them dia chi moi
              </span>
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <CustomerAddress />
          <CustomerAddress />
          <CustomerAddress />
          <CustomerAddress />
          <CustomerAddress />
          <CustomerAddress />
          <CustomerAddress />
          <CustomerAddress />
        </div>
      </main>
    </CustomerLayout>
  );
}
