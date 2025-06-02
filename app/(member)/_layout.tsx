import { theme } from '@/lib/theme'
import { Stack, useRouter } from 'expo-router'
import { Text, TouchableOpacity } from 'react-native'

export default function MemberLayout() {
  const router = useRouter()

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
      <Stack.Screen
        name='donation-request/donation-blood'
        options={{
          title: 'Đặt lịch hiến Máu',
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
          headerTintColor: 'white',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                marginLeft: 16,
                padding: 8
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                  fontWeight: 'bold'
                }}
              >
                ✕
              </Text>
            </TouchableOpacity>
          )
        }}
      />
    </Stack>
  )
}
