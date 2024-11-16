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
import { OrderStatus } from "@/common/enums";
import OptionCard from "@/components/report/option-card";
import CustomChart from "@/components/report/custom-chart";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/vi";
import isoWeek from "dayjs/plugin/isoWeek";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table
} from "@/components/ui/table";

dayjs.extend(isoWeek);
dayjs.locale("vi");

export default function ReportRoute() {
  const [pickerType, setPickerType] = useState<
    "date" | "week" | "month" | "year"
  >("week");
  const [selectedDayjs, setSelectedDayjs] = useState<Dayjs>(dayjs());

  const handleDateSelect = (data: DataSelectProps) => {
    setPickerType(data.pickerType);
    setSelectedDayjs(data.date);
  };
  return (
    <DashBoardLayout>
      <main className="flex flex-1 flex-col gap-6 p-6  bg-muted/40 overflow-y-auto w-full">
        <Tabs value="all">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="all">Tổng quan</TabsTrigger>
              <TabsTrigger value="product">Sản phẩm</TabsTrigger>
              <TabsTrigger value="sale">Doanh số</TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
        <div className="flex flex-row gap-4">
          <CustomDatePicker
            buttonText="Chọn thời gian"
            defaultPickerType="week"
            onDateSelect={handleDateSelect}
          />
          <Select value={"all"}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Chọn loại đơn hàng" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Đơn đã đặt</SelectItem>
              <SelectItem value={OrderStatus.PROCESSING}>
                Đơn đã xác nhận
              </SelectItem>
              <SelectItem value={OrderStatus.SUCCESS}>
                Đơn đã hoàn tất
              </SelectItem>
            </SelectContent>
          </Select>
          <Button variant={"outline"} className="ml-auto">
            <ArrowDownToLine className="w-4 h-4" />
            Tải dữ liệu
          </Button>
        </div>
        <div className="grid grid-cols-5 gap-4">
          <OptionCard
            title="Doanh số"
            value={0}
            description="so với 30 ngày trước 0,00%"
            icon={<CreditCard className="w-4 h-4" />}
            className="text-[#F2994A] border-[#F2994A]"
          />
          <OptionCard
            title="Đơn hàng"
            value={0}
            description="so với 30 ngày trước 0,00%"
            icon={<ClipboardList className="w-4 h-4" />}
            className="text-[#2ECC71] border-[#2ECC71]"
          />
          <OptionCard
            title="Đơn đã hủy"
            value={0}
            description="so với 30 ngày trước 0,00%"
            icon={<ClipboardX className="w-4 h-4" />}
            className="text-[#FF69B4] border-[#FF69B4]"
          />
          <OptionCard
            title="Doanh số mỗi đơn hàng"
            value={0}
            description="so với 30 ngày trước 0,00%"
            icon={<CircleDollarSign className="w-4 h-4" />}
            className="text-[#EBC844] border-[#EBC844]"
          />
          <OptionCard
            title="Lượt đăng ký"
            value={0}
            description="so với 30 ngày trước 0,00%"
            icon={<User className="w-4 h-4" />}
            className="text-[#4573B8] border-[#4573B8]"
          />
        </div>
        <CustomChart pickerType={pickerType} date={selectedDayjs} />
        <div className="grid grid-cols-[55%_45%] gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Thứ hạng sản phẩm</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value="all" className="mb-4">
                <div className="flex items-center">
                  <TabsList>
                    <TabsTrigger value="all">Theo doanh số</TabsTrigger>
                    <TabsTrigger value="product">Theo số sản phẩm</TabsTrigger>
                  </TabsList>
                </div>
              </Tabs>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Thứ hạng</TableHead>
                    <TableHead>Thông tin sản phẩm</TableHead>
                    <TableHead>Theo doanh số</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>Haaaa</TableCell>
                    <TableCell>2000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2</TableCell>
                    <TableCell>Haaaa</TableCell>
                    <TableCell>2000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>3</TableCell>
                    <TableCell>aaaa</TableCell>
                    <TableCell>2000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>4</TableCell>
                    <TableCell>Haaaa</TableCell>
                    <TableCell>2000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>5</TableCell>
                    <TableCell>Haaaa</TableCell>
                    <TableCell>2000</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Thứ hạng danh mục</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Thứ hạng</TableHead>
                    <TableHead>Danh mục</TableHead>
                    <TableHead>Theo doanh số</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>Haaaa</TableCell>
                    <TableCell>2000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2</TableCell>
                    <TableCell>Haaaa</TableCell>
                    <TableCell>2000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>3</TableCell>
                    <TableCell>aaaa</TableCell>
                    <TableCell>2000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>4</TableCell>
                    <TableCell>Haaaa</TableCell>
                    <TableCell>2000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>5</TableCell>
                    <TableCell>Haaaa</TableCell>
                    <TableCell>2000</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </DashBoardLayout>
  );
}
