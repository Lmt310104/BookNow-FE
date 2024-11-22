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
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Dayjs } from "dayjs";
import { Category } from "@/types/category";
import { Label, Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getDayRange } from "@/utils/date";
const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 190, fill: "var(--color-other)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

interface CategorySectionProps {
  date: Dayjs;
  pickerType: "date" | "week" | "month" | "year";
  status: string;
}

interface CategorySectionData {
  categoryId: string;
  categoryName: string;
  totalRevenues: number;
  percent: number;
  fill: string;
}

export interface CategorySectionRef {
  getData: () => Array<CategorySectionData>;
}

const CategorySection = forwardRef<CategorySectionRef, CategorySectionProps>(
  function CategorySection({ date, pickerType, status }, ref) {
    const [data, setData] = useState<Array<CategorySectionData>>([]);
    const [config, setConfig] = useState<ChartConfig>({});
    const handleGetRevenueStatisticByCategory = async (
      query: StatisticQuery
    ) => {
      try {
        const response = await statisticService.getRevenueStatisticByCategory({
          fromDate: query.fromDate,
          toDate: query.toDate,
          status: query.status,
        });
        const totalRevenues = response.data.data.reduce(
          (total, item) => total + +item.totalRevenues,
          0
        );
        setData(
          response.data.data.map((item) => ({
            categoryId: item.category.id,
            categoryName: item.category.name,
            totalRevenues: item.totalRevenues,
            percent: Number(
              ((item.totalRevenues / totalRevenues) * 100).toFixed(2)
            ),
            fill: `var(--color-${item.category.id})`,
          }))
        );
        const newChartConfig: ChartConfig = {};
        response.data.data.forEach((item, index) => {
          newChartConfig[item.category.id] = {
            label: item.category.name,
            color: `hsl(var(--chart-${index + 1}))`,
          };
        });
        setConfig(newChartConfig);
      } catch (error) {
        console.log(error);
      }
    };

    useImperativeHandle(ref, () => {
      return {
        getData() {
          return data;
        },
      };
    });

    useEffect(() => {
      const { startOfRange, endOfRange } = getDayRange(date, pickerType);
      handleGetRevenueStatisticByCategory({
        fromDate: startOfRange.toISOString(),
        toDate: endOfRange.toISOString(),
        status,
      });
    }, [date, pickerType, status]);

    return (
      <Card className="p-6">
        <div className="flex flex-row justify-between mb-4">
          <span className="font-medium">Theo danh mục</span>
        </div>
        <div className="grid grid-cols-[70%_30%] gap-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Danh mục</TableHead>
                <TableHead>Doanh số</TableHead>
                <TableHead>Doanh số %</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.categoryName}</TableCell>
                  <TableCell>{item.totalRevenues}</TableCell>
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
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={data}
                dataKey="percent"
                nameKey="categoryId"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {/* {totalVisitors.toLocaleString()} */}
                          </tspan>
                          {/* <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Doanh số
                        </tspan> */}
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </div>
      </Card>
    );
  }
);

export default CategorySection;
