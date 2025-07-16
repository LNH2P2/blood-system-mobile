import { Stack } from "expo-router";

export default function AdminLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="admin-dashboard"
        options={{
          title: "Quản lý bệnh viện",
          headerStyle: {
            backgroundColor: "#DC2626",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="hospital-form"
        options={{
          title: "Thêm/Sửa bệnh viện",
          headerStyle: {
            backgroundColor: "#DC2626",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="blood-inventory/[hospitalId]"
        options={{
          title: "Quản lý kho máu",
          headerStyle: {
            backgroundColor: "#DC2626",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Stack>
  );
}
