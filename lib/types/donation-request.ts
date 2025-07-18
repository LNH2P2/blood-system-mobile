export enum DonationRequestStatus {
  SCHEDULED,
  COMPLETED,
  CANCELLED
}

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type ContactInfo = {
  phone: string;
};

export type Pagination = {
  limit: number;
  currentPage: number;
  totalRecords: number;
  totalPages: number;
};

export type HospitalResponse = {
  _id: string;
  name: string;
  address: string;
  province: string;
  district: string;
  ward: string;
  contactInfo: ContactInfo;
  operatingHours: string;
  services: string[];
  bloodInventory: any[];
  emergencyContact: string;
  description: string;
  coordinates: Coordinates;
  isActive: boolean;
  licenseNumber: string;
  establishedDate: string;
  isDeleted: boolean;
  createdAtBy: any;
  updatedAtBy: any;
  isDeletedBy: any;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type DonationRequestItem = {
  _id: string;
  userId: string;
  status: DonationRequestStatus;
  hospitalId: HospitalResponse;
  scheduleDate: string;
  note: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type DonationRequestListResType = {
  statusCode: number;
  message: string;
  data: DonationRequestItem[];
  pagination: Pagination;
};

export type CreateDonationRequestBody = {
  userId: string;
  status?: DonationRequestStatus;
  hospitalId: string;
  scheduleDate: string; // ISO date string
  createdBy: string;
  note?: string;
};

export type CreateDonationResType = {
  statusCode: number;
  message: string;
  data: DonationRequestItem;
};

export type UpdateDonationBody = {
  hospitalId: string;
  scheduleDate: string;
};

export type Hospital = {
  _id: string;
  name: string;
  address: string;
  province: string;
  district: string;
  ward: string;
  contactInfo: {
    phone: string;
  };
  operatingHours: string;
  services: string[];
  bloodInventory: any[]; // bạn có thể thay bằng type cụ thể nếu có
  emergencyContact: string;
  description: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  isActive: boolean;
  licenseNumber: string;
  establishedDate: string; // ISO Date string
  isDeleted: boolean;
  createdAtBy: any | null;
  updatedAtBy: any | null;
  isDeletedBy: any | null;
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
  __v: number;
};

export type GetHospitalListResType = {
  statusCode: number;
  message: string;
  data: Hospital[];
  pagination: Pagination;
};
