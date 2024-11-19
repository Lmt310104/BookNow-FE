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
import { OrderStatus } from "@/common/enums";
import { Button } from "@/components/ui/button";
import { ArrowDownToLine } from "lucide-react";
import ExcelJS from "exceljs";
import { BOOK_STATUS } from "@/common/constants";

interface BookSectionProps {
  date: Dayjs;
  pickerType: "date" | "week" | "month" | "year";
}

export default function BookSection({ date, pickerType }: BookSectionProps) {
  const [data, setData] = useState<
    Array<{
      book: ResBookDetail;
      totalRevenue: number;
      totalQuantity: number;
    }>
  >([]);
  const handleGetProductStatistic = async (query: StatisticQuery) => {
    try {
      const response = await Promise.all([
        statisticService.getProductStatisticByRevenue({
          fromDate: query.fromDate,
          toDate: query.toDate,
          status: query.status,
        }),
        statisticService.getProductStatisticBySoldQuantity({
          fromDate: query.fromDate,
          toDate: query.toDate,
          status: query.status,
        }),
      ]);

      setData(
        response[0].data.data.map((revenueItem) => {
          return {
            book: revenueItem.book,
            totalRevenue: revenueItem.totalRevenue,
            totalQuantity:
              response[1].data.data.find(
                (orderItem) => orderItem.book.id === revenueItem.book.id
              )?.totalQuantity || 0,
          };
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const exportExcelFile = () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Hiệu quả của sản phẩm");

    sheet.getRow(1).font = {
      bold: true,
    };

    sheet.columns = [
      {
        header: "Mã sản phẩm",
        key: "id",
        width: 50,
      },
      {
        header: "Tên sản phẩm",
        key: "title",
        width: 50,
      },
      {
        header: "Trạng thái",
        key: "status",
        width: 20,
      },
      {
        header: "Sản phẩm",
        key: "quantity",
        width: 15,
      },
      {
        header: "Doanh số (VND)",
        key: "revenue",
        width: 20,
      },
    ];

    const { startOfRange, endOfRange } = getDayRange();

    const promise = Promise.all(
      data.map(async (item) => {
        sheet.addRow({
          id: item.book.id,
          title: item.book.title,
          status: BOOK_STATUS[item.book.status],
          quantity: item.totalQuantity,
          revenue: item.totalRevenue,
        });
      })
    );

    promise.then(() => {
      workbook.xlsx.writeBuffer().then(function (data) {
        const blob = new Blob([data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = `[export_report]productoverview${startOfRange.format(
          "DDMMYYYY"
        )}-${endOfRange.format("DDMMYYYY")}.xlsx`;
        anchor.click();
        window.URL.revokeObjectURL(url);
      });
    });
  };

  const getDayRange = () => {
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
    return { startOfRange, endOfRange };
  };

  useEffect(() => {
    const { startOfRange, endOfRange } = getDayRange();
    handleGetProductStatistic({
      fromDate: startOfRange.toISOString(),
      toDate: endOfRange.toISOString(),
      status: OrderStatus.SUCCESS,
    });
  }, [date, pickerType]);

  return (
    <Card className="p-6">
      <div className="flex flex-row justify-between mb-4">
        <span className="font-medium">Hiệu quả của sản phẩm</span>
        <Button
          variant={"outline"}
          className="ml-auto"
          onClick={exportExcelFile}
        >
          <ArrowDownToLine className="w-4 h-4" />
          Tải dữ liệu
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Thông tin sản phẩm</TableHead>
            <TableHead>Doanh số</TableHead>
            <TableHead>Sản phẩm</TableHead>
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
                  <div className="flex flex-col">
                    <span>{item.book.title}</span>
                    <span className="text-xs">{`Mã sản phẩm: ${item.book.id}`}</span>
                  </div>
                </TableCell>
                <TableCell>{item.totalRevenue}</TableCell>
                <TableCell>{item.totalQuantity}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
}
