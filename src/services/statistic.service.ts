import { OrderStatus } from "@/common/enums";
import { api } from "@/lib/api-client";
import { ResGetProductStatisticByOrder, ResGetProductStatisticByRevenue, ResGetProductStatisticBySoldQuantity, ResGetRevenueStatisticByCategory, ResGetRevenueStatisticByCustomer, StatisticQuery } from "@/types/statistic";


class StatisticService {
    async getOverviewStatistic(query: StatisticQuery) {
        let url = 'statistic/get-statistic?fromDate=' + query.fromDate + '&toDate=' + query.toDate;
        if (query.status in OrderStatus) url += '&status=' + query.status;
        return api.get(url);
    }
    async getProductStatisticByRevenue(query: StatisticQuery): Promise<ResGetProductStatisticByRevenue> {
        let url = 'statistic/get-product-statistic?fromDate=' + query.fromDate + '&toDate=' + query.toDate;
        if (query.status in OrderStatus) url += '&status=' + query.status;
        return api.get(url);
    }
    async getProductStatisticBySoldQuantity(query: StatisticQuery): Promise<ResGetProductStatisticBySoldQuantity> {
        let url = 'statistic/get-product-statistic-sold-quantity?fromDate=' + query.fromDate + '&toDate=' + query.toDate;
        if (query.status in OrderStatus) url += '&status=' + query.status;
        return api.get(url);
    }
    async getProductStatisticByOrder(query: StatisticQuery): Promise<ResGetProductStatisticByOrder> {
        let url = 'statistic/get-product-statistic-order?fromDate=' + query.fromDate + '&toDate=' + query.toDate;
        if (query.status in OrderStatus) url += '&status=' + query.status;
        return api.get(url);
    }
    async getRevenueStatisticByCategory(query: StatisticQuery): Promise<ResGetRevenueStatisticByCategory> {
        let url = 'statistic/get-revenue-statistic-category?fromDate=' + query.fromDate + '&toDate=' + query.toDate;
        if (query.status in OrderStatus) url += '&status=' + query.status;
        return api.get(url);
    }
    async getRevenueStatisticByCustomer(query: StatisticQuery): Promise<ResGetRevenueStatisticByCustomer> {
        let url = 'statistic/get-revenue-statistic-customer?fromDate=' + query.fromDate + '&toDate=' + query.toDate;
        if (query.status in OrderStatus) url += '&status=' + query.status;
        return api.get(url);
    }


}

export default new StatisticService();

