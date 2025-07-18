import { AuthProvider } from "@/lib/contexts/AuthContext";
import { AlertProvider } from "@/lib/hooks/useAlert";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

const client = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={client}>
      <AuthProvider>
        <AlertProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name='index' />
            <Stack.Screen name='welcome' />
            <Stack.Screen name='login' />
            <Stack.Screen name='register' />
            <Stack.Screen name='(tabs)' />
            <Stack.Screen name='(donation-request)' />
            <Stack.Screen name='(hospital)' />
          </Stack>
        </AlertProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
