export interface QRScannerData {
  fullName?: string
  idNumber?: string
  dateOfBirth?: Date
  gender?: 'male' | 'female'
  address?: string
  phoneNumber?: string
  email?: string
}

export interface QRScannerResult {
  success: boolean
  data: QRScannerData | null
  rawData: string | null
  error?: string
}
