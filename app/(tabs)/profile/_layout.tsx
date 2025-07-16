import {
  QRScannerProvider,
  useQRScannerContext
} from '@/lib/contexts/QRScannerContext'
import { theme } from '@/lib/theme'
import { Ionicons } from '@expo/vector-icons'
import { Stack } from 'expo-router'
import { TouchableOpacity } from 'react-native'

function ProfileUser() {
  const { openQRScanner } = useQRScannerContext()

  const handleQRPress = () => {
    openQRScanner()
  }

  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          headerTitle: 'Thông tin cá nhân',
          headerStyle: {
            backgroundColor: theme.color.primary
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
            color: theme.color.white
          },
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name='user-profile'
        options={{
          headerTitle: 'Cập nhật tài khoản',
          headerStyle: {
            backgroundColor: theme.color.primary
          },
          headerTintColor: theme.color.white,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
            color: theme.color.white
          },
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerRight: () => (
            <TouchableOpacity
              onPress={handleQRPress}
              style={{
                marginRight: 15,
                padding: 7
              }}
            >
              <Ionicons name='qr-code' size={23} color='white' />
            </TouchableOpacity>
          )
        }}
      />

      <Stack.Screen
        name='user-address'
        options={{
          headerTitle: 'Cập nhật địa chỉ',
          headerStyle: {
            backgroundColor: theme.color.primary
          },
          headerTintColor: theme.color.white,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
            color: theme.color.white
          },
          headerTitleAlign: 'center',
          headerShadowVisible: false
        }}
      />

      {/* <Stack.Screen name="[productId]" options={{ title: "Product Detail" }} /> */}
    </Stack>
  )
}

export default function ProfileUserLayout() {
  return (
    <QRScannerProvider>
      <ProfileUser />
    </QRScannerProvider>
  )
}
