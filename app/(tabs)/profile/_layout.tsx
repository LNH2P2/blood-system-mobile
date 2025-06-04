import { theme } from "@/lib/theme";
import { Stack } from "expo-router";

function ProfileUser() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Thông tin cá nhân",
          headerStyle: {
            backgroundColor: theme.color.primary,
          },
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 18,
            color: theme.color.white,
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="user-profile"
        options={{
          headerTitle: "Cập nhật tài khoản",
          headerStyle: {
            backgroundColor: theme.color.primary,
          },
          headerTintColor: theme.color.white,
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 18,
            color: theme.color.white,
          },
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
      />

       <Stack.Screen
        name="user-address"
        options={{
          headerTitle: "Cập nhật địa chỉ",
          headerStyle: {
            backgroundColor: theme.color.primary,
          },
          headerTintColor: theme.color.white,
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 18,
            color: theme.color.white,
          },
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
      />
      

      {/* <Stack.Screen name="[productId]" options={{ title: "Product Detail" }} /> */}
    </Stack>
  );
}

export default ProfileUser;
