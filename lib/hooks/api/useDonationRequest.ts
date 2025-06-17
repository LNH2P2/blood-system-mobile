import donationRequestApi from '@/lib/api/donation-request'
import { UpdateDonationBody } from '@/lib/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

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

export const useUpdateDonationReqMutation = (
  id: string,
  data: UpdateDonationBody
) => {
  return useMutation({
    mutationFn: () => donationRequestApi.updateDonationRequest(id, data)
  })
}

export const useGetListHospitalQuery = () => {
  return useQuery({
    queryKey: ['hospitals'],
    queryFn: donationRequestApi.getListHostpital
  })
}

export const useDeleteDonationReqMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: donationRequestApi.deleteDonationRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['donation-requests'] })
    }
  })
}
