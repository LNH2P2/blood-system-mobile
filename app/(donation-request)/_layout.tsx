import { BookingProvider } from '@/lib/contexts/BookingContext'
import { QRScannerProvider } from '@/lib/contexts/QRScannerContext'
import { theme } from '@/lib/theme'
import { Ionicons } from '@expo/vector-icons'
import { Stack, useRouter } from 'expo-router'
import { TouchableOpacity } from 'react-native'

function StackNavigator() {
  const router = useRouter()
  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name='donation-request'
        options={{
          title: 'Cập nhật thông tin',
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
              onPress={() => router.push('/(tabs)/homepage')}
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
        name='donation-blood'
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
        name='donation-place'
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
  )
}

export default function MemberLayout() {
  return (
    <BookingProvider>
      <QRScannerProvider>
        <StackNavigator />
      </QRScannerProvider>
    </BookingProvider>
  )
}
