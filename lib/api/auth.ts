import { fetchWithTimeout } from "../utils/fetchWithTimeout";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: {
      id: string;
      fullName: string;
      email: string;
      phone: string;
      avatar?: string;
    };
    token: string;
    refreshToken: string;
  };
}

class AuthApi {
  private baseUrl = "https://api.bloodsystem.com"; // TODO: Replace with actual API URL

  async login(data: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await fetchWithTimeout(`${this.baseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Login API error:", error);
      throw error;
    }
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await fetchWithTimeout(`${this.baseUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Register API error:", error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      // TODO: Implement logout API call if needed
      // Clear local storage, tokens, etc.
    } catch (error) {
      console.error("Logout API error:", error);
      throw error;
    }
  }

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    try {
      const response = await fetchWithTimeout(`${this.baseUrl}/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Refresh token API error:", error);
      throw error;
    }
  }

  async forgotPassword(
    email: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetchWithTimeout(
        `${this.baseUrl}/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Forgot password API error:", error);
      throw error;
    }
  }
}

export const authApi = new AuthApi();
