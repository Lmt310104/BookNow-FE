import { Meta } from "./api";

export interface Category {
  id: string;
  name: string;
  is_disable: boolean;
}

export interface ResFetchAllCategories {
  data: {
    data: Array<Category>;
    meta: Meta;
  };
}

export interface ResEnableCategoryById {
  data: Category;
}

export interface ResDisableCategoryById {
  data: Category;
}

export interface ResCreateCategory {}
