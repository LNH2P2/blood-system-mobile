import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { theme } from "../theme";

const AuthLoadingScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color={theme.color.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.color.white,
  },
});

export default AuthLoadingScreen;
