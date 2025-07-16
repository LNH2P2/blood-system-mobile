import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  useAddBloodInventoryItem,
  useBloodInventory,
  useUpdateBloodInventory,
} from "@/lib/hooks/api/useHospitals";
import {
  BloodComponent,
  BloodInventoryItem,
  BloodType,
} from "@/lib/types/hospital";

const BLOOD_TYPES = [
  BloodType.A_POSITIVE,
  BloodType.A_NEGATIVE,
  BloodType.B_POSITIVE,
  BloodType.B_NEGATIVE,
  BloodType.AB_POSITIVE,
  BloodType.AB_NEGATIVE,
  BloodType.O_POSITIVE,
  BloodType.O_NEGATIVE,
];

const BLOOD_COMPONENTS = [
  { key: BloodComponent.WHOLE_BLOOD, label: "Máu toàn phần" },
  { key: BloodComponent.RED_CELLS, label: "Hồng cầu" },
  { key: BloodComponent.PLATELETS, label: "Tiểu cầu" },
  { key: BloodComponent.PLASMA, label: "Huyết tương" },
];

export default function BloodInventoryManagement() {
  const { hospitalId } = useLocalSearchParams();

  const { data: inventoryResponse, isLoading } = useBloodInventory(
    hospitalId as string
  );
  const updateInventoryMutation = useUpdateBloodInventory();
  const addItemMutation = useAddBloodInventoryItem();

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<BloodInventoryItem | null>(
    null
  );
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [formData, setFormData] = useState({
    bloodType: BloodType.A_POSITIVE,
    component: BloodComponent.WHOLE_BLOOD,
    quantity: "",
    expiresAt: new Date(),
  });

  const hospitalData = inventoryResponse?.data;
  const bloodInventory = hospitalData?.bloodInventory || [];

  const resetForm = () => {
    setFormData({
      bloodType: BloodType.A_POSITIVE,
      component: BloodComponent.WHOLE_BLOOD,
      quantity: "",
      expiresAt: new Date(),
    });
    setEditingItem(null);
  };

  const handleAddItem = () => {
    resetForm();
    setShowAddModal(true);
  };

  const handleEditItem = (item: BloodInventoryItem) => {
    setFormData({
      bloodType: item.bloodType,
      component: item.component,
      quantity: item.quantity.toString(),
      expiresAt: new Date(item.expiresAt),
    });
    setEditingItem(item);
    setShowAddModal(true);
  };

  const handleDeleteItem = (item: BloodInventoryItem) => {
    Alert.alert(
      "Xác nhận xóa",
      `Bạn có chắc chắn muốn xóa ${item.bloodType} - ${getComponentLabel(
        item.component
      )}?`,
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: () => {
            const updatedInventory = bloodInventory.filter(
              (inv) => inv._id !== item._id
            );
            updateInventoryMutation.mutate({
              id: hospitalId as string,
              bloodInventory: updatedInventory,
            });
          },
        },
      ]
    );
  };

  const handleSaveItem = () => {
    if (!formData.quantity || isNaN(Number(formData.quantity))) {
      Alert.alert("Lỗi", "Vui lòng nhập số lượng hợp lệ");
      return;
    }

    const quantity = Number(formData.quantity);
    if (quantity <= 0) {
      Alert.alert("Lỗi", "Số lượng phải lớn hơn 0");
      return;
    }

    const itemData = {
      bloodType: formData.bloodType,
      component: formData.component,
      quantity,
      expiresAt: formData.expiresAt.toISOString(),
    };

    if (editingItem) {
      // Update existing item
      const updatedInventory = bloodInventory.map((item) =>
        item._id === editingItem._id ? { ...item, ...itemData } : item
      );
      updateInventoryMutation.mutate({
        id: hospitalId as string,
        bloodInventory: updatedInventory,
      });
    } else {
      // Add new item
      addItemMutation.mutate({
        id: hospitalId as string,
        item: itemData,
      });
    }

    setShowAddModal(false);
    resetForm();
  };

  const getComponentLabel = (component: BloodComponent) => {
    return (
      BLOOD_COMPONENTS.find((c) => c.key === component)?.label || component
    );
  };

  const getExpiryStatus = (expiresAt: string) => {
    const expiryDate = new Date(expiresAt);
    const now = new Date();
    const daysUntilExpiry = Math.ceil(
      (expiryDate.getTime() - now.getTime()) / (1000 * 3600 * 24)
    );

    if (daysUntilExpiry < 0) {
      return { status: "expired", color: "#EF4444", text: "Đã hết hạn" };
    } else if (daysUntilExpiry <= 7) {
      return {
        status: "expiring",
        color: "#F59E0B",
        text: `${daysUntilExpiry} ngày`,
      };
    } else {
      return {
        status: "good",
        color: "#10B981",
        text: `${daysUntilExpiry} ngày`,
      };
    }
  };

  const renderInventoryItem = ({ item }: { item: BloodInventoryItem }) => {
    const expiryStatus = getExpiryStatus(item.expiresAt);

    return (
      <View style={styles.inventoryItem}>
        <View style={styles.itemHeader}>
          <View style={styles.bloodTypeTag}>
            <Text style={styles.bloodTypeText}>{item.bloodType}</Text>
          </View>
          <View style={styles.itemActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleEditItem(item)}
            >
              <Ionicons name="create" size={18} color="#3B82F6" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleDeleteItem(item)}
            >
              <Ionicons name="trash" size={18} color="#EF4444" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.itemInfo}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Thành phần:</Text>
            <Text style={styles.infoValue}>
              {getComponentLabel(item.component)}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Số lượng:</Text>
            <Text style={styles.infoValue}>{item.quantity} đơn vị</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Hết hạn:</Text>
            <Text style={[styles.infoValue, { color: expiryStatus.color }]}>
              {new Date(item.expiresAt).toLocaleDateString("vi-VN")} (
              {expiryStatus.text})
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderAddModal = () => (
    <Modal visible={showAddModal} animationType="slide" statusBarTranslucent>
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={() => setShowAddModal(false)}>
            <Ionicons name="close" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>
            {editingItem ? "Sửa mục kho máu" : "Thêm mục kho máu"}
          </Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.modalContent}>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Nhóm máu</Text>
            <View style={styles.optionsGrid}>
              {BLOOD_TYPES.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.option,
                    formData.bloodType === type && styles.optionActive,
                  ]}
                  onPress={() =>
                    setFormData((prev) => ({ ...prev, bloodType: type }))
                  }
                >
                  <Text
                    style={[
                      styles.optionText,
                      formData.bloodType === type && styles.optionTextActive,
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Thành phần máu</Text>
            <View style={styles.optionsColumn}>
              {BLOOD_COMPONENTS.map((component) => (
                <TouchableOpacity
                  key={component.key}
                  style={[
                    styles.option,
                    formData.component === component.key && styles.optionActive,
                  ]}
                  onPress={() =>
                    setFormData((prev) => ({
                      ...prev,
                      component: component.key,
                    }))
                  }
                >
                  <Text
                    style={[
                      styles.optionText,
                      formData.component === component.key &&
                        styles.optionTextActive,
                    ]}
                  >
                    {component.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Số lượng (đơn vị)</Text>
            <TextInput
              style={styles.input}
              value={formData.quantity}
              onChangeText={(value) =>
                setFormData((prev) => ({ ...prev, quantity: value }))
              }
              placeholder="Nhập số lượng"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Ngày hết hạn</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.dateButtonText}>
                {formData.expiresAt.toLocaleDateString("vi-VN")}
              </Text>
              <Ionicons name="calendar" size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.modalFooter}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setShowAddModal(false)}
          >
            <Text style={styles.cancelButtonText}>Hủy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveItem}>
            <Text style={styles.saveButtonText}>
              {editingItem ? "Cập nhật" : "Thêm mới"}
            </Text>
          </TouchableOpacity>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={formData.expiresAt}
            mode="date"
            minimumDate={new Date()}
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setFormData((prev) => ({ ...prev, expiresAt: selectedDate }));
              }
            }}
          />
        )}
      </View>
    </Modal>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Đang tải...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.hospitalName}>{hospitalData?.name}</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>
          Tổng số: {bloodInventory.length} mục trong kho
        </Text>
      </View>

      {bloodInventory.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="medical-outline" size={64} color="#ccc" />
          <Text style={styles.emptyText}>Chưa có mục nào trong kho máu</Text>
          <TouchableOpacity style={styles.emptyButton} onPress={handleAddItem}>
            <Text style={styles.emptyButtonText}>Thêm mục đầu tiên</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={bloodInventory}
          renderItem={renderInventoryItem}
          keyExtractor={(item) =>
            item._id || `${item.bloodType}-${item.component}`
          }
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {renderAddModal()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  hospitalName: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    color: "#6B7280",
    marginTop: 16,
    marginBottom: 24,
  },
  emptyButton: {
    backgroundColor: "#DC2626",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  listContent: {
    padding: 16,
  },
  inventoryItem: {
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
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  bloodTypeTag: {
    backgroundColor: "#DC2626",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  bloodTypeText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  itemActions: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    padding: 8,
  },
  itemInfo: {
    gap: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 14,
    color: "#6B7280",
  },
  infoValue: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "500",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  formGroup: {
    marginBottom: 24,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 12,
  },
  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  optionsColumn: {
    gap: 8,
  },
  option: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#fff",
  },
  optionActive: {
    borderColor: "#DC2626",
    backgroundColor: "#FEF2F2",
  },
  optionText: {
    fontSize: 14,
    color: "#374151",
    textAlign: "center",
  },
  optionTextActive: {
    color: "#DC2626",
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: "#111827",
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  dateButtonText: {
    fontSize: 16,
    color: "#111827",
  },
  modalFooter: {
    flexDirection: "row",
    padding: 16,
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
});
