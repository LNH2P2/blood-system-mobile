export type DonationRequestResType = {
  message: string
  statusCode: number
  data: {
    id: string
    title: string
    date: string
  }
}

export enum DonationRequestStatus {
  SCHEDULED,
  COMPLETED,
  CANCELLED
}

export type CreateDonationRequestBody = {
  userId: string
  medicalFacilityId: string
  scheduleDate: Date
}

export type DonationRequest = {
  _id: string
  userId: string
  status: DonationRequestStatus
  medicalFacilityId: string
  scheduleDate: string
  note?: string
  createdAt: string
  updatedAt: string
  __v: number
}

export type Pagination = {
  limit: number
  currentPage: number
  totalRecords: number
  totalPages: number
}

export type GeListDonationResType = {
  message: string
  statusCode: number
  data: DonationRequest[]
  pagination: Pagination
}
