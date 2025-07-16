import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
  Dimensions,
} from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";

interface MapPickerProps {
  visible: boolean;
  onClose: () => void;
  onLocationSelect: (coordinates: {
    latitude: number;
    longitude: number;
  }) => void;
  initialCoordinates?: { latitude: number; longitude: number };
}

const { width, height } = Dimensions.get("window");

// Default to Ho Chi Minh City center
const DEFAULT_REGION = {
  latitude: 10.8231,
  longitude: 106.6297,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export default function MapPicker({
  visible,
  onClose,
  onLocationSelect,
  initialCoordinates,
}: MapPickerProps) {
  const [selectedCoordinates, setSelectedCoordinates] = useState(
    initialCoordinates || DEFAULT_REGION
  );
  const [region, setRegion] = useState<Region>(
    initialCoordinates
      ? {
          ...initialCoordinates,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }
      : DEFAULT_REGION
  );

  useEffect(() => {
    if (initialCoordinates) {
      setSelectedCoordinates(initialCoordinates);
      setRegion({
        ...initialCoordinates,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [initialCoordinates]);

  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Lỗi",
          "Cần cấp quyền truy cập vị trí để sử dụng tính năng này"
        );
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      setSelectedCoordinates(coords);
      setRegion({
        ...coords,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } catch (error) {
      Alert.alert("Lỗi", "Không thể lấy vị trí hiện tại");
    }
  };

  const handleMapPress = (event: any) => {
    const { coordinate } = event.nativeEvent;
    setSelectedCoordinates(coordinate);
  };

  const handleConfirm = () => {
    onLocationSelect(selectedCoordinates);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" statusBarTranslucent>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>Chọn vị trí trên bản đồ</Text>
          <TouchableOpacity
            onPress={getCurrentLocation}
            style={styles.locationButton}
          >
            <Ionicons name="location" size={24} color="#DC2626" />
          </TouchableOpacity>
        </View>

        <MapView
          style={styles.map}
          region={region}
          onPress={handleMapPress}
          showsUserLocation
          showsMyLocationButton={false}
        >
          <Marker
            coordinate={selectedCoordinates}
            title="Vị trí đã chọn"
            pinColor="#DC2626"
          />
        </MapView>

        <View style={styles.coordinatesInfo}>
          <Text style={styles.coordinatesText}>
            Tọa độ: {selectedCoordinates.latitude.toFixed(6)},{" "}
            {selectedCoordinates.longitude.toFixed(6)}
          </Text>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Hủy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirm}
          >
            <Text style={styles.confirmButtonText}>Xác nhận</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  closeButton: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  locationButton: {
    padding: 8,
  },
  map: {
    flex: 1,
  },
  coordinatesInfo: {
    padding: 16,
    backgroundColor: "#F9FAFB",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  coordinatesText: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
  },
  footer: {
    flexDirection: "row",
    padding: 16,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#fff",
  },
  cancelButtonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: "#6B7280",
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#DC2626",
  },
  confirmButtonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
