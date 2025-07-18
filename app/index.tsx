import Onboarding from "@/lib/components/Onboarding";
import SplashScreen from "@/lib/components/SplashScreen";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  if (showOnboarding) {
    return <Onboarding onFinish={() => setShowOnboarding(false)} />;
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      <Button
        title='Welcome Screen'
        onPress={() => router.navigate("/welcome")}
      />
      <Button title='Đăng nhập' onPress={() => router.navigate("/login")} />
      <Button
        title='Trang chủ'
        onPress={() => router.navigate("/(tabs)/homepage")}
      />
      <Button
        title='Bệnh viện'
        onPress={() => router.navigate("/(hospital)/hospital-search")}
      />
      <Button title='Show Splash Screen' onPress={() => setShowSplash(true)} />
      <Button title='Show Onboarding' onPress={() => setShowOnboarding(true)} />
    </View>
  );
}
