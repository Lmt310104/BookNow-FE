"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { DataSelectProps } from "../shared/date-picker";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/vi";
import isoWeek from "dayjs/plugin/isoWeek";
dayjs.extend(isoWeek);
dayjs.locale("vi");

const chartData = [
  // { date: "2024-08-16", desktop: 222, mobile: 150, web: 372 },
  // { date: "2024-08-17", desktop: 97, mobile: 180, web: 277 },
  // { date: "2024-08-18", desktop: 167, mobile: 120, web: 287 },
  // { date: "2024-08-19", desktop: 242, mobile: 260, web: 502 },
  // { date: "2024-08-20", desktop: 373, mobile: 290, web: 663 },
  // { date: "2024-08-21", desktop: 301, mobile: 340, web: 641 },
  // { date: "2024-08-22", desktop: 245, mobile: 180, web: 425 },
  // { date: "2024-08-23", desktop: 409, mobile: 320, web: 729 },
  // { date: "2024-08-24", desktop: 59, mobile: 110, web: 169 },
  // { date: "2024-08-25", desktop: 261, mobile: 190, web: 451 },
  // { date: "2024-08-26", desktop: 327, mobile: 350, web: 677 },
  // { date: "2024-08-27", desktop: 292, mobile: 210, web: 502 },
  // { date: "2024-08-28", desktop: 342, mobile: 380, web: 722 },
  // { date: "2024-08-29", desktop: 137, mobile: 220, web: 357 },
  // { date: "2024-08-30", desktop: 120, mobile: 170, web: 290 },
  // { date: "2024-08-31", desktop: 138, mobile: 190, web: 328 },
  // { date: "2024-09-01", desktop: 446, mobile: 360, web: 806 },
  // { date: "2024-09-02", desktop: 364, mobile: 410, web: 774 },
  // { date: "2024-09-03", desktop: 243, mobile: 180, web: 423 },
  // { date: "2024-09-04", desktop: 89, mobile: 150, web: 239 },
  // { date: "2024-09-05", desktop: 137, mobile: 200, web: 337 },
  // { date: "2024-09-06", desktop: 224, mobile: 170, web: 394 },
  // { date: "2024-09-07", desktop: 138, mobile: 230, web: 368 },
  // { date: "2024-09-08", desktop: 387, mobile: 290, web: 677 },
  // { date: "2024-09-09", desktop: 215, mobile: 250, web: 465 },
  // { date: "2024-09-10", desktop: 75, mobile: 130, web: 205 },
  // { date: "2024-09-11", desktop: 383, mobile: 420, web: 803 },
  // { date: "2024-09-12", desktop: 122, mobile: 180, web: 302 },
  // { date: "2024-09-13", desktop: 315, mobile: 240, web: 555 },
  // { date: "2024-09-14", desktop: 454, mobile: 380, web: 834 },
  // { date: "2024-09-15", desktop: 165, mobile: 220, web: 385 },
  // { date: "2024-09-16", desktop: 293, mobile: 310, web: 603 },
  // { date: "2024-09-17", desktop: 247, mobile: 190, web: 437 },
  // { date: "2024-09-18", desktop: 385, mobile: 420, web: 805 },
  // { date: "2024-09-19", desktop: 481, mobile: 390, web: 871 },
  // { date: "2024-09-20", desktop: 498, mobile: 520, web: 1018 },
  // { date: "2024-09-21", desktop: 388, mobile: 300, web: 688 },
  // { date: "2024-09-22", desktop: 149, mobile: 210, web: 359 },
  // { date: "2024-09-23", desktop: 227, mobile: 180, web: 407 },
  // { date: "2024-09-24", desktop: 293, mobile: 330, web: 623 },
  // { date: "2024-09-25", desktop: 335, mobile: 270, web: 605 },
  // { date: "2024-09-26", desktop: 197, mobile: 240, web: 437 },
  // { date: "2024-09-27", desktop: 197, mobile: 160, web: 357 },
  // { date: "2024-09-28", desktop: 448, mobile: 490, web: 938 },
  // { date: "2024-09-29", desktop: 473, mobile: 380, web: 853 },
  // { date: "2024-09-30", desktop: 338, mobile: 400, web: 738 },
  // { date: "2024-10-01", desktop: 499, mobile: 420, web: 919 },
  // { date: "2024-10-02", desktop: 315, mobile: 350, web: 665 },
  // { date: "2024-10-03", desktop: 235, mobile: 180, web: 415 },
  // { date: "2024-10-04", desktop: 177, mobile: 230, web: 407 },
  // { date: "2024-10-05", desktop: 82, mobile: 140, web: 222 },
  // { date: "2024-10-06", desktop: 81, mobile: 120, web: 201 },
  // { date: "2024-10-07", desktop: 252, mobile: 290, web: 542 },
  // { date: "2024-10-08", desktop: 294, mobile: 220, web: 514 },
  // { date: "2024-10-09", desktop: 201, mobile: 250, web: 451 },
  // { date: "2024-10-10", desktop: 213, mobile: 170, web: 383 },
  // { date: "2024-10-11", desktop: 420, mobile: 460, web: 880 },
  // { date: "2024-10-12", desktop: 233, mobile: 190, web: 423 },
  // { date: "2024-10-13", desktop: 78, mobile: 130, web: 208 },
  // { date: "2024-10-14", desktop: 340, mobile: 280, web: 620 },
  // { date: "2024-10-15", desktop: 178, mobile: 230, web: 408 },
  // { date: "2024-10-16", desktop: 178, mobile: 200, web: 378 },
  // { date: "2024-10-17", desktop: 470, mobile: 410, web: 880 },
  // { date: "2024-10-18", desktop: 103, mobile: 160, web: 263 },
  // { date: "2024-10-19", desktop: 439, mobile: 380, web: 819 },
  // { date: "2024-10-20", desktop: 88, mobile: 140, web: 228 },
  // { date: "2024-10-21", desktop: 294, mobile: 250, web: 544 },
  // { date: "2024-10-22", desktop: 323, mobile: 370, web: 693 },
  // { date: "2024-10-23", desktop: 385, mobile: 320, web: 705 },
  // { date: "2024-10-24", desktop: 438, mobile: 480, web: 918 },
  // { date: "2024-10-25", desktop: 155, mobile: 200, web: 355 },
  // { date: "2024-10-26", desktop: 92, mobile: 150, web: 242 },
  // { date: "2024-10-27", desktop: 492, mobile: 420, web: 912 },
  // { date: "2024-10-28", desktop: 341, mobile: 310, web: 320 },
  // { date: "2024-10-29", desktop: 259, mobile: 280, web: 270 },
  // { date: "2024-10-30", desktop: 340, mobile: 280, web: 620 },
  // { date: "2024-10-31", desktop: 178, mobile: 230, web: 408 },
  // { date: "2024-11-01", desktop: 178, mobile: 200, web: 378 },
  // { date: "2024-11-02", desktop: 470, mobile: 410, web: 880 },
  // { date: "2024-11-03", desktop: 103, mobile: 160, web: 263 },
  { date: "2024-11-04", desktop: 439, mobile: 380, web: 819 },
  { date: "2024-11-05", desktop: 88, mobile: 140, web: 228 },
  { date: "2024-11-06", desktop: 294, mobile: 250, web: 544 },
  { date: "2024-11-07", desktop: 323, mobile: 370, web: 693 },
  { date: "2024-11-08", desktop: 385, mobile: 320, web: 705 },
  { date: "2024-11-09", desktop: 438, mobile: 480, web: 918 },
  { date: "2024-11-10", desktop: 155, mobile: 200, web: 355 },
  { date: "2024-11-11", desktop: 92, mobile: 150, web: 242 },
  { date: "2024-11-12", desktop: 492, mobile: 420, web: 912 },
  { date: "2024-11-13", desktop: 341, mobile: 310, web: 320 },
  { date: "2024-11-14", desktop: 259, mobile: 280, web: 270 },
  { date: "2024-11-15", desktop: 123, mobile: 160, web: 140 },
  { date: "2024-11-16", desktop: 489, mobile: 420, web: 450 },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
  web: {
    label: "Web",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export default function CustomChart({ pickerType, date }: DataSelectProps) {
  const filteredData = () => {
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
    const data = chartData.filter((item) => {
      const date = new Date(item.date);
      return date >= startOfRange.toDate() && date <= endOfRange.toDate();
    });
    return data;
  };

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Biểu đồ</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData()}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillWeb" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-web)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-web)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("vi-VN", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("vi-VN", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="mobile"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
              stackId="a"
            />
            <Area
              dataKey="web"
              type="natural"
              fill="url(#fillWeb)"
              stroke="var(--color-web)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
