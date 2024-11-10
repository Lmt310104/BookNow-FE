import { Button } from "@/components/ui/button";
import SectionCard from "../shared/section-card";
import { ResAddress } from "@/types/address";
import React from "react";

interface CustomerAddressProps {
  data: ResAddress;
}

export const CustomerAddress: React.FC<CustomerAddressProps> = ({ data }) => {
  return (
    <SectionCard className="flex flex-row justify-between  p-4">
      <div className="flex flex-col gap-1">
        <div>{data.full_name}</div>
        <div className="text-sm">
          <span className="text-[#787C80]">Dia chi: </span>
          {data.address}
        </div>
        <div className="text-sm">
          <span className="text-[#787C80]">Dien thoai: </span>
          {data.phone_number}
        </div>
      </div>
      <div className="flex flex-row gap-4 items-center">
        <Button variant="secondary">Chinh sua</Button>
        <Button variant="outline">Xoa</Button>
      </div>
    </SectionCard>
  );
};
