import { Stack } from 'expo-router'

export default function MemberLayout() {
  return (
    <Stack>
      <Stack.Screen name='profile/index' />
    </Stack>
  )
}
