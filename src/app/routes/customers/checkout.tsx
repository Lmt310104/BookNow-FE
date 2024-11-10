import { CheckoutTableHeader } from "@/components/checkout/checkout-table-header";
import { CheckoutTableRow } from "@/components/checkout/checkout-table-row";
import AddressesDialog, {
  AddressesDialogRef,
} from "@/components/customer/addresses-dialog";
import ProductLayout from "@/components/layouts/product-layout";
import SectionCard from "@/components/shared/section-card";
import { Button } from "@/components/ui/button";
import { routes } from "@/config";
import addressService from "@/services/address.service";
import cartService from "@/services/cart.service";
import orderService from "@/services/order.service";
import { ResAddress } from "@/types/address";
import { ResCartItem } from "@/types/cart";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function CheckOutRoute() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const state = queryParams.get("state") || "";
  const selectedBookIds = state.split(",");
  const [cartItemsSelected, setCartItemsSelected] = useState<
    Array<ResCartItem>
  >([]);
  const [addressInfo, setAddressInfo] = useState<ResAddress>({
    full_name: "",
    phone_number: undefined,
    address: "",
    id: "",
  });
  const dialogRef = useRef<AddressesDialogRef>(null);
  const navigate = useNavigate();
  const getCartItemsSelected = async () => {
    try {
      const response = await cartService.getCart();
      setCartItemsSelected(
        response.data.data.filter((item) =>
          selectedBookIds.includes(item.book_id)
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  const getAllAddress = async () => {
    try {
      const response = await addressService.getAllAddressByUser();
      if (response.data.data.length > 0) {
        setAddressInfo(response.data.data[0]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllAddress();
    getCartItemsSelected();
  }, []);

  const handleCountTotalPrice = () =>
    cartItemsSelected.reduce((total, curr) => {
      return total + curr.book.price * curr.quantity;
    }, 0);

  const handleOrder = async () => {
    if (cartItemsSelected.length === 0) return;
    const items = cartItemsSelected.map((item) => {
      return {
        bookId: item.book_id,
        quantity: item.quantity,
      };
    });
    try {
      await orderService.createOrder({
        fullName: addressInfo.full_name,
        address: addressInfo.address,
        phoneNumber: addressInfo.phone_number,
        items: items,
      });
      navigate(routes.CUSTOMER.PURCHASE);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ProductLayout>
      <AddressesDialog ref={dialogRef} onSetAddress={setAddressInfo} />
      <main className="flex flex-1 flex-col gap-6 py-6 pl-6">
        <div className="space-y-4">
          <h1 className="text-lg font-semibold">Dia Chi Nhan Hang</h1>
          <SectionCard className="flex flex-row justify-between  p-4">
            <div className="flex flex-col gap-1">
              <div>{addressInfo.full_name}</div>
              <div className="text-sm">
                <span className="text-[#787C80]">Dia chi:</span>{" "}
                {addressInfo.address}
              </div>
              <div className="text-sm">
                <span className="text-[#787C80]">Dien thoai:</span>{" "}
                {addressInfo.phone_number}
              </div>
            </div>
            <div className="flex flex-row gap-4 items-center">
              <Button
                variant="secondary"
                onClick={() => dialogRef.current?.onOpen(addressInfo)}
              >
                Thay doi
              </Button>
            </div>
          </SectionCard>
        </div>
        <div className="space-y-4">
          <h1 className="text-lg font-semibold">San Pham</h1>
          <SectionCard className="p-2">
            <CheckoutTableHeader />
            <div>
              {cartItemsSelected.map((item, index) => {
                return <CheckoutTableRow key={index} data={item} />;
              })}
            </div>
            <div className="flex p-4">
              <div className="ml-auto font-medium">{`Tong so tien (${
                cartItemsSelected.length
              } san pham): ${handleCountTotalPrice()}d`}</div>
            </div>
          </SectionCard>
        </div>
        <SectionCard className="p-4 flex">
          <Button className="ml-auto" onClick={handleOrder}>
            Dat hang
          </Button>
        </SectionCard>
      </main>
    </ProductLayout>
  );
}
