import { BookingProvider } from '@/lib/contexts/BookingContext'
import { theme } from '@/lib/theme'
import { Ionicons } from '@expo/vector-icons'
import { Stack, useRouter } from 'expo-router'
import { TouchableOpacity } from 'react-native'

export default function MemberLayout() {
  const router = useRouter()

  return (
    <BookingProvider>
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
            title: 'Đặt lịch',
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
                onPress={() => router.push('/')}
                style={{
                  marginLeft: 16,
                  padding: 8
                }}
              >
                <Ionicons name='arrow-back' size={24} color='white' />
              </TouchableOpacity>
            )
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
                <Ionicons name='arrow-back' size={24} color='white' />
              </TouchableOpacity>
            )
          }}
        />
        <Stack.Screen
          name='donation-request/donation-place'
          options={{
            title: 'Địa điểm đặt lịch',
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
                <Ionicons name='arrow-back' size={24} color='white' />
              </TouchableOpacity>
            )
          }}
        />
      </Stack>
    </BookingProvider>
  )
}
