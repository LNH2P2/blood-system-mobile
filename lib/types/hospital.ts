export interface Province {
  code: string;
  name: string;
  name_en: string;
  full_name: string;
  full_name_en: string;
  latitude: string;
  longitude: string;
}

export interface District {
  code: string;
  name: string;
  name_en: string;
  full_name: string;
  full_name_en: string;
  latitude: string;
  longitude: string;
}

export interface Ward {
  code: string;
  name: string;
  name_en: string;
  full_name: string;
  full_name_en: string;
  latitude: string;
  longitude: string;
}

// API Response types
export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

export interface PaginationResponse<T> {
  statusCode: number;
  message: string;
  data: T[];
  pagination: {
    limit: number;
    currentPage: number;
    totalRecords: number;
    totalPages: number;
  };
}

export interface ContactInfo {
  phone: string;
  email?: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface BloodInventoryItem {
  _id?: string;
  bloodType: BloodType;
  component: BloodComponent;
  quantity: number;
  expiresAt: string;
}

export interface BloodInventory {
  bloodType: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  component: "whole_blood" | "red_cells" | "platelets" | "plasma";
  quantity: number;
  expiresAt: string;
}

export enum BloodType {
  A_POSITIVE = "A+",
  A_NEGATIVE = "A-",
  B_POSITIVE = "B+",
  B_NEGATIVE = "B-",
  AB_POSITIVE = "AB+",
  AB_NEGATIVE = "AB-",
  O_POSITIVE = "O+",
  O_NEGATIVE = "O-",
}

export enum BloodComponent {
  WHOLE_BLOOD = "whole_blood",
  RED_CELLS = "red_cells",
  PLATELETS = "platelets",
  PLASMA = "plasma",
}

export interface MedicalFacility {
  _id: string;
  name: string;
  address: string;
  province: string;
  district: string;
  ward: string;
  contactInfo: ContactInfo;
  operatingHours: string;
  services: string[];
  bloodInventory: BloodInventoryItem[];
  emergencyContact: string;
  description?: string;
  imageUrl?: string;
  coordinates: Coordinates;
  isActive: boolean;
  status: string;
  licenseNumber?: string;
  establishedDate?: string;
  isDeleted: boolean;
  distance?: number; // calculated from user location
  createdAt: string;
  updatedAt: string;
}

export interface CreateHospitalData {
  name: string;
  address: string;
  province: string;
  district: string;
  ward: string;
  contactInfo: ContactInfo;
  operatingHours: string;
  services: string[];
  bloodInventory?: BloodInventoryItem[];
  emergencyContact: string;
  description?: string;
  coordinates: Coordinates;
  licenseNumber?: string;
  establishedDate?: string;
  isActive?: boolean;
}

export type UpdateHospitalData = Partial<CreateHospitalData>;

export interface HospitalSearchParams {
  search?: string;
  province?: string;
  district?: string;
  ward?: string;
  bloodType?: BloodType | string;
  component?: BloodComponent | string;
  isActive?: boolean;
  page?: number;
  limit?: number;
  order?: "ASC" | "DESC";
}

export interface HospitalsListResponse {
  data: MedicalFacility[];
  pagination: {
    limit: number;
    currentPage: number;
    totalRecords: number;
    totalPages: number;
  };
}

export interface BloodInventoryResponse {
  _id: string;
  name: string;
  bloodInventory: BloodInventoryItem[];
}

export interface LocationSearchParams {
  province?: string;
  district?: string;
  ward?: string;
  bloodType?: string;
  component?: string;
}
