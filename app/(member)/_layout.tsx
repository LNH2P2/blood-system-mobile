import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'

export default function MemberLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#dc2626',
        headerShown: false
      }}
    >
      <Tabs.Screen
        name='profile/index'
        options={{
          title: 'Hồ sơ',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='person' size={size} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name='donation-request/index'
        options={{
          title: 'Hiến máu',
          headerShown: false, // Ẩn header mặc định cho tab Hiến máu
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='heart' size={size} color={color} />
          )
        }}
      />
      {/* Ẩn các tab khác từ thư mục donation-request */}
      <Tabs.Screen
        name='donation-request'
        options={{
          href: null // Điều này loại bỏ tab này khỏi navigation
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          href: null // Điều này loại bỏ tab này khỏi navigation
        }}
      />
    </Tabs>
  )
}
