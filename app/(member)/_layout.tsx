import { theme } from '@/lib/theme'
import { Stack } from 'expo-router'

export default function MemberLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name='profile/index'
        options={{
          title: 'Hồ sơ'
        }}
      />
      <Stack.Screen
        name='donation-request/index'
        options={{
          title: 'Đặt lịch hiến máu',
          headerShown: true,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: theme.color.primary
          },
          headerTitleStyle: {
            color: 'white',
            fontWeight: 'bold',
            fontSize: 18
          },
          headerTintColor: 'white'
        }}
      />
    </Stack>
  )
}
