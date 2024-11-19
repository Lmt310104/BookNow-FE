import { Card } from "@/components/ui/card";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from "@/components/ui/table";
import { StatisticQuery } from "@/types/statistic";
import statisticService from "@/services/statistic.service";
import { useEffect, useState } from "react";
import { Dayjs } from "dayjs";

interface TopCategoriesProps {
  date: Dayjs;
  pickerType: "date" | "week" | "month" | "year";
  status: string;
}

export default function Top10Categories({
  date,
  pickerType,
  status,
}: TopCategoriesProps) {
  const [data, setData] = useState<
    Array<{
      categoryId: string;
      categoryName: string;
      totalRevenues: number;
    }>
  >([]);

  const handleGetRevenueStatisticByCategory = async (query: StatisticQuery) => {
    try {
      const response = await statisticService.getRevenueStatisticByCategory({
        fromDate: query.fromDate,
        toDate: query.toDate,
        status: query.status,
        top: 10,
      });
      setData(
        response.data.data.map((item) => {
          return {
            categoryId: item.category.id,
            categoryName: item.category.name,
            totalRevenues: item.totalRevenues,
          };
        })
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

    handleGetRevenueStatisticByCategory({
      fromDate: startOfRange.toISOString(),
      toDate: endOfRange.toISOString(),
      status,
    });
  }, [date, pickerType, status]);

  return (
    <Card className="p-6">
      <div className="flex flex-row justify-between mb-4">
        <span className="font-medium">Top 10 danh mục</span>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Thứ hạng</TableHead>
            <TableHead>Danh mục</TableHead>
            <TableHead>Doanh số</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.categoryName}</TableCell>
                <TableCell>{item.totalRevenues}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
}
