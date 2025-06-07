export interface UserAddress {
  _id: string;
  street: string;
  district: string;
  city: string;
  nation: string;
}

export interface UserCUAddress {
  userId: string;
  addressId: string;
  street: string;
  district: string;
  city: string;
  nation: string;
}


export interface CreatedBy {
  _id: string;
  email: string;
}

export interface User {
  _id: string;
  email: string;
  phoneNumber: string;
  fullName: string;
  username: string;
  image: string;
  role: string // tùy theo role hệ thống hỗ trợ
  gender: string
  dateOfBirth: string; // ISO date string
  address: UserAddress[];
  accountType: string // thêm loại nếu có
  isActive: boolean;
  verified: boolean;
  codeExpired: string | null;
  isDeleted: boolean;
  createdAtBy: CreatedBy;
  updatedAtBy: CreatedBy | null;
  isDeletedBy: CreatedBy | null;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

