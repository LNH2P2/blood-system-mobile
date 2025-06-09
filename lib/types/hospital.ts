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

export interface BloodInventory {
  bloodType: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  component: "whole_blood" | "red_cells" | "platelets" | "plasma";
  quantity: number;
  expiresAt: string;
}

export interface MedicalFacility {
  id: string;
  name: string;
  address: string;
  province: string;
  district: string;
  ward: string;
  contactInfo: {
    phone: string;
    email?: string;
  };
  operatingHours: string;
  services: string[];
  bloodInventory: BloodInventory[];
  emergencyContact: string;
  description: string;
  imageUrl?: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  isActive: boolean;
  distance?: number; // calculated from user location
  createdAt: string;
  updatedAt: string;
}

export interface LocationSearchParams {
  province?: string;
  district?: string;
  ward?: string;
  bloodType?: string;
  component?: string;
}
