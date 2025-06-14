import { Category } from "../types/category";
import axiosInstance from "./axiosInstance";

const categoryUrl = "/category";

class CategoryApi {
  async getCategories(): Promise<Category[]> {
    try {
      const res = await axiosInstance.get(categoryUrl);
      return res.data.data;
    } catch (error) {
      console.error("Error fetching categories: ", error);
      throw error;
    }
  }
  async getCategoryById(id: string): Promise<Category> {
    try {
      const res = await axiosInstance.get(`${categoryUrl}/${id}`);
      return res.data.data;
    } catch (error) {
      console.error("Error fetching category by id: ", error);
      throw error;
    }
  }
}

const categoryApi = new CategoryApi();

export default categoryApi;
