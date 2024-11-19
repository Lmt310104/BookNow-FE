import {
    ChartConfig,
} from "@/components/ui/chart";

export const overallChartData = [
    { date: "2024-08-16", doanhso: 222, donhang: 150, dondahuy: 372, doanhsomoidonhang: 1.48, luotdangky: 100 },
    { date: "2024-08-17", doanhso: 97, donhang: 180, dondahuy: 277, doanhsomoidonhang: 0.54, luotdangky: 80 },
    { date: "2024-08-18", doanhso: 167, donhang: 120, dondahuy: 287, doanhsomoidonhang: 1.39, luotdangky: 60 },
    { date: "2024-08-19", doanhso: 242, donhang: 260, dondahuy: 502, doanhsomoidonhang: 0.93, luotdangky: 70 },
    { date: "2024-08-20", doanhso: 373, donhang: 290, dondahuy: 663, doanhsomoidonhang: 1.29, luotdangky: 90 },
    { date: "2024-08-21", doanhso: 301, donhang: 340, dondahuy: 641, doanhsomoidonhang: 0.89, luotdangky: 110 },
    { date: "2024-08-22", doanhso: 245, donhang: 180, dondahuy: 425, doanhsomoidonhang: 1.36, luotdangky: 80 },
    { date: "2024-08-23", doanhso: 409, donhang: 320, dondahuy: 729, doanhsomoidonhang: 1.28, luotdangky: 100 },
    { date: "2024-08-24", doanhso: 59, donhang: 110, dondahuy: 169, doanhsomoidonhang: 0.54, luotdangky: 60 },
    { date: "2024-08-25", doanhso: 261, donhang: 190, dondahuy: 451, doanhsomoidonhang: 1.38, luotdangky: 70 },
    { date: "2024-08-26", doanhso: 327, donhang: 350, dondahuy: 677, doanhsomoidonhang: 0.93, luotdangky: 90 },
    { date: "2024-08-27", doanhso: 292, donhang: 210, dondahuy: 502, doanhsomoidonhang: 1.39, luotdangky: 80 },
    { date: "2024-08-28", doanhso: 342, donhang: 380, dondahuy: 722, doanhsomoidonhang: 0.9, luotdangky: 110 },
    { date: "2024-08-29", doanhso: 137, donhang: 220, dondahuy: 357, doanhsomoidonhang: 0.62, luotdangky: 60 },
    { date: "2024-08-30", doanhso: 120, donhang: 170, dondahuy: 290, doanhsomoidonhang: 0.71, luotdangky: 70 },
    { date: "2024-08-31", doanhso: 138, donhang: 190, dondahuy: 328, doanhsomoidonhang: 0.73, luotdangky: 80 },
    { date: "2024-09-01", doanhso: 446, donhang: 360, dondahuy: 806, doanhsomoidonhang: 1.24, luotdangky: 100 },
    { date: "2024-09-02", doanhso: 364, donhang: 410, dondahuy: 774, doanhsomoidonhang: 0.89, luotdangky: 110 },
    { date: "2024-09-03", doanhso: 243, donhang: 180, dondahuy: 423, doanhsomoidonhang: 1.36, luotdangky: 80 },
    { date: "2024-09-04", doanhso: 89, donhang: 150, dondahuy: 239, doanhsomoidonhang: 0.59, luotdangky: 60 },
    { date: "2024-09-05", doanhso: 137, donhang: 200, dondahuy: 337, doanhsomoidonhang: 0.69, luotdangky: 70 },
    { date: "2024-09-06", doanhso: 224, donhang: 170, dondahuy: 394, doanhsomoidonhang: 1.32, luotdangky: 80 },
    { date: "2024-09-07", doanhso: 138, donhang: 230, dondahuy: 368, doanhsomoidonhang: 0.6, luotdangky: 90 },
    { date: "2024-09-08", doanhso: 387, donhang: 290, dondahuy: 677, doanhsomoidonhang: 1.33, luotdangky: 100 },
    { date: "2024-09-09", doanhso: 215, donhang: 250, dondahuy: 465, doanhsomoidonhang: 0.86, luotdangky: 110 },
    { date: "2024-09-10", doanhso: 75, donhang: 130, dondahuy: 205, doanhsomoidonhang: 0.58, luotdangky: 60 },
    { date: "2024-09-11", doanhso: 383, donhang: 420, dondahuy: 803, doanhsomoidonhang: 0.91, luotdangky: 100 },
    { date: "2024-09-12", doanhso: 122, donhang: 180, dondahuy: 302, doanhsomoidonhang: 0.68, luotdangky: 70 },
    { date: "2024-09-13", doanhso: 315, donhang: 240, dondahuy: 555, doanhsomoidonhang: 1.32, luotdangky: 90 },
    { date: "2024-09-14", doanhso: 454, donhang: 380, dondahuy: 834, doanhsomoidonhang: 1.2, luotdangky: 110 },
    { date: "2024-09-15", doanhso: 165, donhang: 220, dondahuy: 385, doanhsomoidonhang: 0.75, luotdangky: 80 },
    { date: "2024-09-16", doanhso: 293, donhang: 310, dondahuy: 603, doanhsomoidonhang: 0.95, luotdangky: 100 },
    { date: "2024-09-17", doanhso: 247, donhang: 190, dondahuy: 437, doanhsomoidonhang: 1.3, luotdangky: 70 },
    { date: "2024-09-18", doanhso: 385, donhang: 420, dondahuy: 805, doanhsomoidonhang: 0.92, luotdangky: 110 },
    { date: "2024-09-19", doanhso: 481, donhang: 390, dondahuy: 871, doanhsomoidonhang: 1.23, luotdangky: 100 },
    { date: "2024-09-20", doanhso: 498, donhang: 520, dondahuy: 1018, doanhsomoidonhang: 0.96, luotdangky: 110 },
    { date: "2024-09-21", doanhso: 388, donhang: 300, dondahuy: 688, doanhsomoidonhang: 1.29, luotdangky: 90 },
    { date: "2024-09-22", doanhso: 149, donhang: 210, dondahuy: 359, doanhsomoidonhang: 0.71, luotdangky: 70 },
    { date: "2024-09-23", doanhso: 227, donhang: 180, dondahuy: 407, doanhsomoidonhang: 1.26, luotdangky: 80 },
    { date: "2024-09-24", doanhso: 293, donhang: 330, dondahuy: 623, doanhsomoidonhang: 0.89, luotdangky: 100 },
    { date: "2024-09-25", doanhso: 335, donhang: 270, dondahuy: 605, doanhsomoidonhang: 1.24, luotdangky: 110 },
    { date: "2024-09-26", doanhso: 197, donhang: 240, dondahuy: 437, doanhsomoidonhang: 0.82, luotdangky: 80 },
    { date: "2024-09-27", doanhso: 197, donhang: 160, dondahuy: 357, doanhsomoidonhang: 1.23, luotdangky: 70 },
    { date: "2024-09-28", doanhso: 448, donhang: 490, dondahuy: 938, doanhsomoidonhang: 0.91, luotdangky: 110 },
    { date: "2024-09-29", doanhso: 473, donhang: 380, dondahuy: 853, doanhsomoidonhang: 1.25, luotdangky: 100 },
    { date: "2024-09-30", doanhso: 338, donhang: 400, dondahuy: 738, doanhsomoidonhang: 0.85, luotdangky: 110 },
    { date: "2024-10-01", doanhso: 499, donhang: 420, dondahuy: 919, doanhsomoidonhang: 1.19, luotdangky: 100 },
    { date: "2024-10-02", doanhso: 315, donhang: 350, dondahuy: 665, doanhsomoidonhang: 0.9, luotdangky: 110 },
    { date: "2024-10-03", doanhso: 235, donhang: 180, dondahuy: 415, doanhsomoidonhang: 1.3, luotdangky: 70 },
    { date: "2024-10-04", doanhso: 177, donhang: 230, dondahuy: 407, doanhsomoidonhang: 0.77, luotdangky: 80 },
    { date: "2024-10-05", doanhso: 82, donhang: 140, dondahuy: 222, doanhsomoidonhang: 0.59, luotdangky: 60 },
    { date: "2024-10-06", doanhso: 81, donhang: 120, dondahuy: 201, doanhsomoidonhang: 0.68, luotdangky: 70 },
    { date: "2024-10-07", doanhso: 252, donhang: 290, dondahuy: 542, doanhsomoidonhang: 0.87, luotdangky: 90 },
    { date: "2024-10-08", doanhso: 294, donhang: 220, dondahuy: 514, doanhsomoidonhang: 1.33, luotdangky: 80 },
    { date: "2024-10-09", doanhso: 201, donhang: 250, dondahuy: 451, doanhsomoidonhang: 0.8, luotdangky: 90 },
    { date: "2024-10-10", doanhso: 213, donhang: 170, dondahuy: 383, doanhsomoidonhang: 1.25, luotdangky: 70 },
    { date: "2024-10-11", doanhso: 420, donhang: 460, dondahuy: 880, doanhsomoidonhang: 0.91, luotdangky: 110 },
    { date: "2024-10-12", doanhso: 233, donhang: 190, dondahuy: 423, doanhsomoidonhang: 1.23, luotdangky: 80 },
    { date: "2024-10-13", doanhso: 78, donhang: 130, dondahuy: 208, doanhsomoidonhang: 0.6, luotdangky: 60 },
    { date: "2024-10-14", doanhso: 340, donhang: 280, dondahuy: 620, doanhsomoidonhang: 1.21, luotdangky: 90 },
    { date: "2024-10-15", doanhso: 178, donhang: 230, dondahuy: 408, doanhsomoidonhang: 0.77, luotdangky: 80 },
   
    { date: "2024-10-16", doanhso: 178, donhang: 200, dondahuy: 378, doanhsomoidonhang: 0.89, luotdangky: 70 },
    { date: "2024-10-17", doanhso: 470, donhang: 410, dondahuy: 880, doanhsomoidonhang: 1.15, luotdangky: 110 },
    { date: "2024-10-18", doanhso: 103, donhang: 160, dondahuy: 263, doanhsomoidonhang: 0.64, luotdangky: 60 },
    { date: "2024-10-19", doanhso: 439, donhang: 380, dondahuy: 819, doanhsomoidonhang: 1.16, luotdangky: 100 },
    { date: "2024-10-20", doanhso: 88, donhang: 140, dondahuy: 228, doanhsomoidonhang: 0.63, luotdangky: 50 },
    { date: "2024-10-21", doanhso: 294, donhang: 250, dondahuy: 544, doanhsomoidonhang: 1.18, luotdangky: 90 },
    { date: "2024-10-22", doanhso: 323, donhang: 370, dondahuy: 693, doanhsomoidonhang: 0.87, luotdangky: 110 },
    { date: "2024-10-23", doanhso: 385, donhang: 320, dondahuy: 705, doanhsomoidonhang: 1.2, luotdangky: 100 },
    { date: "2024-10-24", doanhso: 438, donhang: 480, dondahuy: 918, doanhsomoidonhang: 0.91, luotdangky: 120 },
    { date: "2024-10-25", doanhso: 155, donhang: 200, dondahuy: 355, doanhsomoidonhang: 0.78, luotdangky: 60 },
    { date: "2024-10-26", doanhso: 92, donhang: 150, dondahuy: 242, doanhsomoidonhang: 0.61, luotdangky: 50 },
    { date: "2024-10-27", doanhso: 492, donhang: 420, dondahuy: 912, doanhsomoidonhang: 1.17, luotdangky: 110 },
    { date: "2024-10-28", doanhso: 341, donhang: 310, dondahuy: 320, doanhsomoidonhang: 1.1, luotdangky: 100 },
    { date: "2024-10-29", doanhso: 259, donhang: 280, dondahuy: 270, doanhsomoidonhang: 0.93, luotdangky: 90 },
    { date: "2024-10-30", doanhso: 178, donhang: 230, dondahuy: 408, doanhsomoidonhang: 0.77, luotdangky: 80 },
    { date: "2024-10-31", doanhso: 178, donhang: 200, dondahuy: 378, doanhsomoidonhang: 0.89, luotdangky: 70 },
    { date: "2024-11-01", doanhso: 470, donhang: 410, dondahuy: 880, doanhsomoidonhang: 1.15, luotdangky: 110 },
    { date: "2024-11-02", doanhso: 103, donhang: 160, dondahuy: 263, doanhsomoidonhang: 0.64, luotdangky: 60 },
    { date: "2024-11-03", doanhso: 439, donhang: 380, dondahuy: 819, doanhsomoidonhang: 1.16, luotdangky: 100 },
    { date: "2024-11-04", doanhso: 88, donhang: 140, dondahuy: 228, doanhsomoidonhang: 0.63, luotdangky: 50 },
    { date: "2024-11-05", doanhso: 294, donhang: 250, dondahuy: 544, doanhsomoidonhang: 1.18, luotdangky: 90 },
    { date: "2024-11-06", doanhso: 323, donhang: 370, dondahuy: 693, doanhsomoidonhang: 0.87, luotdangky: 110 },
    { date: "2024-11-07", doanhso: 385, donhang: 320, dondahuy: 705, doanhsomoidonhang: 1.2, luotdangky: 100 },
    { date: "2024-11-08", doanhso: 438, donhang: 480, dondahuy: 918, doanhsomoidonhang: 0.91, luotdangky: 120 },
    { date: "2024-11-09", doanhso: 155, donhang: 200, dondahuy: 355, doanhsomoidonhang: 0.78, luotdangky: 60 },
    { date: "2024-11-10", doanhso: 92, donhang: 150, dondahuy: 242, doanhsomoidonhang: 0.61, luotdangky: 50 },
    { date: "2024-11-11", doanhso: 492, donhang: 420, dondahuy: 912, doanhsomoidonhang: 1.17, luotdangky: 110 },
    { date: "2024-11-12", doanhso: 341, donhang: 310, dondahuy: 320, doanhsomoidonhang: 1.1, luotdangky: 100 },
    { date: "2024-11-13", doanhso: 259, donhang: 280, dondahuy: 270, doanhsomoidonhang: 0.93, luotdangky: 90 },
    { date: "2024-11-14", doanhso: 178, donhang: 230, dondahuy: 408, doanhsomoidonhang: 0.77, luotdangky: 80 },
    { date: "2024-11-15", doanhso: 123, donhang: 160, dondahuy: 140, doanhsomoidonhang: 0.77, luotdangky: 50 },
    { date: "2024-11-16", doanhso: 489, donhang: 420, dondahuy: 450, doanhsomoidonhang: 1.16, luotdangky: 110 },
];

export const overallChartConfig = {
    doanhso: {
        label: "Doanh Số",
        color: "#ff871d",
    },
    donhang: {
        label: "Đơn Hàng",
        color: "#136d39",
    },
    dondahuy: {
        label: "Đơn Đã Hủy",
        color: "#222357",
    },
    doanhsomoidonhang: {
        label: "Doanh số mỗi đơn hàng",
        color: "#f9cb14",
    },
    luotdangky: {
        label: "Lượt đăng ký",
        color: "#cf1010",
    }
    
} satisfies ChartConfig;
