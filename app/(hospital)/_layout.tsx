import { Stack } from "expo-router";

export default function HospitalLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="hospital-search"
        options={{
          title: "Tìm Bệnh Viện",
          headerShown: true,
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
        name="hospital-list"
        options={{
          title: "Danh Sách Bệnh Viện",
          headerShown: true,
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
        name="hospital-detail"
        options={{
          title: "Chi Tiết Bệnh Viện",
          headerShown: true,
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
