import { api } from "@/lib/api-client";
import {
  ResDisableCategoryById,
  ResEnableCategoryById,
} from "@/types/category";
import { ResFetchAllCustomers } from "@/types/customer";

class CustomerService {
  async getAllCusomter(): Promise<ResFetchAllCustomers> {
    return api.get(`/users/get-all`);
  }
  async enableCustomerById(id: string): Promise<ResEnableCategoryById> {
    return api.post(`/users/${id}/enable`);
  }

  async disablecustomerById(id: string): Promise<ResDisableCategoryById> {
    return api.post(`/users/${id}/disable`);
  }
}

export default new CustomerService();
