import {
  ApiResponse,
  BloodInventoryResponse,
  HospitalSearchParams,
  HospitalsListResponse,
  MedicalFacility,
} from "@/lib/types/hospital";
import axiosInstance from "./axiosInstance";

// Hospital API service
export const hospitalApi = {
  /**
   * GET /api/hospitals - Lấy danh sách hospitals
   */
  async getHospitals(
    params?: HospitalSearchParams
  ): Promise<ApiResponse<HospitalsListResponse>> {
    const response = await axiosInstance.get("/hospitals", { params });
    return response.data;
  },

  /**
   * GET /api/hospitals/:id - Chi tiết hospital
   */
  async getHospitalById(id: string): Promise<ApiResponse<MedicalFacility>> {
    const response = await axiosInstance.get(`/hospitals/${id}`);
    return response.data;
  },

  /**
   * GET /api/hospitals/:id/blood-inventory - Kho máu hospital
   */
  async getBloodInventory(
    id: string
  ): Promise<ApiResponse<BloodInventoryResponse>> {
    const response = await axiosInstance.get(
      `/hospitals/${id}/blood-inventory`
    );
    return response.data;
  },

  // Helper methods for backward compatibility
  async getHospitalsList(params?: {
    province?: string;
    district?: string;
    ward?: string;
    bloodType?: string;
    component?: string;
  }): Promise<MedicalFacility[]> {
    const searchParams: HospitalSearchParams = {
      ...params,
      page: 1,
      limit: 50,
      sortBy: "createdAt",
      sortOrder: "desc",
    };

    const response = await this.getHospitals(searchParams);
    return response.data.result;
  },

  async getHospitalDetails(id: string): Promise<MedicalFacility | null> {
    const response = await this.getHospitalById(id);
    return response.data;
  },
};
