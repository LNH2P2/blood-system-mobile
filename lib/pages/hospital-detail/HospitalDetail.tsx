import { useHospital } from "@/lib/hooks/api/useHospitals";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function HospitalDetailScreen() {
  const params = useLocalSearchParams();
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [distance, setDistance] = useState<number | null>(null);

  const { hospitalId } = params;
  const { data: hospitalResponse, isLoading: loading } = useHospital(
    hospitalId as string
  );

  const hospital = hospitalResponse?.data;
  useEffect(() => {
    if (hospitalId) {
      getUserLocation();
    }
  }, [hospitalId]);

  const getUserLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Quyền truy cập vị trí",
          "Ứng dụng cần quyền truy cập vị trí để tính khoảng cách đến bệnh viện."
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  useEffect(() => {
    if (hospital && userLocation) {
      const dist = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        hospital.coordinates.latitude,
        hospital.coordinates.longitude
      );
      setDistance(dist);
    }
  }, [hospital, userLocation]);

  const handleCall = () => {
    if (hospital?.contactInfo.phone) {
      Linking.openURL(`tel:${hospital.contactInfo.phone}`);
    }
  };

  const handleDirections = () => {
    if (hospital) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${hospital.coordinates.latitude},${hospital.coordinates.longitude}`;
      Linking.openURL(url);
    }
  };

  const renderBloodInventory = () => {
    if (!hospital?.bloodInventory.length) return null;

    const validInventory = hospital.bloodInventory.filter(
      (inv) => inv.quantity > 0 && new Date(inv.expiresAt) > new Date()
    );

    if (validInventory.length === 0) {
      return (
        <View style={styles.bloodSection}>
          <Text style={styles.sectionTitle}>Kho Máu</Text>
          <Text style={styles.noBloodText}>
            Hiện tại không có máu trong kho
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.bloodSection}>
        <Text style={styles.sectionTitle}>Kho Máu</Text>
        <View style={styles.bloodGrid}>
          {validInventory.map((item, index) => (
            <View key={index} style={styles.bloodItem}>
              <View style={styles.bloodHeader}>
                <Text style={styles.bloodType}>{item.bloodType}</Text>
                <Text style={styles.bloodQuantity}>{item.quantity} đơn vị</Text>
              </View>
              <Text style={styles.bloodComponent}>
                {item.component === "whole_blood" && "Máu toàn phần"}
                {item.component === "red_cells" && "Hồng cầu"}
                {item.component === "platelets" && "Tiểu cầu"}
                {item.component === "plasma" && "Huyết tương"}
              </Text>
              <Text style={styles.bloodExpiry}>
                HSD: {new Date(item.expiresAt).toLocaleDateString("vi-VN")}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#DC2626" />
        <Text style={styles.loadingText}>Đang tải thông tin bệnh viện...</Text>
      </View>
    );
  }

  if (!hospital) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle" size={64} color="#DC2626" />
        <Text style={styles.errorText}>Không tìm thấy thông tin bệnh viện</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Map Section */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: hospital.coordinates.latitude,
            longitude: hospital.coordinates.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={hospital.coordinates}
            title={hospital.name}
            description={hospital.address}
          >
            <View style={styles.markerContainer}>
              <Ionicons name="medical" size={24} color="white" />
            </View>
          </Marker>
          {userLocation && (
            <Marker coordinate={userLocation} title="Vị trí của bạn">
              <View style={styles.userMarker}>
                <Ionicons name="person" size={16} color="white" />
              </View>
            </Marker>
          )}
        </MapView>
        {distance && (
          <View style={styles.distanceOverlay}>
            <Ionicons name="location" size={16} color="#DC2626" />
            <Text style={styles.distanceText}>
              Cách {distance.toFixed(1)} km
            </Text>
          </View>
        )}
      </View>

      {/* Hospital Info */}
      <View style={styles.content}>
        <View style={styles.hospitalHeader}>
          <Text style={styles.hospitalName}>{hospital.name}</Text>
          <Text style={styles.hospitalAddress}>{hospital.address}</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={handleCall}>
            <Ionicons name="call" size={20} color="white" />
            <Text style={styles.actionButtonText}>Gọi điện</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleDirections}
          >
            <Ionicons name="navigate" size={20} color="white" />
            <Text style={styles.actionButtonText}>Chỉ đường</Text>
          </TouchableOpacity>
        </View>

        {/* Basic Info */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Thông Tin Cơ Bản</Text>

          <View style={styles.infoRow}>
            <Ionicons name="time" size={20} color="#666" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Giờ hoạt động</Text>
              <Text style={styles.infoValue}>{hospital.operatingHours}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="call" size={20} color="#666" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Điện thoại</Text>
              <Text style={styles.infoValue}>{hospital.contactInfo.phone}</Text>
            </View>
          </View>

          {hospital.contactInfo.email && (
            <View style={styles.infoRow}>
              <Ionicons name="mail" size={20} color="#666" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoValue}>
                  {hospital.contactInfo.email}
                </Text>
              </View>
            </View>
          )}

          <View style={styles.infoRow}>
            <Ionicons name="medical" size={20} color="#666" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Cấp cứu</Text>
              <Text style={styles.infoValue}>{hospital.emergencyContact}</Text>
            </View>
          </View>
        </View>

        {/* Services */}
        <View style={styles.servicesSection}>
          <Text style={styles.sectionTitle}>Dịch Vụ</Text>
          <View style={styles.servicesGrid}>
            {hospital.services.map((service, index) => (
              <View key={index} style={styles.serviceItem}>
                <Ionicons name="checkmark-circle" size={16} color="#10b981" />
                <Text style={styles.serviceText}>{service}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Blood Inventory */}
        {renderBloodInventory()}

        {/* Description */}
        {hospital.description && (
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Mô Tả</Text>
            <Text style={styles.descriptionText}>{hospital.description}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  errorText: {
    fontSize: 18,
    color: "#666",
    marginTop: 16,
    textAlign: "center",
  },
  mapContainer: {
    height: 250,
    position: "relative",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  markerContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#DC2626",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "white",
  },
  userMarker: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#2563eb",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  distanceOverlay: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  distanceText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  content: {
    padding: 16,
  },
  hospitalHeader: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  hospitalName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  hospitalAddress: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    backgroundColor: "#DC2626",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
  },
  actionButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
  infoSection: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  servicesSection: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  servicesGrid: {
    gap: 12,
  },
  serviceItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  serviceText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 8,
  },
  bloodSection: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bloodGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  bloodItem: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: "#fef2f2",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#fee2e2",
  },
  bloodHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  bloodType: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#DC2626",
  },
  bloodQuantity: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  bloodComponent: {
    fontSize: 12,
    color: "#666",
    marginBottom: 2,
  },
  bloodExpiry: {
    fontSize: 11,
    color: "#999",
  },
  noBloodText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    fontStyle: "italic",
  },
  descriptionSection: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  descriptionText: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
  },
});
