import addressApi from "@/lib/api/address";
import { UserCUAddress } from "@/lib/types/user";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (address: Partial<UserCUAddress>) =>
      addressApi.createAddress(address),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });
}

export function useUpdateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (address: Partial<UserCUAddress>) =>
      addressApi.updateAddress(address),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });
}

export function useDeleteAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (address: Partial<UserCUAddress>) =>
      addressApi.deleteAddress(address),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });
}
