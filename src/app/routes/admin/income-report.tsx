import DashBoardLayout from "@/components/layouts/dashboard-layout";
import { Button } from "@/components/ui/button";
import { ArrowDownToLine } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomDatePicker, {
  DataSelectProps,
} from "@/components/shared/date-picker";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/vi";
import isoWeek from "dayjs/plugin/isoWeek";
import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "@/config";
import CategorySection, {
  CategorySectionRef,
} from "@/components/report/revenue/categories-section";
import UserSection, {
  UserSectionRef,
} from "@/components/report/revenue/user-section";
import { OrderStatus } from "@/common/enums";
import ExcelJS from "exceljs";
import { getDayRange } from "@/utils/date";

dayjs.extend(isoWeek);
dayjs.locale("vi");

export default function IncomeReportRoute() {
  const [pickerType, setPickerType] = useState<
    "date" | "week" | "month" | "year"
  >("week");
  const [selectedDayjs, setSelectedDayjs] = useState<Dayjs>(dayjs());
  const location = useLocation();
  const navigate = useNavigate();
  const categorySectionRef = useRef<CategorySectionRef | null>(null);
  const userSectionRef = useRef<UserSectionRef | null>(null);

  const handleDateSelect = (data: DataSelectProps) => {
    setPickerType(data.pickerType);
    setSelectedDayjs(data.date);
  };

  const exportExcelFile = () => {
    const workbook = new ExcelJS.Workbook();
    const sheet1 = workbook.addWorksheet("Danh mục");
    const sheet2 = workbook.addWorksheet("Nhóm người mua");

    sheet1.getRow(1).font = {
      bold: true,
    };

    sheet1.columns = [
      {
        header: "Mã danh mục",
        key: "categoryId",
        width: 50,
      },
      {
        header: "Danh mục",
        key: "categoryName",
        width: 20,
      },
      {
        header: "Doanh số",
        key: "totalRevenues",
        width: 15,
      },
      {
        header: "Doanh số %",
        key: "percent",
        width: 20,
      },
    ];

    sheet2.getRow(1).font = {
      bold: true,
    };

    sheet2.columns = [
      {
        header: "Nhóm",
        key: "group",
        width: 50,
      },
      {
        header: "Người mua",
        key: "number",
        width: 20,
      },
      {
        header: "% Người mua",
        key: "percentageNumber",
        width: 20,
      },
      {
        header: "Doanh số",
        key: "revenue",
        width: 15,
      },
      {
        header: "Doanh số %",
        key: "percentageRevenue",
        width: 20,
      },
    ];

    const { startOfRange, endOfRange } = getDayRange(selectedDayjs, pickerType);

    const categoryData = categorySectionRef.current?.getData() || [];
    const userData = userSectionRef.current?.getData() || [];
    const promise = Promise.all([
      ...categoryData.map(async (item) => {
        sheet1.addRow({
          categoryId: item.categoryId,
          categoryName: item.categoryName,
          totalRevenues: item.totalRevenues,
          percent: item.percent,
        });
      }),
      ...userData.map(async (item) => {
        sheet2.addRow({
          group:
            item.group === "newCustomers" ? "Người mua mới" : "Người mua cũ",
          number: item.number,
          percentageNumber: item.percentageNumber,
          revenue: item.revenue,
          percentageRevenue: item.percentageRevenue,
        });
      }),
    ]);

    promise.then(() => {
      workbook.xlsx.writeBuffer().then(function (data) {
        const blob = new Blob([data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = `[export_report]saleoverview${startOfRange.format(
          "DDMMYYYY"
        )}-${endOfRange.format("DDMMYYYY")}.xlsx`;
        anchor.click();
        window.URL.revokeObjectURL(url);
      });
    });
  };
  return (
    <DashBoardLayout>
      <main className="flex flex-1 flex-col gap-6 p-6  bg-muted/40 overflow-y-auto w-full">
        <Tabs value={location.pathname}>
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger
                value={routes.ADMIN.REPORT}
                onClick={() => navigate(routes.ADMIN.REPORT)}
              >
                Tổng quan
              </TabsTrigger>
              <TabsTrigger
                value={routes.ADMIN.BOOK_REPORT}
                onClick={() => navigate(routes.ADMIN.BOOK_REPORT)}
              >
                Sản phẩm
              </TabsTrigger>
              <TabsTrigger
                value={routes.ADMIN.INCOME_REPORT}
                onClick={() => navigate(routes.ADMIN.INCOME_REPORT)}
              >
                Doanh số
              </TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
        <div className="flex flex-row gap-4">
          <CustomDatePicker
            buttonText="Chọn thời gian"
            defaultPickerType="week"
            onDateSelect={handleDateSelect}
          />
          <Button
            variant={"outline"}
            className="ml-auto"
            onClick={exportExcelFile}
          >
            <ArrowDownToLine className="w-4 h-4" />
            Tải dữ liệu
          </Button>
        </div>
        <CategorySection
          pickerType={pickerType}
          date={selectedDayjs}
          status={OrderStatus.SUCCESS}
          ref={categorySectionRef}
        />
        <UserSection
          ref={userSectionRef}
          pickerType={pickerType}
          date={selectedDayjs}
          status={OrderStatus.SUCCESS}
        />
      </main>
    </DashBoardLayout>
  );
}
