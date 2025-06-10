import * as Location from "expo-location";
import { Alert } from "react-native";
import { UserAddress } from "../types/user";

const getCurrentAddress = async (): Promise<Partial<UserAddress> | null> => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Vui lòng cấp quyền truy cập vị trí để sử dụng tính năng này.")
      return null;
    }

    const location = await Location.getCurrentPositionAsync({});
    const [geo] = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    return {
      street: geo.street || "",
      district: geo.district || "",
      city: geo.city || geo.region || "",
      nation: geo.country || "",
    };
  } catch (error) {
    console.error("Lỗi khi lấy địa chỉ hiện tại:", error);
    Alert.alert("Lỗi", "Không thể lấy địa chỉ hiện tại");
    return null;
  }
};

export default getCurrentAddress;