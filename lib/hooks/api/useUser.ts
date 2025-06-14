import userApi from '@/lib/api/user'
import { User } from '@/lib/types/user'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useUser() {
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: () => userApi.getProfile()
  })
}

export function useUserById(id: string) {
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: () => userApi.getProfileById(id),
    enabled: !!id
  })
}

export function useUpdateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (userProfile: Partial<User>) =>
      userApi.updateProfile(userProfile),
    onSuccess: () => {
      // Invalidate cache cho 'userProfile' để tự động refetch data mới
      queryClient.invalidateQueries({ queryKey: ['userProfile'] })
    }
  })
}

export function useUploadImage() {
  return useMutation({
    mutationFn: (imageUri: string) => userApi.uploadImage(imageUri),
    onError: (error) => {
      console.error('Error uploading image:', error)
    }
  })
}
