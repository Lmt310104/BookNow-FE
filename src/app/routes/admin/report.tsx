import DashBoardLayout from "@/components/layouts/dashboard-layout";
import { Button } from "@/components/ui/button";
import {
  ArrowDownToLine,
  ClipboardList,
  ClipboardX,
  CreditCard,
} from "lucide-react";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomDatePicker, {
  DataSelectProps,
} from "@/components/shared/date-picker";
import OptionCard from "@/components/report/option-card";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/vi";
import isoWeek from "dayjs/plugin/isoWeek";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "@/config";
import statisticService from "@/services/statistic.service";
import { OrderStatus } from "@/common/enums";
import { StatisticQuery } from "@/types/statistic";
import Top10Categories from "@/components/report/overall/top-category";
import Top10Books from "@/components/report/overall/top-books";

dayjs.extend(isoWeek);
dayjs.locale("vi");

export default function ReportRoute() {
  const [pickerType, setPickerType] = useState<
    "date" | "week" | "month" | "year"
  >("week");
  const [selectedDayjs, setSelectedDayjs] = useState<Dayjs>(dayjs());
  const location = useLocation();
  const navigate = useNavigate();
  const [overviewData, setOverviewData] = useState<{
    sales: number;
    orders: number;
    cancelledOrders: number;
  }>({
    sales: 0,
    orders: 0,
    cancelledOrders: 0,
  });

  const handleGetOverviewStatistic = async (query: StatisticQuery) => {
    try {
      const response = await Promise.all([
        statisticService.getOverviewStatistic({
          fromDate: query.fromDate,
          toDate: query.toDate,
          status: OrderStatus.SUCCESS,
        }),
        statisticService.getOverviewStatistic({
          fromDate: query.fromDate,
          toDate: query.toDate,
          status: OrderStatus.REJECT,
        }),
        statisticService.getOverviewStatistic({
          fromDate: query.fromDate,
          toDate: query.toDate,
          status: OrderStatus.CANCELLED,
        }),
      ]);
      setOverviewData({
        sales: response[0].data.data.revenue,
        orders: response[0].data.data.totalOrders,
        cancelledOrders:
          response[1].data.data.totalOrders + response[2].data.data.totalOrders,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDateSelect = (data: DataSelectProps) => {
    setPickerType(data.pickerType);
    setSelectedDayjs(data.date);
  };

  useEffect(() => {
    handleGetOverviewStatistic({
      fromDate: selectedDayjs.startOf("month").startOf("day").toISOString(),
      toDate: selectedDayjs.endOf("month").endOf("day").toISOString(),
      status: OrderStatus.SUCCESS,
    });
  }, [pickerType]);

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
        <div className="grid grid-cols-3 gap-4">
          <OptionCard
            title="Doanh số"
            value={overviewData.sales}
            icon={<CreditCard className="w-4 h-4" />}
            className="text-[#F2994A] border-[#F2994A]"
          />
          <OptionCard
            title="Đơn hàng thành công"
            value={overviewData.orders}
            icon={<ClipboardList className="w-4 h-4" />}
            className="text-[#2ECC71] border-[#2ECC71]"
          />
          <OptionCard
            title="Đơn đã hủy"
            value={overviewData.cancelledOrders}
            icon={<ClipboardX className="w-4 h-4" />}
            className="text-[#FF69B4] border-[#FF69B4]"
          />
        </div>
        {/* <CustomChart
          title="Tổng quan"
          config={overallChartConfig}
          chartData={filteredData(selectedDayjs)}
        /> */}
        <div className="grid grid-cols-[55%_1fr] gap-4">
          <Top10Books
            pickerType={pickerType}
            date={selectedDayjs}
            status={OrderStatus.SUCCESS}
          />
          <Top10Categories
            pickerType={pickerType}
            date={selectedDayjs}
            status={OrderStatus.SUCCESS}
          />
        </div>
      </main>
    </DashBoardLayout>
  );
}
