import { District, Province, Ward } from "@/lib/types/hospital";

const BASE_URL = "https://provinces.open-api.vn/api";

export const addressApi = {
  async getProvinces(): Promise<Province[]> {
    try {
      const response = await fetch(`${BASE_URL}/p/`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching provinces:", error);
      return [];
    }
  },

  async getDistricts(provinceCode: string): Promise<District[]> {
    try {
      const response = await fetch(`${BASE_URL}/p/${provinceCode}?depth=2`);
      const data = await response.json();
      return data.districts || [];
    } catch (error) {
      console.error("Error fetching districts:", error);
      return [];
    }
  },

  async getWards(districtCode: string): Promise<Ward[]> {
    try {
      const response = await fetch(`${BASE_URL}/d/${districtCode}?depth=2`);
      const data = await response.json();
      return data.wards || [];
    } catch (error) {
      console.error("Error fetching wards:", error);
      return [];
    }
  },
};
