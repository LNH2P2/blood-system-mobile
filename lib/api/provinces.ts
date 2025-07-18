import { District, Province, Ward } from "@/lib/types/hospital";
import axios from "axios";

const BASE_URL = "https://provinces.open-api.vn/api";

// Create axios instance with timeout
const provincesApi = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds timeout
});

export const addressApi = {
  async getProvinces(): Promise<Province[]> {
    const response = await provincesApi.get("/p/");
    return response.data;
  },

  async getDistricts(provinceCode: string): Promise<District[]> {
    const response = await provincesApi.get(`/p/${provinceCode}?depth=2`);
    return response.data.districts || [];
  },

  async getWards(districtCode: string): Promise<Ward[]> {
    const response = await provincesApi.get(`/d/${districtCode}?depth=2`);
    return response.data.wards || [];
  },
};
