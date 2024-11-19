import DashBoardLayout from "@/components/layouts/dashboard-layout";
import { Button } from "@/components/ui/button";
import {
  ArrowDownToLine,
  CircleDollarSign,
  ClipboardList,
  ClipboardX,
  CreditCard,
  User,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomDatePicker, {
  DataSelectProps,
} from "@/components/shared/date-picker";
import OptionCard from "@/components/report/option-card";
import CustomChart from "@/components/report/custom-chart";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/vi";
import isoWeek from "dayjs/plugin/isoWeek";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from "@/components/ui/table";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "@/config";
import image from "@/assets/placeholder.svg";
import {
  overallChartConfig,
  overallChartData,
} from "@/components/report/overall-chart-data";
import { statistic } from "antd/es/theme/internal";
import statisticService from "@/services/statistic.service";
import { OrderStatus } from "@/common/enums";
import { StatisticQuery } from "@/types/statistic";
import TopBooks from "@/components/report/overall/top-books";
import TopCategories from "@/components/report/revenue/categories-section";

dayjs.extend(isoWeek);
dayjs.locale("vi");

export default function ReportRoute() {
  const [pickerType, setPickerType] = useState<
    "date" | "week" | "month" | "year"
  >("week");
  const [selectedDayjs, setSelectedDayjs] = useState<Dayjs>(dayjs());
  const [orderStatus, setOrderStatus] = useState<string>(
    "all"
  );
  const location = useLocation();
  const navigate = useNavigate();
  const [chartData, setChartData] = useState<unknown[]>([]);

  const handleGetOverviewStatistic = async (query: StatisticQuery) => {
    try {
      const response = await statisticService.getOverviewStatistic({
        fromDate: query.fromDate,
        toDate: query.toDate,
        status: query.status,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetProductStatisticByOrder = async (query: StatisticQuery) => {
    try {
      const response = await statisticService.getProductStatisticByOrder({
        fromDate: query.fromDate,
        toDate: query.toDate,
        status: query.status,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetProductStatisticByRevenue = async (query: StatisticQuery) => {
    try {
      const response = await statisticService.getProductStatisticByRevenue({
        fromDate: query.fromDate,
        toDate: query.toDate,
        status: query.status,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetRevenueStatisticByCategory = async (query: StatisticQuery) => {
    try {
      const response = await statisticService.getRevenueStatisticByCategory({
        fromDate: query.fromDate,
        toDate: query.toDate,
        status: query.status,
      });
      console.log("handleGetRevenueStatisticByCategory", response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetRevenueStatisticByCustomer = async (query: StatisticQuery) => {
    try {
      const response = await statisticService.getRevenueStatisticByCustomer({
        fromDate: query.fromDate,
        toDate: query.toDate,
        status: query.status,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredData = (date: Dayjs) => {
    let startOfRange: Dayjs = date;
    let endOfRange: Dayjs = date;
    if (pickerType === "week") {
      startOfRange = date.startOf("isoWeek").startOf("day");
      endOfRange = startOfRange.add(6, "day").endOf("day");
    } else if (pickerType === "month") {
      startOfRange = date.startOf("month").startOf("day");
      endOfRange = startOfRange.endOf("month").endOf("day");
    } else if (pickerType === "year") {
      startOfRange = date.startOf("year").startOf("day");
      endOfRange = startOfRange.endOf("year").endOf("day");
    } else {
      startOfRange = date.startOf("day");
      endOfRange = startOfRange.endOf("day");
    }
    const data = overallChartData.filter((item) => {
      const date = new Date(item.date);
      return date >= startOfRange.toDate() && date <= endOfRange.toDate();
    });
    return data;
  };

  const handleDateSelect = (data: DataSelectProps) => {
    setPickerType(data.pickerType);
    setSelectedDayjs(data.date);
  };
  const description =
    pickerType === "week"
      ? "so với tuần trước 0%"
      : pickerType === "month"
      ? "so với tháng trước 0%"
      : pickerType === "year"
      ? "so với năm trước 0%"
      : "so với ngày hôm qua 0%";

  // useEffect(() => {
  //   handleGetRevenueStatisticByCategory({
  //     fromDate: selectedDayjs.startOf("month").startOf("day").toISOString(),
  //     toDate: selectedDayjs.endOf("month").endOf("day").toISOString(),
  //     status: orderStatus,
  //   });
  // }, []);

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
          <Select value={orderStatus}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Chọn loại đơn hàng" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                value={"all"}
                onClick={() => setOrderStatus("all")}
              >
                Đơn đã đặt
              </SelectItem>
              <SelectItem
                value={OrderStatus.SUCCESS}
                onClick={() => setOrderStatus(OrderStatus.SUCCESS)}
              >
                Đơn đã hoàn tất
              </SelectItem>
            </SelectContent>
          </Select>
          <Button variant={"outline"} className="ml-auto">
            <ArrowDownToLine className="w-4 h-4" />
            Tải dữ liệu
          </Button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <OptionCard
            title="Doanh số"
            value={0}
            description={description}
            icon={<CreditCard className="w-4 h-4" />}
            className="text-[#F2994A] border-[#F2994A]"
          />
          <OptionCard
            title="Đơn hàng"
            value={0}
            description={description}
            icon={<ClipboardList className="w-4 h-4" />}
            className="text-[#2ECC71] border-[#2ECC71]"
          />
          <OptionCard
            title="Đơn đã hủy"
            value={0}
            description={description}
            icon={<ClipboardX className="w-4 h-4" />}
            className="text-[#FF69B4] border-[#FF69B4]"
          />
          <OptionCard
            title="Doanh số mỗi đơn hàng"
            value={0}
            description={description}
            icon={<CircleDollarSign className="w-4 h-4" />}
            className="text-[#EBC844] border-[#EBC844]"
          />
        </div>
        {/* <CustomChart
          title="Tổng quan"
          config={overallChartConfig}
          chartData={filteredData(selectedDayjs)}
        /> */}
        <div className="grid grid-cols-[55%_1fr] gap-4">
          <TopBooks
            pickerType={pickerType}
            date={selectedDayjs}
            status={orderStatus}
          />
          <TopCategories
            pickerType={pickerType}
            date={selectedDayjs}
            status={orderStatus}
          />
        </div>
      </main>
    </DashBoardLayout>
  );
}
