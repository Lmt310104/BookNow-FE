import { api } from "@/lib/api-client";
import { Page } from "@/types/api";
import { ResCreateCategory, ResDisableCategoryById, ResEnableCategoryById, ResFetchAllCategories } from "@/types/category";

class CategryService {
  async createCategory(data: { name: string }):Promise<ResCreateCategory> {
    return api.post("/categories/create", data);
  }

  async enableCategoryById(id: string):Promise<ResEnableCategoryById>{
    return api.post(`/categories/${id}/enable`);
  }

  async disableCategoryById(id: string):Promise<ResDisableCategoryById>{
    return api.post(`/categories/${id}/disable`);
  }

  async getAllCategories({page, take}: Page): Promise<ResFetchAllCategories> {
    return api.get(`/categories/get-all?page=${page}&take=${take}`);
  }
  async upDateCategory(id: string) {
    return api.post(`/categories/update/${id}`);
  }
}

export default new CategryService();
