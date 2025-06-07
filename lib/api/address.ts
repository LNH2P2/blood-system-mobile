import { UserCUAddress } from "@/lib/types/user";

import axiosInstance from "./axiosInstance";

const addressURL = "/addresses";
const userURL = "/users";
class AddressApi {
  async createAddress(address: Partial<UserCUAddress>) {
    try {
      
      const res = await axiosInstance.post(
        `${userURL}/${address.userId}${addressURL}`,
        address
      );
      return res.data;
    } catch (error) {
      console.log("Error create Address user profile:", error);
      throw error; // Rethrow the error to handle it in the calling function
    }
  }
  async updateAddress(address: Partial<UserCUAddress>) {
    try {
      const res = await axiosInstance.patch(
        `${userURL}/${address.userId}${addressURL}/${address.addressId}`,
        address
      );
      return res.data;
    } catch (error) {
      console.log("Error update Address user profile:", error);
      throw error; // Rethrow the error to handle it in the calling function
    }
  }

  async deleteAddress(address: Partial<UserCUAddress>) {
    try {
      const res = await axiosInstance.delete(
        `${userURL}/${address.userId}${addressURL}/${address.addressId}`
      );
      return res.data;
    } catch (error) {
      console.log("Error delete Address of user profile:", error);
      throw error; // Rethrow the error to handle it in the calling function
    }
  }
}

const addressApi = new AddressApi();

export default addressApi;
