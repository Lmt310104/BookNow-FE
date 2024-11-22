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
  ResGetRevenueStatisticByCustomerData,
  StatisticQuery,
} from "@/types/statistic";
import statisticService from "@/services/statistic.service";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Dayjs } from "dayjs";
import { Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getDayRange } from "@/utils/date";

const chartConfig: ChartConfig = {
  percentageRevenue: {
    label: "Doanh thu %",
  },
  percentage: {
    label: "Người mua %",
  },
  newCustomers: {
    label: "Người mua mới",
    color: `hsl(var(--chart-1))`,
  },
  oldCustomers: {
    label: "Người mua cũ",
    color: `hsl(var(--chart-1))`,
  },
};

interface CategorySectionProps {
  date: Dayjs;
  pickerType: "date" | "week" | "month" | "year";
  status: string;
}

interface UserSectionChartData {
  group: string;
  percentageRevenue: number;
  revenue: number;
  number: number;
  percentageNumber: number;
  fill: string;
}

export interface UserSectionRef {
  getData: () => Array<UserSectionChartData>;
}

const UserSection = forwardRef<UserSectionRef, CategorySectionProps>(
  function UserSection({ date, pickerType, status }, ref) {
    const [data, setData] =
      useState<ResGetRevenueStatisticByCustomerData | null>(null);
    const [chartData, setChartData] = useState<Array<UserSectionChartData>>([]);

    const handleGetRevenueStatisticByCustomer = async (
      query: StatisticQuery
    ) => {
      try {
        const response = await statisticService.getRevenueStatisticByCustomer({
          fromDate: query.fromDate,
          toDate: query.toDate,
          status: query.status,
        });
        setData(response.data.data);

        const newChartData = [
          {
            group: "newCustomers",
            percentageRevenue:
              response.data.data.newCustomers.percentageRevenue,
            percentageNumber: response.data.data.newCustomers.percentage,
            fill: `var(--color-newCustomers)`,
            revenue: response.data.data.newCustomers.newCustomerRevenue,
            number: response.data.data.newCustomers.totalNewCustomers,
          },
          {
            group: "oldCustomers",
            percentageRevenue:
              response.data.data.oldCustomers.percentageRevenue,
            percentageNumber: response.data.data.oldCustomers.percentage,
            fill: `var(--color-oldCustomers)`,
            revenue: response.data.data.oldCustomers.oldCustomerRevenue,
            number: response.data.data.oldCustomers.totalOldCustomers,
          },
        ];
        setChartData(newChartData);
      } catch (error) {
        console.log(error);
      }
    };

    useImperativeHandle(ref, () => {
      return {
        getData() {
          return chartData;
        },
      };
    });

    useEffect(() => {
      const { startOfRange, endOfRange } = getDayRange(date, pickerType);
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
                <TableHead>Nhóm</TableHead>
                <TableHead>Người mua</TableHead>
                <TableHead>% Người mua</TableHead>
                <TableHead>Doanh số</TableHead>
                <TableHead>% Doanh số</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Người mua mới</TableCell>
                <TableCell>
                  {data?.newCustomers.totalNewCustomers || 0}
                </TableCell>
                <TableCell>{data?.newCustomers.percentage || 0}</TableCell>
                <TableCell>
                  {data?.newCustomers.newCustomerRevenue || 0}
                </TableCell>
                <TableCell>
                  {data?.newCustomers.percentageRevenue || 0}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Người mua cũ</TableCell>
                <TableCell>
                  {data?.oldCustomers.totalOldCustomers || 0}
                </TableCell>
                <TableCell>{data?.oldCustomers.percentage || 0}</TableCell>
                <TableCell>
                  {data?.oldCustomers.oldCustomerRevenue || 0}
                </TableCell>
                <TableCell>
                  {data?.oldCustomers.percentageRevenue || 0}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <ChartContainer
            config={chartConfig}
            className="aspect-square max-h-[250px] w-full h-full"
          >
            <PieChart>
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    nameKey="group"
                    indicator="line"
                    labelFormatter={(_, payload) => {
                      return chartConfig[
                        payload?.[0].dataKey as keyof typeof chartConfig
                      ].label;
                    }}
                  />
                }
              />
              <Pie
                data={chartData}
                dataKey="percentageRevenue"
                outerRadius={60}
              />
              <Pie
                data={chartData}
                dataKey="percentageNumber"
                innerRadius={70}
                outerRadius={90}
              />
            </PieChart>
          </ChartContainer>
        </div>
      </Card>
    );
  }
);

export default UserSection;
