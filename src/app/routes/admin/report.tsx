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
import {
  ResGetRevenueStatisticByDateData,
  StatisticQuery,
} from "@/types/statistic";
import Top10Categories from "@/components/report/overall/top-category";
import Top10Books from "@/components/report/overall/top-books";
import CustomChart from "@/components/report/custom-chart";
import { ChartConfig } from "@/components/ui/chart";
import { getDayRange } from "@/utils/date";
import { dateToString } from "@/utils/format";

dayjs.extend(isoWeek);
dayjs.locale("vi");

const overallChartConfig = {
  totalRevenue: {
    label: "Doanh Số",
    color: "#ff871d",
  },
  orderSuccess: {
    label: "Đơn hàng thành công",
    color: "#136d39",
  },
  orderCancelledAndRejected: {
    label: "Đơn Đã Hủy",
    color: "#222357",
  },
} satisfies ChartConfig;

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
  const [chartData, setChartData] = useState<
    Array<ResGetRevenueStatisticByDateData>
  >([]);

  const handleGetOverviewStatistic = async (query: StatisticQuery) => {
    try {
      const response = await statisticService.getRevenueStatisticByDate({
        fromDate: query.fromDate,
        toDate: query.toDate,
      });
      const newOverviewData = response.data.data.reduce(
        (total, item) => {
          total.sales += item.totalRevenue;
          total.orders += item.orderSuccess;
          total.cancelledOrders += item.orderCancelledAndRejected;
          return total;
        },
        {
          sales: 0,
          orders: 0,
          cancelledOrders: 0,
        }
      );
      setOverviewData(newOverviewData);
      setChartData(
        getFullDateRangeData(response.data.data, query.fromDate, query.toDate)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getFullDateRangeData = (
    data: Array<ResGetRevenueStatisticByDateData>,
    fromDate: string,
    toDate: string
  ) => {
    const startDate = new Date(fromDate);
    const endDate = new Date(toDate);
    const dataMap = new Map();
    data.forEach((item) => {
      dataMap.set(item.date, item);
    });

    const fullData = [];

    for (
      let current = new Date(startDate);
      current <= endDate;
      current.setDate(current.getDate() + 1)
    ) {
      const dateString = dateToString(current);

      if (dataMap.has(dateString)) {
        fullData.push(dataMap.get(dateString));
      } else {
        fullData.push({
          date: dateString,
          orderCancelledAndRejected: 0,
          orderSuccess: 0,
          totalRevenue: 0,
        });
      }
    }

    return fullData;
  };

  const handleDateSelect = (data: DataSelectProps) => {
    setPickerType(data.pickerType);
    setSelectedDayjs(data.date);
  };

  useEffect(() => {
    const { startOfRange, endOfRange } = getDayRange(selectedDayjs, pickerType);
    handleGetOverviewStatistic({
      fromDate: startOfRange.toISOString(),
      toDate: endOfRange.toISOString(),
    });
  }, [pickerType, selectedDayjs]);

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
            className="text-[#136d39] border-[#136d39]"
          />
          <OptionCard
            title="Đơn đã hủy"
            value={overviewData.cancelledOrders}
            icon={<ClipboardX className="w-4 h-4" />}
            className="text-[#222357] border-[#222357]"
          />
        </div>
        <CustomChart
          title="Tổng quan"
          config={overallChartConfig}
          chartData={chartData}
        />
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
