import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import {
  useDistricts,
  useProvinces,
  useWards,
} from "@/lib/hooks/api/useProvinces";

export default function HospitalSearchScreen() {
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedWard, setSelectedWard] = useState<string>("");

  // Use TanStack Query hooks
  const {
    data: provinces = [],
    isLoading: loadingProvinces,
    error: provincesError,
    refetch: refetchProvinces,
  } = useProvinces();

  const { data: districts = [], isLoading: loadingDistricts } =
    useDistricts(selectedProvince);

  const { data: wards = [], isLoading: loadingWards } =
    useWards(selectedDistrict);
  const handleProvinceChange = (value: string) => {
    setSelectedProvince(value);
    // Reset dependent selections when province changes
    setSelectedDistrict("");
    setSelectedWard("");
  };

  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(value);
    // Reset ward selection when district changes
    setSelectedWard("");
  };

  const handleSearch = () => {
    const selectedProvinceData = provinces.find(
      (p) => p.code === selectedProvince
    );
    const selectedDistrictData = districts.find(
      (d) => d.code === selectedDistrict
    );
    const selectedWardData = wards.find((w) => w.code === selectedWard);

    router.push({
      pathname: "/(hospital)/hospital-list",
      params: {
        province: selectedProvinceData?.name || "",
        district: selectedDistrictData?.name || "",
        ward: selectedWardData?.name || "",
      },
    });
  };

  const canSearch = selectedProvince && selectedDistrict;

  // Loading state for initial provinces load
  if (loadingProvinces) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#DC2626" />
        <Text style={styles.loadingText}>Đang tải danh sách tỉnh thành...</Text>
      </View>
    );
  }

  // Error state for provinces load
  if (provincesError) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name='alert-circle' size={64} color='#DC2626' />
        <Text style={styles.errorText}>
          Không thể tải danh sách tỉnh thành. Vui lòng thử lại.
        </Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => refetchProvinces()}
        >
          <Text style={styles.retryButtonText}>Thử lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Ionicons name='location' size={24} color='#DC2626' />
          <Text style={styles.headerText}>Chọn địa điểm tìm kiếm</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tỉnh/Thành phố *</Text>
            <View style={styles.pickerContainer}>
              <RNPickerSelect
                onValueChange={handleProvinceChange}
                items={provinces.map((province) => ({
                  label: province.name,
                  value: province.code,
                }))}
                placeholder={{
                  label: "Chọn tỉnh/thành phố...",
                  value: "",
                }}
                style={pickerSelectStyles}
                value={selectedProvince}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Quận/Huyện *</Text>
            <View style={styles.pickerContainer}>
              {loadingDistricts ? (
                <View style={styles.loadingPicker}>
                  <ActivityIndicator size='small' color='#DC2626' />
                  <Text style={styles.loadingPickerText}>Đang tải...</Text>
                </View>
              ) : (
                <RNPickerSelect
                  onValueChange={handleDistrictChange}
                  items={districts.map((district) => ({
                    label: district.name,
                    value: district.code,
                  }))}
                  placeholder={{
                    label: selectedProvince
                      ? "Chọn quận/huyện..."
                      : "Vui lòng chọn tỉnh/thành phố trước",
                    value: "",
                  }}
                  style={pickerSelectStyles}
                  value={selectedDistrict}
                  disabled={!selectedProvince}
                />
              )}
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phường/Xã</Text>
            <View style={styles.pickerContainer}>
              {loadingWards ? (
                <View style={styles.loadingPicker}>
                  <ActivityIndicator size='small' color='#DC2626' />
                  <Text style={styles.loadingPickerText}>Đang tải...</Text>
                </View>
              ) : (
                <RNPickerSelect
                  onValueChange={setSelectedWard}
                  items={wards.map((ward) => ({
                    label: ward.name,
                    value: ward.code,
                  }))}
                  placeholder={{
                    label: selectedDistrict
                      ? "Chọn phường/xã..."
                      : "Vui lòng chọn quận/huyện trước",
                    value: "",
                  }}
                  style={pickerSelectStyles}
                  value={selectedWard}
                  disabled={!selectedDistrict}
                />
              )}
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.searchButton,
            !canSearch && styles.searchButtonDisabled,
          ]}
          onPress={handleSearch}
          disabled={!canSearch}
        >
          <Ionicons name='search' size={20} color='white' />
          <Text style={styles.searchButtonText}>Tìm Bệnh Viện</Text>
        </TouchableOpacity>

        <View style={styles.note}>
          <Ionicons name='information-circle' size={16} color='#666' />
          <Text style={styles.noteText}>
            Vui lòng chọn ít nhất tỉnh/thành phố và quận/huyện để tìm kiếm bệnh
            viện.
          </Text>
        </View>
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
    backgroundColor: "#f5f5f5",
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
    backgroundColor: "#f5f5f5",
  },
  errorText: {
    fontSize: 16,
    color: "#EF4444",
    textAlign: "center",
    marginVertical: 16,
  },
  retryButton: {
    backgroundColor: "#DC2626",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginLeft: 10,
  },
  form: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  loadingPicker: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  loadingPickerText: {
    marginLeft: 10,
    color: "#666",
  },
  searchButton: {
    backgroundColor: "#DC2626",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  searchButtonDisabled: {
    backgroundColor: "#ccc",
  },
  searchButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  note: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#f0f9ff",
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#0ea5e9",
  },
  noteText: {
    flex: 1,
    marginLeft: 8,
    color: "#666",
    fontSize: 14,
    lineHeight: 20,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    paddingRight: 30,
    color: "#333",
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    paddingRight: 30,
    color: "#333",
  },
  iconContainer: {
    top: 12,
    right: 12,
  },
});
