import { api } from "@/lib/api-client";
import { Page } from "@/types/api";
import {
  ResDisableCategoryById,
  ResEnableCategoryById,
} from "@/types/category";
import { ResFetchAllCustomers } from "@/types/customer";

class CustomerService {
  async getAllCusomter({ page, take }: Page): Promise<ResFetchAllCustomers> {
    return api.get(`/users/get-all?page=${page}&take=${take}`);
  }
  async enableCustomerById(id: string): Promise<ResEnableCategoryById> {
    return api.post(`/users/${id}/enable`);
  }

  async disablecustomerById(id: string): Promise<ResDisableCategoryById> {
    return api.post(`/users/${id}/disable`);
  }

  async getAccountById(id: string) {
    return api.get(`/users/${id}`);
  }

  // async updateAccountById(){
  //   return api.post(`/users/${id}`)
  // }
}

export default new CustomerService();
