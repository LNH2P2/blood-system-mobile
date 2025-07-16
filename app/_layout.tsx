import { AlertProvider } from "@/lib/hooks/useAlert";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

const client = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={client}>
      <AlertProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(donation-request)" />
          <Stack.Screen name="(hospital)" />
          <Stack.Screen name="(admin)" />
        </Stack>
      </AlertProvider>
    </QueryClientProvider>
  );
}
