import { api } from "@/lib/api-client";
import { Page } from "@/types/api";
import { ResCreateCategory, ResDisableCategoryById, ResEnableCategoryById, ResFetchAllCategories } from "@/types/category";

class CategryService {
  async createCategory(data: { name: string }):Promise<ResCreateCategory> {
    return api.post("/categories/create", data);
  }

  async enableCategoryById(id: string):Promise<ResEnableCategoryById>{
    return api.post(`/categories/enable/${id}`);
  }

  async disableCategoryById(id: string):Promise<ResDisableCategoryById>{
    return api.post(`/categories/disable/${id}`);
  }

  async getAllCategories({page, take}: Page, disable: boolean| null): Promise<ResFetchAllCategories> {
    if(disable===true || disable===false){
      return api.get(`/categories/get-all?page=${page}&take=${take}&disable=${disable}`);
    } else {
      return api.get(`/categories/get-all?page=${page}&take=${take}`);
    }
  }
  async upDateCategory(id: string) {
    return api.post(`/categories/update/${id}`);
  }

  async getCategoryById(id: string) {
    return api.get(`/categories/get-one/${id}`);
  }

  async searchCategory(state:boolean| null, query: string){
    if(state===true || state===false){
      return api.get(`/categories/search?query=${query}&state=${state}`);
    } else {
      return api.get(`/categories/search?query=${query}`);
    }
  }
}

export default new CategryService();
