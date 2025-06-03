import { theme } from "@/lib/theme";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function MemberLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.color.primary,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name='blog/[id]'
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name='blog/index'
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name='homepage/index'
        options={{
          title: "Trang chủ",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='home' size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='profile/index'
        options={{
          title: "Hồ sơ",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='person' size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='donation-request/index'
        options={{
          title: "Hiến máu",
          headerShown: false, // Ẩn header mặc định cho tab Hiến máu
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='heart' size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
