import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useDeleteHospital, useHospitals } from "@/lib/hooks/api/useHospitals";
import { MedicalFacility } from "@/lib/types/hospital";

// Custom hook for debouncing
function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  // Debounce search text to prevent excessive API calls
  const debouncedSearchText = useDebounce(searchText, 500);

  // Memoize search params to prevent unnecessary re-renders
  const searchParams = useMemo(
    () => ({
      search: debouncedSearchText || undefined,
      limit: 50, // Load more for admin
    }),
    [debouncedSearchText]
  );

  const {
    data: hospitalsResponse,
    isLoading,
    refetch,
  } = useHospitals(searchParams);

  const deleteHospitalMutation = useDeleteHospital();

  const hospitals = hospitalsResponse?.data || [];

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleCreateHospital = () => {
    router.push({
      pathname: "/(admin)/hospital-form" as any,
      params: { mode: "create" },
    });
  };

  const handleEditHospital = (hospital: MedicalFacility) => {
    router.push({
      pathname: "/(admin)/hospital-form" as any,
      params: {
        mode: "edit",
        hospitalId: hospital._id,
        hospitalData: JSON.stringify(hospital),
      },
    });
  };

  const handleDeleteHospital = (hospital: MedicalFacility) => {
    Alert.alert(
      "Xác nhận xóa",
      `Bạn có chắc chắn muốn xóa bệnh viện "${hospital.name}"?`,
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: () => {
            deleteHospitalMutation.mutate(hospital._id, {
              onSuccess: () => {
                Alert.alert("Thành công", "Đã xóa bệnh viện");
              },
              onError: () => {
                Alert.alert("Lỗi", "Không thể xóa bệnh viện");
              },
            });
          },
        },
      ]
    );
  };

  const handleManageBloodInventory = (hospital: MedicalFacility) => {
    router.push({
      pathname: "/(admin)/blood-inventory/[hospitalId]" as any,
      params: { hospitalId: hospital._id },
    });
  };

  const renderHospitalItem = ({
    item: hospital,
  }: {
    item: MedicalFacility;
  }) => (
    <View style={styles.hospitalCard}>
      <View style={styles.hospitalHeader}>
        <View style={styles.hospitalInfo}>
          <Text style={styles.hospitalName} numberOfLines={2}>
            {hospital.name}
          </Text>
          <Text style={styles.hospitalAddress} numberOfLines={1}>
            {hospital.address}
          </Text>
          <Text style={styles.hospitalLocation}>
            {hospital.district}, {hospital.province}
          </Text>
        </View>
        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: hospital.isActive ? "#10B981" : "#EF4444" },
            ]}
          >
            <Text style={styles.statusText}>
              {hospital.isActive ? "Hoạt động" : "Tạm dừng"}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.hospitalDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="call" size={16} color="#6B7280" />
          <Text style={styles.detailText}>{hospital.contactInfo.phone}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="time" size={16} color="#6B7280" />
          <Text style={styles.detailText}>{hospital.operatingHours}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="water" size={16} color="#DC2626" />
          <Text style={styles.detailText}>
            {hospital.bloodInventory?.length || 0} loại máu trong kho
          </Text>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => handleEditHospital(hospital)}
        >
          <Ionicons name="create" size={18} color="#3B82F6" />
          <Text style={[styles.actionButtonText, { color: "#3B82F6" }]}>
            Sửa
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.inventoryButton]}
          onPress={() => handleManageBloodInventory(hospital)}
        >
          <Ionicons name="medical" size={18} color="#10B981" />
          <Text style={[styles.actionButtonText, { color: "#10B981" }]}>
            Kho máu
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDeleteHospital(hospital)}
        >
          <Ionicons name="trash" size={18} color="#EF4444" />
          <Text style={[styles.actionButtonText, { color: "#EF4444" }]}>
            Xóa
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm bệnh viện..."
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleCreateHospital}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>
          Tổng số: {hospitals.length} bệnh viện
        </Text>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text>Đang tải...</Text>
        </View>
      ) : (
        <FlatList
          data={hospitals}
          renderItem={renderHospitalItem}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#374151",
  },
  addButton: {
    backgroundColor: "#DC2626",
    borderRadius: 8,
    padding: 12,
  },
  statsContainer: {
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  statsText: {
    fontSize: 14,
    color: "#6B7280",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContent: {
    padding: 16,
  },
  hospitalCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  hospitalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  hospitalInfo: {
    flex: 1,
    marginRight: 12,
  },
  hospitalName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  hospitalAddress: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 2,
  },
  hospitalLocation: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  statusContainer: {
    alignItems: "flex-end",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
  },
  hospitalDetails: {
    marginBottom: 16,
    gap: 8,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: "#374151",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    gap: 4,
  },
  editButton: {
    borderColor: "#3B82F6",
    backgroundColor: "#EFF6FF",
  },
  inventoryButton: {
    borderColor: "#10B981",
    backgroundColor: "#ECFDF5",
  },
  deleteButton: {
    borderColor: "#EF4444",
    backgroundColor: "#FEF2F2",
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: "600",
  },
});
