import AuthLoadingScreen from "@/lib/components/AuthLoadingScreen";
import { useAuth } from "@/lib/contexts/AuthContext";
import { theme } from "@/lib/theme";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const WelcomeScreen: React.FC = () => {
  const { isLoggedIn, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      // Auto redirect to homepage if already logged in
      router.replace("/(tabs)/homepage");
    }
  }, [isLoggedIn, isLoading, router]);

  if (isLoading) {
    return <AuthLoadingScreen />;
  }

  if (isLoggedIn) {
    return null; // Will redirect in useEffect
  }

  const handleLogin = () => {
    router.push("/login");
  };

  const handleRegister = () => {
    router.push("/register");
  };

  const handleExplore = () => {
    router.push("/(tabs)/homepage");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <Image
            source={require("@/assets/images/logo-text-primary.png")}
            style={styles.logo}
            resizeMode='contain'
          />
        </View>

        {/* Welcome Text */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Chào mừng đến với Blood System</Text>
          <Text style={styles.subtitle}>
            Ứng dụng hiến máu cứu người - Kết nối lòng nhân ái
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Đăng nhập</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
          >
            <Text style={styles.registerButtonText}>Đăng ký</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.exploreButton}
            onPress={handleExplore}
          >
            <Text style={styles.exploreButtonText}>Khám phá ngay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 60,
  },
  logo: {
    width: 250,
    height: 100,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.color.dark,
    textAlign: "center",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: theme.color.gray,
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    gap: 16,
  },
  loginButton: {
    backgroundColor: theme.color.primary,
    borderRadius: 12,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.color.white,
  },
  registerButton: {
    backgroundColor: theme.color.white,
    borderRadius: 12,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: theme.color.primary,
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.color.primary,
  },
  exploreButton: {
    backgroundColor: theme.color.lightGray,
    borderRadius: 12,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },
  exploreButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.color.darkGray,
  },
});

export default WelcomeScreen;
