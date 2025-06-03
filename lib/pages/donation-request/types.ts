export interface FormData {
  fullName: string
  dateOfBirth: Date | null
  gender: string
  idNumber: string
  phoneNumber: string
  email: string
  address: string
  bloodType: string
  hasDonatedBefore: string
  lastDonationDate: Date | null
  medicalConditions: string
  medications: string
  readyToDonateDate: Date | null
  receiveReminders: boolean
  donationStatus: string
  donationHistory: string
  consent: boolean
}

export interface FormErrors {
  [key: string]: string
}

export const initialFormData: FormData = {
  fullName: '',
  dateOfBirth: null,
  gender: '',
  idNumber: '',
  phoneNumber: '',
  email: '',
  address: '',
  bloodType: '',
  hasDonatedBefore: '',
  lastDonationDate: null,
  medicalConditions: '',
  medications: '',
  readyToDonateDate: null,
  receiveReminders: false,
  donationStatus: '',
  donationHistory: '',
  consent: false
}

export const formatDate = (date: Date | null): string => {
  if (!date) return 'Chọn ngày'
  return date.toLocaleDateString('vi-VN')
}
