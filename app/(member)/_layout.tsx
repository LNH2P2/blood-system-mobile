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
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='heart' size={size} color={color} />
          )
        }}
      />
    </Tabs>
  )
}
