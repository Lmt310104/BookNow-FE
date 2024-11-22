import { Card } from "@/components/ui/card";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import image from "@/assets/placeholder.svg";
import { StatisticQuery } from "@/types/statistic";
import statisticService from "@/services/statistic.service";
import { useEffect, useState } from "react";
import { ResBookDetail } from "@/types/book";
import { Dayjs } from "dayjs";

interface TopBooksProps {
  date: Dayjs;
  pickerType: "date" | "week" | "month" | "year";
  status: string;
}

export default function Top10Books({ date, pickerType, status }: TopBooksProps) {
  const [data, setData] = useState<
    Array<{
      book: ResBookDetail;
      totalRevenue?: number;
      totalQuantity?: number;
    }>
  >([]);
  const [queryType, setQueryType] = useState<string>("revenue");
  const handleGetProductStatisticByRevenue = async (query: StatisticQuery) => {
    try {
      const response = await statisticService.getProductStatisticByRevenue({
        fromDate: query.fromDate,
        toDate: query.toDate,
        status: query.status,
        top: 10,
      });
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetProductStatisticBySoldQuantity = async (
    query: StatisticQuery
  ) => {
    try {
      const response = await statisticService.getProductStatisticBySoldQuantity(
        {
          fromDate: query.fromDate,
          toDate: query.toDate,
          status: query.status,
          top: 10,
        }
      );
      setData(response.data.data);
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
    if (queryType === "revenue") {
      handleGetProductStatisticByRevenue({
        fromDate: startOfRange.toISOString(),
        toDate: endOfRange.toISOString(),
        status,
      });
    } else {
      handleGetProductStatisticBySoldQuantity({
        fromDate: startOfRange.toISOString(),
        toDate: endOfRange.toISOString(),
        status,
      });
    }
  }, [date, pickerType, status, queryType]);

  return (
    <Card className="p-6">
      <div className="flex flex-row justify-between mb-4">
        <span className="font-medium">Top 10 sản phẩm</span>
        <Select value={queryType} onValueChange={setQueryType}>
          <SelectTrigger className="w-fit h-7">
            <SelectValue placeholder="Chọn loại đơn hàng" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="revenue">Theo doanh số</SelectItem>
            <SelectItem value="sold">Theo số sản phẩm</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Thứ hạng</TableHead>
            <TableHead>Thông tin sản phẩm</TableHead>
            {queryType === "revenue" ? (
              <TableHead>Doanh số</TableHead>
            ) : (
              <TableHead>Số sản phẩm</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
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
                {queryType === "revenue" ? (
                  <TableCell>{item.totalRevenue}</TableCell>
                ) : (
                  <TableCell>{item.totalQuantity}</TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
}
