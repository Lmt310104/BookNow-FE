import { Card } from "@/components/ui/card";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from "@/components/ui/table";
import image from "@/assets/placeholder.svg";
import { StatisticQuery } from "@/types/statistic";
import statisticService from "@/services/statistic.service";
import { useEffect, useState } from "react";
import { ResBookDetail } from "@/types/book";
import { Dayjs } from "dayjs";


interface RevenueSectionProps {
  date: Dayjs;
  pickerType: "date" | "week" | "month" | "year";
}

export default function RevenueSection({
  date,
  pickerType,
}: RevenueSectionProps) {
  const [data, setData] = useState<
    Array<{
      book: ResBookDetail;
      totalRevenue: number;
      percent: number;
    }>
  >([]);
  const handleGetProductStatisticByRevenue = async (query: StatisticQuery) => {
    try {
      const response = await statisticService.getProductStatisticByRevenue({
        fromDate: query.fromDate,
        toDate: query.toDate,
        status: query.status,
      });
      const totalRevenue = response.data.data.reduce(
        (total, item) => total + +item.totalRevenue,
        0
      );
      setData(
        response.data.data.map((item) => ({
          ...item,
          percent: (item.totalRevenue / totalRevenue) * 100,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
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

    handleGetProductStatisticByRevenue({
      fromDate: startOfRange.toISOString(),
      toDate: endOfRange.toISOString(),
      status: "all",
    });
  }, [date, pickerType]);

  return (
    <Card className="p-6">
      <div className="flex flex-row justify-between mb-4">
        <span className="font-medium">Theo doanh thu</span>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Thông tin sản phẩm</TableHead>
            <TableHead>Doanh số</TableHead>
            <TableHead className="w-[100px]">Tỉ lệ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => {
            return (
              <TableRow key={index}>
                <TableCell className="flex flex-row gap-4 items-center">
                  <img
                    alt="Product image"
                    className="aspect-square rounded-md object-cover h-10 w-10"
                    src={
                      item.book.image_url.length > 0
                        ? item.book.image_url[0]
                        : image
                    }
                  />
                  <span>{item.book.title}</span>
                </TableCell>
                <TableCell>{item.totalRevenue}</TableCell>
                <TableCell>{item.percent?.toFixed(2)}%</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
}
