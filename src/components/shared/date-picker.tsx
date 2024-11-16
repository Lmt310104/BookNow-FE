import React, { useState, useEffect } from "react";
import { ConfigProvider, DatePicker, Menu, Popover } from "antd";
import type { MenuProps } from "antd";
import type { DatePickerProps } from "antd";
import { Button } from "../ui/button";
import { Calendar } from "lucide-react";
import viVN from "antd/es/locale/vi_VN";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/vi";
import isoWeek from "dayjs/plugin/isoWeek";
dayjs.extend(isoWeek);
dayjs.locale("vi");

export interface DataSelectProps {
  date: Dayjs;
  pickerType: "date" | "week" | "month" | "year";
}

interface CustomDatePickerProps {
  buttonText?: string;
  defaultPickerType?: "date" | "week" | "month" | "year";
  onDateSelect?: ({ date, pickerType }: DataSelectProps) => void;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  buttonText = "Chọn ngày",
  defaultPickerType = "date",
  onDateSelect,
}) => {
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [pickerType, setPickerType] = useState<
    "date" | "week" | "month" | "year"
  >(defaultPickerType);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedDayjs, setSelectedDayjs] = useState<Dayjs>(dayjs());

  useEffect(() => {
    const currentDate = dayjs();
    if (pickerType === "week") {
      const startOfWeek: Dayjs = currentDate.startOf("isoWeek");
      const endOfWeek: Dayjs = startOfWeek.add(6, "day");
      setSelectedDate(
        `Theo tuần: ${startOfWeek.format("DD-MM-YYYY")} - ${endOfWeek.format(
          "DD-MM-YYYY"
        )}`
      );
      setSelectedDayjs(currentDate);
    } else if (pickerType === "month") {
      setSelectedDate(`Theo tháng: ${currentDate.format("MM-YYYY")}`);
      setSelectedDayjs(currentDate);
    } else if (pickerType === "year") {
      setSelectedDate(`Theo năm: ${currentDate.format("YYYY")}`);
      setSelectedDayjs(currentDate);
    } else if (pickerType === "date") {
      setSelectedDate(`Theo ngày: ${currentDate.format("DD-MM-YYYY")}`);
      setSelectedDayjs(currentDate);
    }
  }, [pickerType]);

  const handleDateChange: DatePickerProps["onChange"] = (date) => {
    if (date) {
      let formattedDate: string = "";
      if (pickerType === "week") {
        const startOfWeek: Dayjs = date.startOf("isoWeek");
        const endOfWeek: Dayjs = startOfWeek.add(6, "day");
        formattedDate = `Theo tuần: ${startOfWeek.format(
          "DD-MM-YYYY"
        )} - ${endOfWeek.format("DD-MM-YYYY")}`;
      } else if (pickerType === "month") {
        formattedDate = `Theo tháng: ${date.format("MM-YYYY")}`;
      } else if (pickerType === "year") {
        formattedDate = `Theo năm: ${date.format("YYYY")}`;
      } else {
        formattedDate = `Theo ngày: ${date.format("DD-MM-YYYY")}`;
      }

      setSelectedDate(formattedDate);
      setSelectedDayjs(date);
      onDateSelect?.({ date, pickerType });
    }
    setPopoverVisible(false);
  };

  // Custom date selection handler (excluding today)
  const handleCustomDateSelect = (daysAgo: number) => {
    const currentDate = dayjs();
    const startDate = currentDate.subtract(daysAgo, "day").startOf("day"); // Subtract days but do not include today
    const formattedDate = `Trong ${daysAgo} ngày qua: ${startDate.format(
      "DD-MM-YYYY"
    )} - ${currentDate.subtract(1, "day").format("DD-MM-YYYY")}`; // Exclude today
    setSelectedDate(formattedDate);
    setSelectedDayjs(currentDate);
    onDateSelect?.({ date: currentDate, pickerType });
    setPopoverVisible(false);
  };

  const menuItems: MenuProps["items"] = [
    // { key: "date", label: "Theo ngày", onClick: () => setPickerType("date") },
    { key: "week", label: "Theo tuần", onClick: () => setPickerType("week") },
    {
      key: "month",
      label: "Theo tháng",
      onClick: () => setPickerType("month"),
    },
    { key: "year", label: "Theo năm", onClick: () => setPickerType("year") },
    // {
    //   key: "7days",
    //   label: "Trong 7 ngày qua",
    //   onClick: () => handleCustomDateSelect(7),
    // },
    // {
    //   key: "30days",
    //   label: "Trong 30 ngày qua",
    //   onClick: () => handleCustomDateSelect(30),
    // },
  ];

  const content = (
    <div className="flex">
      <Menu
        mode="vertical"
        className="w-fit"
        items={menuItems}
        defaultSelectedKeys={[defaultPickerType]}
      />
      <div className="flex-1 overflow-hidden">
        <DatePicker
          open
          picker={pickerType}
          value={selectedDayjs}
          onChange={handleDateChange}
          disabledDate={(currentDate) =>
            currentDate && currentDate > dayjs().endOf("day")
          }
          className="hidden h-0"
          getPopupContainer={(triggerNode) => triggerNode.parentElement!}
          popupClassName="shadow-none static"
        />
      </div>
    </div>
  );

  return (
    <ConfigProvider locale={viVN}>
      <Popover
        content={content}
        trigger="click"
        open={popoverVisible}
        onOpenChange={setPopoverVisible}
        placement="bottom"
        overlayStyle={{ width: "fit-content" }}
      >
        <Button variant={"outline"} className="min-w-[400px]">
          <div className=" text-left font-normal w-full">
            <span className="text-muted-foreground">Khung thời gian</span>{" "}
            {selectedDate || buttonText}
          </div>
          <Calendar className="w-4 h-4" />
        </Button>
      </Popover>
    </ConfigProvider>
  );
};

export default CustomDatePicker;
