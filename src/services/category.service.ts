import { api } from "@/lib/api-client";
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

  async getAllCategories(): Promise<ResFetchAllCategories> {
    return api.get("/categories/get-all");
  }
  async upDateCategory() {
    return api.post("/categories/update");
  }
}

export default new CategryService();
