import { useRouter } from 'expo-router'
import { Button, View } from 'react-native'

export default function Index() {
  const router = useRouter()

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Button
        title='Member'
        onPress={() => router.navigate('/(member)/profile')}
      />
      <Button title='Admin' onPress={() => router.navigate('/(admin)')} />
      <Button
        title='Đặt lịch'
        onPress={() => router.navigate('/(member)/donation-request')}
      />
    </View>
  )
}
