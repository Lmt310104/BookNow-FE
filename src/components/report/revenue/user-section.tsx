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
import image from "@/assets/placeholder.svg";
import { Label, Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface CategorySectionProps {
  date: Dayjs;
  pickerType: "date" | "week" | "month" | "year";
  status: string;
}

export default function UserSection({
  date,
  pickerType,
  status,
}: CategorySectionProps) {
  const [data, setData] = useState<
    Array<{
      userId: string;
      fullName: string;
      totalRevenue: number;
      totalOrders: number;
      percent: number;
      fill: string;
      avatarUrl: string;
    }>
  >([]);
  const [config, setConfig] = useState<ChartConfig>({});

  const handleGetRevenueStatisticByCustomer = async (query: StatisticQuery) => {
    try {
      const response = await statisticService.getRevenueStatisticByCustomer({
        fromDate: query.fromDate,
        toDate: query.toDate,
        status: query.status,
      });
      const totalRevenues = response.data.data.reduce(
        (total, item) => total + +item.totalRevenue,
        0
      );
      setData(
        response.data.data.map((item) => ({
          userId: item.user.id,
          fullName: item.user.full_name,
          avatarUrl: item.user.avatar_url || image,
          totalRevenue: item.totalRevenue,
          totalOrders: item.totalOrders,
          percent: Number(
            ((item.totalRevenue / totalRevenues) * 100).toFixed(2)
          ),
          fill: `var(--color-${item.user.id})`,
        }))
      );
      const newChartConfig: ChartConfig = {
        percent: {
          label: "Doanh thu %",
        },
        totalOrders: {
          label: "Số đơn hàng",
        },
      };
      response.data.data.forEach((item, index) => {
        newChartConfig[item.user.id] = {
          label: item.user.full_name,
          color: `hsl(var(--chart-${index + 1}))`,
        };
      });
      setConfig(newChartConfig);
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
    handleGetRevenueStatisticByCustomer({
      fromDate: startOfRange.toISOString(),
      toDate: endOfRange.toISOString(),
      status,
    });
  }, [date, pickerType, status]);

  return (
    <Card className="p-6">
      <div className="flex flex-row justify-between mb-4">
        <span className="font-medium">Theo người mua</span>
      </div>
      <div className="grid grid-cols-[70%_30%] gap-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Người mua</TableHead>
              <TableHead>Số đơn hàng</TableHead>
              <TableHead>Doanh số</TableHead>
              <TableHead>Doanh số %</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex flex-row gap-2 items-center">
                    <div className="w-5 h-5 aspect-square rounded-full overflow-hidden">
                      <img
                        alt="avt"
                        className="w-full h-full object-cover"
                        src={item.avatarUrl}
                      />
                    </div>
                    <span>{item.fullName}</span>
                  </div>
                </TableCell>
                <TableCell>{item.totalOrders}</TableCell>
                <TableCell>{item.totalRevenue}</TableCell>
                <TableCell>{item.percent}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ChartContainer
          config={config}
          className="aspect-square max-h-[250px] w-full h-full"
        >
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  nameKey="userId"
                  indicator="line"
                  labelFormatter={(_, payload) => {
                    return config[payload?.[0].dataKey as keyof typeof config]
                      .label;
                  }}
                />
              }
            />
            <Pie data={data} dataKey="percent" outerRadius={60} />
            <Pie
              data={data}
              dataKey="totalOrders"
              innerRadius={70}
              outerRadius={90}
            />
          </PieChart>
        </ChartContainer>
      </div>
    </Card>
  );
}
