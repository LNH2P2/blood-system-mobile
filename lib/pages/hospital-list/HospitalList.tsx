import { hospitalApi } from "@/lib/api/hospitals";
import { MedicalFacility } from "@/lib/types/hospital";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HospitalListScreen() {
  const params = useLocalSearchParams();
  const [hospitals, setHospitals] = useState<MedicalFacility[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [bloodTypeFilter, setBloodTypeFilter] = useState<string>("");
  const [componentFilter, setComponentFilter] = useState<string>("");

  const { province, district, ward } = params;
  const loadHospitals = useCallback(async () => {
    setLoading(true);
    try {
      const data = await hospitalApi.getHospitals({
        province: province as string,
        district: district as string,
        ward: ward as string,
        bloodType: bloodTypeFilter || undefined,
        component: componentFilter || undefined,
      });
      setHospitals(data);
    } catch (error) {
      console.error("Error loading hospitals:", error);
    } finally {
      setLoading(false);
    }
  }, [province, district, ward, bloodTypeFilter, componentFilter]);

  useEffect(() => {
    loadHospitals();
  }, [loadHospitals]);

  const handleHospitalPress = (hospital: MedicalFacility) => {
    router.push({
      pathname: "/(hospital)/hospital-detail",
      params: { hospitalId: hospital.id },
    });
  };

  const getBloodInventoryText = (hospital: MedicalFacility) => {
    const availableTypes = hospital.bloodInventory
      .filter((inv) => inv.quantity > 0 && new Date(inv.expiresAt) > new Date())
      .map((inv) => inv.bloodType);

    if (availableTypes.length === 0) return "Không có máu trong kho";
    if (availableTypes.length <= 3) return availableTypes.join(", ");
    return `${availableTypes.slice(0, 3).join(", ")} +${
      availableTypes.length - 3
    }`;
  };

  const renderHospitalCard = ({ item }: { item: MedicalFacility }) => (
    <TouchableOpacity
      style={styles.hospitalCard}
      onPress={() => handleHospitalPress(item)}
    >
      <View style={styles.hospitalHeader}>
        <View style={styles.hospitalIcon}>
          <Ionicons name="medical" size={24} color="#DC2626" />
        </View>
        <View style={styles.hospitalInfo}>
          <Text style={styles.hospitalName} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={styles.hospitalAddress} numberOfLines={2}>
            {item.address}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#666" />
      </View>

      <View style={styles.hospitalDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="time" size={16} color="#666" />
          <Text style={styles.detailText}>{item.operatingHours}</Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="call" size={16} color="#666" />
          <Text style={styles.detailText}>{item.contactInfo.phone}</Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="water" size={16} color="#DC2626" />
          <Text style={styles.bloodText}>{getBloodInventoryText(item)}</Text>
        </View>
      </View>

      <View style={styles.servicesContainer}>
        {item.services.slice(0, 3).map((service, index) => (
          <View key={index} style={styles.serviceTag}>
            <Text style={styles.serviceText}>{service}</Text>
          </View>
        ))}
        {item.services.length > 3 && (
          <View style={styles.serviceTag}>
            <Text style={styles.serviceText}>+{item.services.length - 3}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderFilters = () => (
    <View style={styles.filtersContainer}>
      <Text style={styles.filtersTitle}>Lọc theo kho máu</Text>

      <View style={styles.filterRow}>
        <Text style={styles.filterLabel}>Nhóm máu:</Text>
        <View style={styles.filterOptions}>
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.filterOption,
                bloodTypeFilter === type && styles.filterOptionActive,
              ]}
              onPress={() =>
                setBloodTypeFilter(bloodTypeFilter === type ? "" : type)
              }
            >
              <Text
                style={[
                  styles.filterOptionText,
                  bloodTypeFilter === type && styles.filterOptionTextActive,
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.filterRow}>
        <Text style={styles.filterLabel}>Thành phần:</Text>
        <View style={styles.filterOptions}>
          {[
            { key: "whole_blood", label: "Máu toàn phần" },
            { key: "red_cells", label: "Hồng cầu" },
            { key: "platelets", label: "Tiểu cầu" },
            { key: "plasma", label: "Huyết tương" },
          ].map((component) => (
            <TouchableOpacity
              key={component.key}
              style={[
                styles.filterOption,
                componentFilter === component.key && styles.filterOptionActive,
              ]}
              onPress={() =>
                setComponentFilter(
                  componentFilter === component.key ? "" : component.key
                )
              }
            >
              <Text
                style={[
                  styles.filterOptionText,
                  componentFilter === component.key &&
                    styles.filterOptionTextActive,
                ]}
              >
                {component.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#DC2626" />
        <Text style={styles.loadingText}>Đang tìm kiếm bệnh viện...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.locationText}>
          {district && province
            ? `${district}, ${province}`
            : "Tất cả địa điểm"}
        </Text>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Ionicons name="filter" size={20} color="#DC2626" />
          <Text style={styles.filterButtonText}>Lọc</Text>
        </TouchableOpacity>
      </View>

      {showFilters && renderFilters()}

      <View style={styles.resultsHeader}>
        <Text style={styles.resultsText}>
          Tìm thấy {hospitals.length} bệnh viện
        </Text>
      </View>

      {hospitals.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="medical-outline" size={64} color="#ccc" />
          <Text style={styles.emptyText}>Không tìm thấy bệnh viện nào</Text>
          <Text style={styles.emptySubtext}>
            Thử thay đổi bộ lọc hoặc tìm kiếm ở khu vực khác
          </Text>
        </View>
      ) : (
        <FlatList
          data={hospitals}
          renderItem={renderHospitalCard}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  locationText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    flex: 1,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#DC2626",
    borderRadius: 6,
  },
  filterButtonText: {
    color: "#DC2626",
    marginLeft: 4,
    fontSize: 14,
  },
  filtersContainer: {
    backgroundColor: "white",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  filtersTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  filterRow: {
    marginBottom: 12,
  },
  filterLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  filterOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  filterOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 16,
    backgroundColor: "#f9f9f9",
  },
  filterOptionActive: {
    backgroundColor: "#DC2626",
    borderColor: "#DC2626",
  },
  filterOptionText: {
    fontSize: 12,
    color: "#666",
  },
  filterOptionTextActive: {
    color: "white",
  },
  resultsHeader: {
    padding: 16,
    backgroundColor: "white",
  },
  resultsText: {
    fontSize: 14,
    color: "#666",
  },
  listContainer: {
    padding: 16,
  },
  hospitalCard: {
    backgroundColor: "white",
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
    alignItems: "flex-start",
    marginBottom: 12,
  },
  hospitalIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fee2e2",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  hospitalInfo: {
    flex: 1,
  },
  hospitalName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  hospitalAddress: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  hospitalDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  detailText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
    flex: 1,
  },
  bloodText: {
    fontSize: 14,
    color: "#DC2626",
    marginLeft: 8,
    flex: 1,
    fontWeight: "500",
  },
  servicesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  serviceTag: {
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  serviceText: {
    fontSize: 12,
    color: "#666",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#666",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    lineHeight: 20,
  },
});
