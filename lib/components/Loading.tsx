// components/LoadingOverlay.tsx
import React from "react";
import { ActivityIndicator, Modal, StyleSheet, View } from "react-native";
import { theme } from "../theme";

interface LoadingOverlayProps {
  visible: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ visible }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Modal visible={visible} transparent animationType="fade">
        <View style={styles.overlay}>
          <ActivityIndicator
            size="large"
            color={theme.color.primary}
            style={{ height: 20, width: 20 }}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
});

export default LoadingOverlay;
