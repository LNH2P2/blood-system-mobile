import { useRegisterMutation } from "@/lib/hooks/api/useAuth";
import { useAlert } from "@/lib/hooks/useAlert";
import { theme } from "@/lib/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface RegisterFormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const { showAlert } = useAlert();
  const registerMutation = useRegisterMutation();
  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (field: keyof RegisterFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.fullName.trim()) {
      showAlert({
        title: "Lỗi",
        message: "Vui lòng nhập họ và tên",
      });
      return false;
    }

    if (!formData.email.trim()) {
      showAlert({
        title: "Lỗi",
        message: "Vui lòng nhập email",
      });
      return false;
    }

    if (!formData.email.includes("@")) {
      showAlert({
        title: "Lỗi",
        message: "Email không hợp lệ",
      });
      return false;
    }

    if (!formData.phone.trim()) {
      showAlert({
        title: "Lỗi",
        message: "Vui lòng nhập số điện thoại",
      });
      return false;
    }

    if (formData.phone.length < 10) {
      showAlert({
        title: "Lỗi",
        message: "Số điện thoại không hợp lệ",
      });
      return false;
    }

    if (!formData.password.trim()) {
      showAlert({
        title: "Lỗi",
        message: "Vui lòng nhập mật khẩu",
      });
      return false;
    }

    if (formData.password.length < 6) {
      showAlert({
        title: "Lỗi",
        message: "Mật khẩu phải có ít nhất 6 ký tự",
      });
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      showAlert({
        title: "Lỗi",
        message: "Xác nhận mật khẩu không khớp",
      });
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      const result = await registerMutation.mutateAsync({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      if (result.success) {
        showAlert({
          title: "Thành công",
          message: result.message || "Đăng ký thành công! Vui lòng đăng nhập.",
        });
        router.replace("/login");
      }
    } catch (error) {
      console.error("Register error:", error);
      showAlert({
        title: "Lỗi",
        message: "Đăng ký thất bại. Vui lòng thử lại.",
      });
    }
  };

  const handleBackToLogin = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBackToLogin}
            >
              <Ionicons name='arrow-back' size={24} color={theme.color.dark} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Đăng ký</Text>
            <View style={styles.placeholder} />
          </View>

          {/* Logo Section */}
          <View style={styles.logoContainer}>
            <Image
              source={require("@/assets/images/logo-text-primary.png")}
              style={styles.logo}
              resizeMode='contain'
            />
          </View>

          {/* Welcome Text */}
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeTitle}>Tạo tài khoản mới</Text>
            <Text style={styles.welcomeSubtitle}>
              Điền thông tin bên dưới để tạo tài khoản
            </Text>
          </View>

          {/* Register Form */}
          <View style={styles.formContainer}>
            {/* Full Name Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Họ và tên</Text>
              <View style={styles.inputWrapper}>
                <Ionicons
                  name='person-outline'
                  size={20}
                  color={theme.color.gray}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder='Nhập họ và tên'
                  placeholderTextColor={theme.color.gray}
                  value={formData.fullName}
                  onChangeText={(text) => handleInputChange("fullName", text)}
                  autoCapitalize='words'
                />
              </View>
            </View>

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <View style={styles.inputWrapper}>
                <Ionicons
                  name='mail-outline'
                  size={20}
                  color={theme.color.gray}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder='Nhập email của bạn'
                  placeholderTextColor={theme.color.gray}
                  value={formData.email}
                  onChangeText={(text) => handleInputChange("email", text)}
                  keyboardType='email-address'
                  autoCapitalize='none'
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Phone Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Số điện thoại</Text>
              <View style={styles.inputWrapper}>
                <Ionicons
                  name='call-outline'
                  size={20}
                  color={theme.color.gray}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder='Nhập số điện thoại'
                  placeholderTextColor={theme.color.gray}
                  value={formData.phone}
                  onChangeText={(text) => handleInputChange("phone", text)}
                  keyboardType='phone-pad'
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Mật khẩu</Text>
              <View style={styles.inputWrapper}>
                <Ionicons
                  name='lock-closed-outline'
                  size={20}
                  color={theme.color.gray}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.textInput, styles.passwordInput]}
                  placeholder='Nhập mật khẩu'
                  placeholderTextColor={theme.color.gray}
                  value={formData.password}
                  onChangeText={(text) => handleInputChange("password", text)}
                  secureTextEntry={!showPassword}
                  autoCapitalize='none'
                  autoCorrect={false}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    color={theme.color.gray}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Confirm Password Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Xác nhận mật khẩu</Text>
              <View style={styles.inputWrapper}>
                <Ionicons
                  name='lock-closed-outline'
                  size={20}
                  color={theme.color.gray}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.textInput, styles.passwordInput]}
                  placeholder='Nhập lại mật khẩu'
                  placeholderTextColor={theme.color.gray}
                  value={formData.confirmPassword}
                  onChangeText={(text) =>
                    handleInputChange("confirmPassword", text)
                  }
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize='none'
                  autoCorrect={false}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Ionicons
                    name={
                      showConfirmPassword ? "eye-outline" : "eye-off-outline"
                    }
                    size={20}
                    color={theme.color.gray}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Register Button */}
            <TouchableOpacity
              style={[
                styles.registerButton,
                registerMutation.isPending && styles.registerButtonDisabled,
              ]}
              onPress={handleRegister}
              disabled={registerMutation.isPending}
            >
              <Text style={styles.registerButtonText}>
                {registerMutation.isPending ? "Đang đăng ký..." : "Đăng ký"}
              </Text>
            </TouchableOpacity>

            {/* Login Link */}
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Đã có tài khoản? </Text>
              <TouchableOpacity onPress={handleBackToLogin}>
                <Text style={styles.loginLink}>Đăng nhập ngay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.white,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.color.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: theme.color.dark,
  },
  placeholder: {
    width: 40,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 150,
    height: 60,
  },
  welcomeContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.color.dark,
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: theme.color.gray,
    textAlign: "center",
    lineHeight: 20,
  },
  formContainer: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.color.dark,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.color.lightGray,
    borderRadius: 12,
    backgroundColor: theme.color.white,
    paddingHorizontal: 16,
    height: 52,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: theme.color.dark,
    paddingVertical: 0,
  },
  passwordInput: {
    paddingRight: 40,
  },
  eyeIcon: {
    position: "absolute",
    right: 16,
    padding: 4,
  },
  registerButton: {
    backgroundColor: theme.color.primary,
    borderRadius: 12,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 24,
  },
  registerButtonDisabled: {
    opacity: 0.6,
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.color.white,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  loginText: {
    fontSize: 14,
    color: theme.color.gray,
  },
  loginLink: {
    fontSize: 14,
    color: theme.color.primary,
    fontWeight: "600",
  },
});

export default RegisterPage;
