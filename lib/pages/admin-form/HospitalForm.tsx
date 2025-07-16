import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import MapPicker from "@/components/MapPicker";
import {
  useCreateHospital,
  useUpdateHospital,
} from "@/lib/hooks/api/useHospitals";
import {
  useDistricts,
  useProvinces,
  useWards,
} from "@/lib/hooks/api/useProvinces";
import { CreateHospitalData, MedicalFacility } from "@/lib/types/hospital";
import RNPickerSelect from "react-native-picker-select";
interface FormData extends CreateHospitalData {
  _id?: string;
}

export default function HospitalForm() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const mode = useMemo(() => params.mode || "create", [params.mode]);
  const hospitalData = useMemo(() => {
    if (params.hospitalData) {
      return JSON.parse(params.hospitalData as string) as MedicalFacility;
    }
    return null;
  }, [params.hospitalData]);

  const createMutation = useCreateHospital();
  const updateMutation = useUpdateHospital();

  const [showMapPicker, setShowMapPicker] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    address: "",
    province: "",
    district: "",
    ward: "",
    contactInfo: {
      phone: "",
      email: "",
    },
    operatingHours: "",
    services: [],
    emergencyContact: "",
    description: "",
    coordinates: {
      latitude: 10.8231,
      longitude: 106.6297,
    },
    licenseNumber: "",
    establishedDate: "",
    isActive: true,
  });

  const [serviceInput, setServiceInput] = useState("");
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
    const selectedProvinceData = provinces.find((p) => p.code === value);
    updateFormData("province", selectedProvinceData?.name);

    setSelectedDistrict("");
    setSelectedWard("");
  };

  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(value);

    const selectedDistrictData = districts.find((d) => d.code === value);
    updateFormData("district", selectedDistrictData?.name);
    // Reset ward selection when district changes
    setSelectedWard("");
  };

  const handleWardChange = (value: string) => {
    setSelectedWard(value);
    const selectedWardData = wards.find((w) => w.code === value);
    updateFormData("ward", selectedWardData?.name);
  };

  // Chỉ thiết lập form data, không liên quan đến dropdown
  useEffect(() => {
    if (mode === "edit" && hospitalData) {
      console.log("Editing hospital data:", hospitalData);
      setFormData({
        _id: hospitalData._id,
        name: hospitalData.name,
        address: hospitalData.address,
        province: hospitalData.province,
        district: hospitalData.district,
        ward: hospitalData.ward,
        contactInfo: hospitalData.contactInfo,
        operatingHours: hospitalData.operatingHours,
        services: hospitalData.services,
        emergencyContact: hospitalData.emergencyContact,
        description: hospitalData.description || "",
        coordinates: hospitalData.coordinates,
        licenseNumber: hospitalData.licenseNumber || "",
        establishedDate: hospitalData.establishedDate
          ? new Date(hospitalData.establishedDate).toISOString().split("T")[0]
          : "",
        isActive: hospitalData.isActive,
      });
    }
  }, [mode, hospitalData]);

  // Xử lý việc chọn tỉnh/thành phố khi provinces đã được tải
  useEffect(() => {
    if (mode === "edit" && hospitalData) {
      console.log("Hospital data for province selection:", hospitalData);
      if (provinces.length === 0) {
        // Nếu chưa có provinces, gọi API để lấy
        refetchProvinces();
        return;
      }

      const foundProvince = provinces.find(
        (p) => p.name === hospitalData.province
      );
      if (foundProvince) {
        setSelectedProvince(foundProvince.code);
      }
    }
  }, [mode, hospitalData, provinces, refetchProvinces]);

  // Xử lý việc chọn quận/huyện khi districts đã được tải
  useEffect(() => {
    if (
      mode === "edit" &&
      hospitalData &&
      districts.length > 0 &&
      selectedProvince // Chỉ chạy khi đã chọn province
    ) {
      console.log("Hospital data for district selection:", hospitalData);
      const foundDistrict = districts.find(
        (d) => d.name === hospitalData.district
      );
      if (foundDistrict) {
        setSelectedDistrict(foundDistrict.code);
      }
    }
  }, [mode, hospitalData, districts, selectedProvince]);

  // Xử lý việc chọn phường/xã khi wards đã được tải
  useEffect(() => {
    if (
      mode === "edit" &&
      hospitalData &&
      wards.length > 0 &&
      selectedDistrict // Chỉ chạy khi đã chọn district
    ) {
      console.log("Hospital data for ward selection:", hospitalData);
      const foundWard = wards.find((w) => w.name === hospitalData.ward);
      if (foundWard) {
        setSelectedWard(foundWard.code);
      }
    }
  }, [mode, hospitalData, wards, selectedDistrict]);

  const updateFormData = (field: string, value: any) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...((prev[parent as keyof FormData] as Record<string, any>) || {}),
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const addService = () => {
    if (serviceInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        services: [...prev.services, serviceInput.trim()],
      }));
      setServiceInput("");
    }
  };

  const removeService = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index),
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập tên bệnh viện");
      return false;
    }
    if (!formData.address.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập địa chỉ");
      return false;
    }
    if (!formData.province.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập tỉnh/thành phố");
      return false;
    }
    if (!formData.district.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập quận/huyện");
      return false;
    }
    if (!formData.ward.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập phường/xã");
      return false;
    }
    if (!formData.contactInfo.phone.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập số điện thoại");
      return false;
    }
    if (!formData.emergencyContact.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập số điện thoại cấp cứu");
      return false;
    }
    if (!formData.operatingHours.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập giờ hoạt động");
      return false;
    }
    if (formData.services.length === 0) {
      Alert.alert("Lỗi", "Vui lòng thêm ít nhất một dịch vụ");
      return false;
    }
    if (formData.description && formData.description.length < 10) {
      Alert.alert("Lỗi", "Mô tả bệnh viện phải có ít nhất 10 ký tự");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    const submitData: CreateHospitalData = {
      name: formData.name,
      address: formData.address,
      province: formData.province,
      district: formData.district,
      ward: formData.ward,
      contactInfo: formData.contactInfo,
      operatingHours: formData.operatingHours,
      services: formData.services,
      emergencyContact: formData.emergencyContact,
      description: formData.description,
      coordinates: formData.coordinates,
      licenseNumber: formData.licenseNumber,
      establishedDate: formData.establishedDate || undefined,
      isActive: formData.isActive,
    };

    try {
      if (mode === "create") {
        await createMutation.mutateAsync(submitData);
        Alert.alert("Thành công", "Đã tạo bệnh viện mới", [
          { text: "OK", onPress: () => router.back() },
        ]);
      } else {
        await updateMutation.mutateAsync({
          id: formData._id!,
          data: submitData,
        });
        Alert.alert("Thành công", "Đã cập nhật bệnh viện", [
          { text: "OK", onPress: () => router.back() },
        ]);
      }
    } catch (error) {
      console.error("Error saving hospital:", error);
      Alert.alert("Lỗi", "Có lỗi xảy ra khi lưu dữ liệu");
    }
  };

  const handleLocationSelect = (coordinates: {
    latitude: number;
    longitude: number;
  }) => {
    updateFormData("coordinates", coordinates);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.form}>
          {/* Basic Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thông tin cơ bản</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Tên bệnh viện *</Text>
              <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(value) => updateFormData("name", value)}
                placeholder="Nhập tên bệnh viện"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Địa chỉ *</Text>
              <TextInput
                style={styles.input}
                value={formData.address}
                onChangeText={(value) => updateFormData("address", value)}
                placeholder="Nhập địa chỉ"
                multiline
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1 }]}>
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
              <View style={[styles.inputGroup, { flex: 1, marginLeft: 12 }]}>
                <Text style={styles.label}>Quận/Huyện *</Text>
                <View style={styles.pickerContainer}>
                  {loadingDistricts ? (
                    <View style={styles.loadingPicker}>
                      <ActivityIndicator size="small" color="#DC2626" />
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
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phường/Xã *</Text>
              <View style={styles.pickerContainer}>
                {loadingWards ? (
                  <View style={styles.loadingPicker}>
                    <ActivityIndicator size="small" color="#DC2626" />
                    <Text style={styles.loadingPickerText}>Đang tải...</Text>
                  </View>
                ) : (
                  <RNPickerSelect
                    onValueChange={handleWardChange}
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

          {/* Contact Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thông tin liên hệ</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Số điện thoại *</Text>
              <TextInput
                style={styles.input}
                value={formData.contactInfo.phone}
                onChangeText={(value) =>
                  updateFormData("contactInfo.phone", value)
                }
                placeholder="0123456789"
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={formData.contactInfo.email}
                onChangeText={(value) =>
                  updateFormData("contactInfo.email", value)
                }
                placeholder="info@hospital.vn"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Số điện thoại cấp cứu *</Text>
              <TextInput
                style={styles.input}
                value={formData.emergencyContact}
                onChangeText={(value) =>
                  updateFormData("emergencyContact", value)
                }
                placeholder="0987654321"
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Location & Coordinates */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Vị trí địa lý</Text>

            <TouchableOpacity
              style={styles.mapButton}
              onPress={() => setShowMapPicker(true)}
            >
              <Ionicons name="location" size={20} color="#DC2626" />
              <Text style={styles.mapButtonText}>Chọn vị trí trên bản đồ</Text>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>

            <View style={styles.coordinatesDisplay}>
              <Text style={styles.coordinatesText}>
                Tọa độ: {formData.coordinates.latitude.toFixed(6)},{" "}
                {formData.coordinates.longitude.toFixed(6)}
              </Text>
            </View>
          </View>

          {/* Operational Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thông tin hoạt động</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Giờ hoạt động *</Text>
              <TextInput
                style={styles.input}
                value={formData.operatingHours}
                onChangeText={(value) =>
                  updateFormData("operatingHours", value)
                }
                placeholder="07:00 - 17:00"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Số giấy phép</Text>
              <TextInput
                style={styles.input}
                value={formData.licenseNumber}
                onChangeText={(value) => updateFormData("licenseNumber", value)}
                placeholder="BYT-12345-2025"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Ngày thành lập</Text>
              <TextInput
                style={styles.input}
                value={formData.establishedDate}
                onChangeText={(value) =>
                  updateFormData("establishedDate", value)
                }
                placeholder="YYYY-MM-DD"
              />
            </View>

            <View style={styles.switchRow}>
              <Text style={styles.label}>Hoạt động</Text>
              <Switch
                value={formData.isActive}
                onValueChange={(value) => updateFormData("isActive", value)}
                trackColor={{ false: "#D1D5DB", true: "#DC2626" }}
                thumbColor={formData.isActive ? "#fff" : "#f4f3f4"}
              />
            </View>
          </View>

          {/* Services */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Dịch vụ *</Text>

            <View style={styles.serviceInputRow}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                value={serviceInput}
                onChangeText={setServiceInput}
                placeholder="Nhập tên dịch vụ"
                onSubmitEditing={addService}
              />
              <TouchableOpacity style={styles.addButton} onPress={addService}>
                <Ionicons name="add" size={20} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={styles.servicesList}>
              {formData.services.map((service, index) => (
                <View key={index} style={styles.serviceItem}>
                  <Text style={styles.serviceText}>{service}</Text>
                  <TouchableOpacity onPress={() => removeService(index)}>
                    <Ionicons name="close-circle" size={20} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Mô tả</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.description}
              onChangeText={(value) => updateFormData("description", value)}
              placeholder="Mô tả về bệnh viện..."
              multiline
              numberOfLines={4}
            />
          </View>
        </View>
      </ScrollView>

      {/* Footer Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => router.back()}
        >
          <Text style={styles.cancelButtonText}>Hủy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSubmit}
          disabled={createMutation.isPending || updateMutation.isPending}
        >
          <Text style={styles.saveButtonText}>
            {createMutation.isPending || updateMutation.isPending
              ? "Đang lưu..."
              : mode === "create"
              ? "Tạo mới"
              : "Cập nhật"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Map Picker Modal */}
      <MapPicker
        visible={showMapPicker}
        onClose={() => setShowMapPicker(false)}
        onLocationSelect={handleLocationSelect}
        initialCoordinates={formData.coordinates}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  scrollView: {
    flex: 1,
  },
  form: {
    padding: 16,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
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
    color: "#111827",
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: "#111827",
    backgroundColor: "#fff",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  row: {
    flexDirection: "row",
  },
  mapButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 16,
    backgroundColor: "#F9FAFB",
  },
  mapButtonText: {
    flex: 1,
    fontSize: 16,
    color: "#374151",
    marginLeft: 8,
  },
  coordinatesDisplay: {
    marginTop: 8,
    padding: 8,
    backgroundColor: "#F3F4F6",
    borderRadius: 6,
  },
  coordinatesText: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  serviceInputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  addButton: {
    backgroundColor: "#DC2626",
    borderRadius: 8,
    padding: 12,
  },
  servicesList: {
    marginTop: 12,
    gap: 8,
  },
  serviceItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  serviceText: {
    flex: 1,
    fontSize: 14,
    color: "#374151",
  },
  footer: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
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
  saveButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#DC2626",
  },
  saveButtonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
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
