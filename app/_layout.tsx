import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router'

const client = new QueryClient()

export default function RootLayout() {
  return (
    <QueryClientProvider client={client}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='index' />
        <Stack.Screen name='(member)' />
        <Stack.Screen name='(admin)' />
      </Stack>
    </QueryClientProvider>
  )
}
