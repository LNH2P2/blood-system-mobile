import axiosInstance from '@/lib/api/axiosInstance'
import {
  CreateDonationRequestBody,
  DonationRequestResType,
  GeListDonationResType
} from '@/lib/types'

export const URL_DONATION_REQUEST = '/donation-requests'

const donationRequestApi = {
  // create: (data: any = {}): Promise<DonationRequestResType> =>
  //   axiosInstance
  //     .post(URL_DONATION_REQUEST, data)
  //     .then((response) => response.data),

  async create(
    data: CreateDonationRequestBody
  ): Promise<DonationRequestResType> {
    try {
      const res = await axiosInstance.post(URL_DONATION_REQUEST, data)
      return res.data.data
    } catch (error) {
      console.error('Error fetching blogs: ', error)
      throw error
    }
  },

  async getListDonation(): Promise<GeListDonationResType> {
    // return axiosInstance.get(URL_DONATION_REQUEST)
    try {
      const res = await axiosInstance.get(URL_DONATION_REQUEST)
      // return
      return res.data
    } catch (error) {
      console.error('Error fetching blogs: ', error)
      throw error
    }
  }
}

export default donationRequestApi
