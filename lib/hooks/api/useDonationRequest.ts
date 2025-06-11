import donationRequestApi from '@/lib/api/donation-request'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useCreateDonationReqMutation = () => {
  return useMutation({
    mutationFn: donationRequestApi.create
  })
}

export const useGetListDonationReqQuery = () => {
  return useQuery({
    queryKey: ['donation-requests'],
    queryFn: donationRequestApi.getListDonation
  })
}
