import { ResBookDetail } from "./book";
import { Category } from "./category";

export interface StatisticQuery {
    fromDate: string;
    toDate: string;
    status?: string;
    top?: number;
}

export interface ResGetProductStatisticByRevenue { data: { data: Array<{ book: ResBookDetail, totalRevenue: number }> } }
export interface ResGetProductStatisticByOrder { data: { data: Array<{ book: ResBookDetail, totalOrders: number }> } }
export interface ResGetProductStatisticBySoldQuantity { data: { data: Array<{ book: ResBookDetail, totalQuantity: number }> } }
export interface ResGetRevenueStatisticByCategory { data: { data: Array<{ category: Category, totalRevenues: number }> } }

export interface ResGetRevenueStatisticByCustomerData {
    newCustomers: {
        newCustomerRevenue
        :
        number;
        percentage
        :
        number;
        percentageRevenue
        :
        number;
        totalNewCustomers
        :
        number;
    },
    oldCustomers: {
        oldCustomerRevenue
        :
        number;
        percentage
        :
        number;
        percentageRevenue
        :
        number;
        totalOldCustomers
        :
        number
    }
    totalCustomers: number;
}
export interface ResGetRevenueStatisticByCustomer { data: { data: ResGetRevenueStatisticByCustomerData } }

export interface ResGetRevenueStatisticByDateData {
    date: string,
    orderCancelledAndRejected: number,
    orderSuccess: number,
    totalRevenue: number
}
export interface ResGetRevenueStatisticByDate { data: { data: Array<ResGetRevenueStatisticByDateData> } }

