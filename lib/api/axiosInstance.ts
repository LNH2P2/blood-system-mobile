import axios from "axios";
import Constants from "expo-constants";

// Safely access API_BASE_URL with fallback
const API_BASE_URL = Constants?.expoConfig?.extra?.API_BASE_URL as string | undefined;
class AxiosInstance {
  api;

  constructor() {
    console.log("Initializing AxiosInstance...", API_BASE_URL);
    this.api = axios.create({
      baseURL: API_BASE_URL || "http://localhost:3000", // Use environment variable or fallback
      timeout: 10000,
    });

    // this.api.interceptors.request.use((config) => {
    //   // Giả sử lấy token từ AsyncStorage hoặc nơi khác
    //   const token = 'your_token_here';
    //   if (token) {
    //     config.headers.Authorization = `Bearer ${token}`;
    //   }
    //   return config;
    // });

    // this.api.interceptors.response.use(
    //   (response) => response,
    //   (error) => {
    //     if (error.response?.status === 401) {
    //       // Xử lý logout hoặc refresh token ở đây
    //       console.log('Unauthorized! Logging out...');
    //     }
    //     return Promise.reject(error);
    //   }
    // );
  }

  get(url: string, config?: any) {
    return this.api.get(url, config);
  }

  post(url: string, data: any, config?: any) {
    return this.api.post(url, data, config);
  }

  patch(url: string, data: any, config?: any) {
    return this.api.patch(url, data, config);
  }

  put(url: string, data: any, config?: any) {
    return this.api.put(url, data, config);
  }

  delete(url: string, config?: any) {
    return this.api.delete(url, config);
  }
}

const axiosInstance = new AxiosInstance();

export default axiosInstance;
