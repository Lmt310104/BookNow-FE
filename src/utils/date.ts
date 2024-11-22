import { Dayjs } from "dayjs";

export const getDayRange = (date: Dayjs, pickerType: string) => {
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