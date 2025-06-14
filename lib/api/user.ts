import { User } from '../types/user'
import axiosInstance from './axiosInstance'

const userURL = '/users'
const authURL = '/auth'
class UserApi {
  async getProfile() {
    try {
      const res = await axiosInstance.get(`${userURL}`)
      return res.data.data
    } catch (error) {
      console.error('Error fetching user profile:', error)
      throw error // Rethrow the error to handle it in the calling function
    }
  }
  async getProfileById(id: string): Promise<User> {
    try {
      const res = await axiosInstance.get(`${userURL}/${id}`)
      console.log('res', res.data.data)
      return res.data.data
    } catch (error) {
      console.error('Error fetching user profile by ID:', error)
      throw error // Rethrow the error to handle it in the calling function
    }
  }

  async updateProfile(userProfile: Partial<User>) {
    try {
      const res = await axiosInstance.patch(
        `${userURL}/${userProfile._id}`,
        userProfile
      )
      return res.data.data
    } catch (error) {
      console.log('Error updating user profile:', error)
      throw error // Rethrow the error to handle it in the calling function
    }
  }
  async login(credentials: { username: string; password: string }) {
    const res = await axiosInstance.post(`${authURL}/login`, credentials)
    return res
  }

  async uploadImage(imageUri: string): Promise<string> {
    try {
      // Tạo FormData để upload file
      const formData = new FormData()

      // Lấy tên file từ URI
      const filename = imageUri.split('/').pop() || 'avatar.jpg'
      const fileType = filename.split('.').pop() || 'jpg'

      // Thêm file vào FormData
      formData.append('file', {
        uri: imageUri,
        type: `image/${fileType}`,
        name: filename
      } as any) // Gửi request với Content-Type multipart/form-data
      const res = await axiosInstance.post('/local-files', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        transformRequest: (data: any) => {
          return data // Giữ nguyên FormData
        }
      })

      console.log('=== Image Upload Response Debug ===')
      console.log('Full response:', JSON.stringify(res.data, null, 2))
      console.log('Response status:', res.status)
      console.log('Response headers:', res.headers)

      // Xử lý response để lấy URL - thử nhiều cấu trúc có thể
      let finalUrl = null

      if (res.data && res.data.data && res.data.data.url) {
        finalUrl = res.data.data.url
        console.log('Found URL in data.data.url:', finalUrl)
      } else if (res.data && res.data.url) {
        finalUrl = res.data.url
        console.log('Found URL in data.url:', finalUrl)
      } else if (
        res.data &&
        res.data.data &&
        typeof res.data.data === 'string'
      ) {
        finalUrl = res.data.data
        console.log('Found URL in data.data (string):', finalUrl)
      } else if (res.data && typeof res.data === 'string') {
        finalUrl = res.data
        console.log('Found URL in data (string):', finalUrl)
      } else {
        console.log('Could not find URL in response, returning full data')
        finalUrl = res.data
      }

      console.log('Final URL to return:', finalUrl)
      return finalUrl
    } catch (error) {
      console.error('Error uploading image:', error)
      throw error
    }
  }
}

const userApi = new UserApi()

export default userApi
