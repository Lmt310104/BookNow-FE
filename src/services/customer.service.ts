import { api } from "@/lib/api-client";
import { Page } from "@/types/api";
import { ResFetchAllCustomers } from "@/types/customer";
import { ResUser } from "@/types/user";

class CustomerService {
  async getAllCusomter({ page, take }: Page): Promise<ResFetchAllCustomers> {
    return api.get(`/users/get-all?page=${page}&take=${take}`);
  }
  async enableCustomerById(id: string){
    return api.post(`/users/${id}/enable`);
  }

  async disablecustomerById(id: string){
    return api.post(`/users/${id}/disable`);
  }

  async getAccountById(id: string) {
    return api.get(`/users/${id}`);
  }

  async updateAccount(data: ResUser, imageFile: File | null) {
    const formData = new FormData();
    if (data.birthday) formData.append("birthday", data.birthday?.toString());
    formData.append("email", data.email);
    formData.append("fullName", data.full_name);
    formData.append("gender", data.gender);
    if (data.phone) formData.append("phone", data.phone?.toString());
    if (imageFile) {
      formData.append("avatar_url", imageFile);
    }
    return api.patch(`/users/update`, formData);
  }
}

export default new CustomerService();
