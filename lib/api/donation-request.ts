import axiosInstance from '@/lib/api/axiosInstance'
import { DonationRequestResType } from '@/lib/types'

export const URL_DONATION_REQUEST = '/donation-requests'

const donationRequestApi = {
  create: (data: any = {}): Promise<DonationRequestResType> =>
    axiosInstance
      .post(URL_DONATION_REQUEST, data)
      .then((response) => response.data),

  getListDonation() {
    // return axiosInstance.get(URL_DONATION_REQUEST)
    return {
      data: [
        {
          id: '1',
          title: 'Trung tâm Máu Quốc gia - Gan tiểu cầu',
          date: '02/06/2025'
        },
        {
          id: '2',
          title: 'Trung tâm Máu Quốc gia - Gan tiểu cầu',
          date: '02/06/2025'
        },
        {
          id: '3',
          title: 'Trung tâm Máu Quốc gia - Gan tiểu cầu',
          date: '02/06/2025'
        },
        {
          id: '4',
          title: 'Trung tâm Máu Quốc gia - Gan tiểu cầu',
          date: '02/06/2025'
        },
        {
          id: '5',
          title: 'Trung tâm Máu Quốc gia - Gan tiểu cầu',
          date: '02/06/2025'
        },
        {
          id: '6',
          title: 'Trung tâm Máu Quốc gia - Gan tiểu cầu',
          date: '02/06/2025'
        },
        {
          id: '7',
          title: 'Trung tâm Máu Quốc gia - Gan tiểu cầu',
          date: '02/06/2025'
        },
        {
          id: '8',
          title: 'Trung tâm Máu Quốc gia - Gan tiểu cầu',
          date: '02/06/2025'
        },
        {
          id: '9',
          title: 'Trung tâm Máu Quốc gia - Gan tiểu cầu',
          date: '02/06/2025'
        },
        {
          id: '10',
          title: 'Trung tâm Máu Quốc gia - Gan tiểu cầu',
          date: '02/06/2025'
        }
      ]
    }
  }
}

export default donationRequestApi
