import {
  ApiResponse,
  BloodInventoryItem,
  BloodInventoryResponse,
  CreateHospitalData,
  HospitalSearchParams,
  MedicalFacility,
  PaginationResponse,
  UpdateHospitalData,
} from "@/lib/types/hospital";
import axiosInstance from "./axiosInstance";

// Hospital API service
export const hospitalApi = {
  /**
   * GET /api/hospitals - Lấy danh sách hospitals
   */
  async getHospitals(
    params?: HospitalSearchParams
  ): Promise<PaginationResponse<MedicalFacility>> {
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
   * POST /api/hospitals - Tạo hospital mới
   */
  async createHospital(
    data: CreateHospitalData
  ): Promise<ApiResponse<MedicalFacility>> {
    console.log("Creating hospital with data:", data);
    const response = await axiosInstance.post("/hospitals", data);
    console.log("Hospital created successfully:", response.data);
    return response.data;
  },

  /**
   * PATCH /api/hospitals/:id - Cập nhật hospital
   */
  async updateHospital(
    id: string,
    data: UpdateHospitalData
  ): Promise<ApiResponse<MedicalFacility>> {
    const response = await axiosInstance.patch(`/hospitals/${id}`, data);
    return response.data;
  },

  /**
   * DELETE /api/hospitals/:id - Xóa hospital
   */
  async deleteHospital(id: string): Promise<ApiResponse<void>> {
    const response = await axiosInstance.delete(`/hospitals/${id}`);
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

  /**
   * PUT /api/hospitals/:id/blood-inventory - Cập nhật toàn bộ kho máu
   */
  async updateBloodInventory(
    id: string,
    bloodInventory: BloodInventoryItem[]
  ): Promise<ApiResponse<MedicalFacility>> {
    const response = await axiosInstance.put(
      `/hospitals/${id}/blood-inventory`,
      { bloodInventory }
    );
    return response.data;
  },

  /**
   * POST /api/hospitals/:id/blood-inventory - Thêm item vào kho máu
   */
  async addBloodInventoryItem(
    id: string,
    item: Omit<BloodInventoryItem, "_id">
  ): Promise<ApiResponse<MedicalFacility>> {
    const response = await axiosInstance.post(
      `/hospitals/${id}/blood-inventory`,
      { item }
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
    const response = await this.getHospitals(params);
    return response.data || [];
  },

  async getHospitalDetails(id: string): Promise<MedicalFacility | null> {
    const response = await this.getHospitalById(id);
    return response.data;
  },
};
