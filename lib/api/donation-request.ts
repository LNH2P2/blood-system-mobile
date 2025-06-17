import axiosInstance from '@/lib/api/axiosInstance'
import {
  CreateDonationRequestBody,
  CreateDonationResType,
  DonationRequestListResType,
  GetHospitalListResType,
  UpdateDonationBody
} from '@/lib/types'
export const URL_DONATION_REQUEST = '/donation-requests'

const donationRequestApi = {
  async create(
    data: CreateDonationRequestBody
  ): Promise<CreateDonationResType> {
    try {
      const res = await axiosInstance.post(URL_DONATION_REQUEST, data)
      return res.data.data
    } catch (error) {
      console.error('Error fetching blogs: ', error)
      throw error
    }
  },

  async getListDonation(): Promise<DonationRequestListResType> {
    try {
      const res = await axiosInstance.get(URL_DONATION_REQUEST)
      return res.data
    } catch (error) {
      console.error('Error fetching blogs: ', error)
      throw error
    }
  },

  async updateDonationRequest(id: string, data: UpdateDonationBody) {
    try {
      const res = await axiosInstance.patch(
        `${URL_DONATION_REQUEST}/${id}`,
        data
      )
      return res.data
    } catch (error) {
      console.log('Error updating donation request:', error)
      throw error
    }
  },

  async deleteDonationRequest(id: string) {
    try {
      const res = await axiosInstance.delete(`${URL_DONATION_REQUEST}/${id}`)
      return res.data
    } catch (error) {
      console.log('Error deleting donation request:', error)
      throw error
    }
  },

  async getListHostpital(): Promise<GetHospitalListResType> {
    try {
      const res = await axiosInstance.get('/hospitals')
      return res.data
    } catch (error) {
      console.error('Error fetching hospitals: ', error)
      throw error
    }
  }
}

export default donationRequestApi
