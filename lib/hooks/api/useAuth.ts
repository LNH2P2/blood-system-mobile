import axiosInstance from "@/lib/api/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi, AuthResponse, LoginRequest } from "../../api/auth";

// Keys for AsyncStorage
const STORAGE_KEYS = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
  USER_DATA: "user_data"
};

// Login mutation
export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: LoginRequest): Promise<AuthResponse> => {
      // Gọi API thật tới localhost:3000/auth/login
      const response = await axiosInstance.post("auth/login", {
        ...data,
        deviceInfo: "ios"
      });
      // axios trả về response.data
      const result: AuthResponse = response.data;

      // Store tokens và user data nếu có
      if (result.data) {
        await AsyncStorage.setItem(
          STORAGE_KEYS.ACCESS_TOKEN,
          result.data.access_token
        );
        await AsyncStorage.setItem(
          STORAGE_KEYS.REFRESH_TOKEN,
          result.data.refresh_token
        );
      }
      return result;
    },
    onSuccess: (data) => {
      // Invalidate and refetch user-related queries
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      console.log("Login successful:", data);
    },
    onError: (error) => {
      console.error("Login failed:", error);
    }
  });
}

// Register mutation
// export function useRegisterMutation() {
//   return useMutation({
//     mutationFn: async (data: RegisterRequest): Promise<AuthResponse> => {
//       // For now, simulate successful registration
//       await new Promise((resolve) => setTimeout(resolve, 1500));

//       const mockResponse: AuthResponse = {
//         success: true,
//         message: "Đăng ký thành công",
//         data: {
//           user: {
//             id: "2",
//             fullName: data.fullName,
//             email: data.email,
//             phone: data.phone,
//             avatar: ""
//           },
//           token: "mock_access_token_" + Date.now(),
//           refreshToken: "mock_refresh_token_" + Date.now()
//         }
//       };

//       return mockResponse;
//     },
//     onSuccess: (data) => {
//       console.log("Registration successful:", data);
//     },
//     onError: (error) => {
//       console.error("Registration failed:", error);
//     }
//   });
// }

// Logout mutation
export function useLogoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (): Promise<void> => {
      // Clear stored tokens and user data
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.ACCESS_TOKEN,
        STORAGE_KEYS.REFRESH_TOKEN,
        STORAGE_KEYS.USER_DATA
      ]);

      // Call API logout if needed
      await authApi.logout();
    },
    onSuccess: () => {
      // Clear all queries
      queryClient.clear();
      console.log("Logout successful");
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    }
  });
}

// Utility functions for token management
export const tokenUtils = {
  async getAccessToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    } catch (error) {
      console.error("Error getting access token:", error);
      return null;
    }
  },

  async getRefreshToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    } catch (error) {
      console.error("Error getting refresh token:", error);
      return null;
    }
  },

  async getUserData(): Promise<any | null> {
    try {
      const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error getting user data:", error);
      return null;
    }
  },

  async isLoggedIn(): Promise<boolean> {
    try {
      const token = await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
      return !!token;
    } catch (error) {
      console.error("Error checking login status:", error);
      return false;
    }
  },

  async clearTokens(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.ACCESS_TOKEN,
        STORAGE_KEYS.REFRESH_TOKEN,
        STORAGE_KEYS.USER_DATA
      ]);
    } catch (error) {
      console.error("Error clearing tokens:", error);
    }
  }
};
