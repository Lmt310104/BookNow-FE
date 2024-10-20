import { Button } from "@/components/ui/button";

export const CustomerAddress = () => {
  return (
    <div className="  flex flex-row justify-between rounded-lg border border-dashed shadow-sm w-full bg-white p-4">
      <div className="flex flex-col gap-1">
        <div>DAO DUY THONG</div>
        <div className="text-sm">
          <span className="text-[#787C80]">Dia chi:</span> đường Hàn Thuyên,
          Phường Linh Trung, Thành phố Thủ Đức, Hồ Chí Minh
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
  );
};
