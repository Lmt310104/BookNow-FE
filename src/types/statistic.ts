import { ResBookDetail } from "./book";
import { Category } from "./category";
import { Customer } from "./customer";

export interface StatisticQuery {
    fromDate: string;
    toDate: string;
    status: string;
    top?:number;
}

export interface ResGetProductStatisticByRevenue { data: { data: Array<{ book: ResBookDetail, totalRevenue: number }> } }
export interface ResGetProductStatisticByOrder { data: { data: Array<{ book: ResBookDetail, totalOrders: number }> } }
export interface ResGetProductStatisticBySoldQuantity { data: { data: Array<{ book: ResBookDetail, totalQuantity: number }> } }
export interface ResGetRevenueStatisticByCategory { data: { data: Array<{ category: Category, totalRevenues: number }> } }
export interface ResGetRevenueStatisticByCustomer { data: { data: Array<{ user: Customer, totalRevenue: number, totalOrders: number}> } }


