import DashBoardLayout from "@/components/layouts/dashboard-layout";
import { Button } from "@/components/ui/button";
import { ArrowDownToLine } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomDatePicker, {
  DataSelectProps,
} from "@/components/shared/date-picker";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/vi";
import isoWeek from "dayjs/plugin/isoWeek";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "@/config";
import CategorySection from "@/components/report/revenue/categories-section";
import UserSection from "@/components/report/revenue/user-section";

dayjs.extend(isoWeek);
dayjs.locale("vi");

export default function IncomeReportRoute() {
  const [pickerType, setPickerType] = useState<
    "date" | "week" | "month" | "year"
  >("week");
  const [selectedDayjs, setSelectedDayjs] = useState<Dayjs>(dayjs());
  const [orderStatus, setOrderStatus] = useState<string>("all");
  const location = useLocation();
  const navigate = useNavigate();

  const handleDateSelect = (data: DataSelectProps) => {
    setPickerType(data.pickerType);
    setSelectedDayjs(data.date);
  };
;

  return (
    <DashBoardLayout>
      <main className="flex flex-1 flex-col gap-6 p-6  bg-muted/40 overflow-y-auto w-full">
        <Tabs value={location.pathname}>
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger
                value={routes.ADMIN.REPORT}
                onClick={() => navigate(routes.ADMIN.REPORT)}
              >
                Tổng quan
              </TabsTrigger>
              <TabsTrigger
                value={routes.ADMIN.BOOK_REPORT}
                onClick={() => navigate(routes.ADMIN.BOOK_REPORT)}
              >
                Sản phẩm
              </TabsTrigger>
              <TabsTrigger
                value={routes.ADMIN.INCOME_REPORT}
                onClick={() => navigate(routes.ADMIN.INCOME_REPORT)}
              >
                Doanh số
              </TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
        <div className="flex flex-row gap-4">
          <CustomDatePicker
            buttonText="Chọn thời gian"
            defaultPickerType="week"
            onDateSelect={handleDateSelect}
          />
          <Button variant={"outline"} className="ml-auto">
            <ArrowDownToLine className="w-4 h-4" />
            Tải dữ liệu
          </Button>
        </div>
        <CategorySection
          pickerType={pickerType}
          date={selectedDayjs}
          status={orderStatus}
        />
        <UserSection
          pickerType={pickerType}
          date={selectedDayjs}
          status={orderStatus}
        />
      </main>
    </DashBoardLayout>
  );
}
