
import { User } from "../types/user";
import axiosInstance from "./axiosInstance";

const userURL = "/users";
const authURL = "/auth";
class UserApi {
  async getProfile() {
    try {
      const res = await axiosInstance.get(`${userURL}`);
      return res.data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error; // Rethrow the error to handle it in the calling function
    }
  }
  async getProfileById(id: string): Promise<User> {
    try {
      const res = await axiosInstance.get(`${userURL}/${id}`);
      return res.data;
    } catch (error) {
      console.error("Error fetching user profile by ID:", error);
      throw error; // Rethrow the error to handle it in the calling function
    }
  }

  async updateProfile(userProfile: Partial<User>) {
    try {
      const res = await axiosInstance.patch(`${userURL}/${userProfile._id}`, userProfile);
      return res.data;
    } catch (error) {
      console.log("Error updating user profile:", error);
      throw error; // Rethrow the error to handle it in the calling function
    }
  }

  async login(credentials: { username: string; password: string }) {
    const res = await axiosInstance.post(`${authURL}/login`, credentials);
    return res;
  }
}

const userApi = new UserApi();

export default userApi;
