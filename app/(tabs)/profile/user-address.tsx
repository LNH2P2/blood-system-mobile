import LoadingOverlay from "@/lib/components/Loading";
import {
  useCreateAddress,
  useDeleteAddress,
  useUpdateAddress,
} from "@/lib/hooks/api/useAddress";

import { theme } from "@/lib/theme";
import { UserCUAddress } from "@/lib/types/user";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface UserAddress {
  _id?: string; // ID của địa chỉ
  userId?: string; // ID của người dùng (nếu cần gửi lên server)
  street: string;
  district: string;
  city: string;
  nation: string;
}

export default function UserAddressPage() {
  const router = useRouter()
  const { userAddress } = useLocalSearchParams();
  const createAddress = useCreateAddress();
  const updateAddress = useUpdateAddress();
  const deleteAddress = useDeleteAddress();

  const [userId, setUserId] = useState<string | null>(null);
  const [addressList, setAddressList] = useState<UserAddress[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [formData, setFormData] = useState<UserAddress>({
    _id: "",
    userId: "", // nếu cần gửi ID người dùng
    street: "",
    district: "",
    city: "",
    nation: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof UserAddress, string>>
  >({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (userAddress) {
      try {
        const parsed = JSON.parse(userAddress as string);
        setAddressList(parsed.address || []);
        setUserId(parsed._id || null);
        setFormData((prev) => ({
          ...prev,
          userId: parsed._id,
        }));
      } catch (e) {
        console.error("Failed to parse address:", e);
      }
    }
  }, [userAddress]);

  const openModal = (index: number | null) => {
    if (index !== null) {
      setFormData(addressList[index]);
      setMode("edit");
    } else {
      setFormData((prev) => ({
        street: "",
        district: "",
        city: "",
        nation: "",
        userId: prev.userId, // giữ lại userId
      }));
      setMode("create");
    }
    setEditingIndex(index); // có thể giữ nếu cần dùng key
    setErrors({});
    setModalVisible(true);
  };

  const validate = (data: UserAddress) => {
    const newErrors: typeof errors = {};
    if (!data.street) newErrors.street = "Bắt buộc";
    if (!data.district) newErrors.district = "Bắt buộc";
    if (!data.city) newErrors.city = "Bắt buộc";
    if (!data.nation) newErrors.nation = "Bắt buộc";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateAddress = async () => {
    if (!validate(formData)) return;
    setIsLoading(true);
    try {
      await createAddress.mutateAsync(formData);
      alert("Thêm địa chỉ thành công");
      setModalVisible(false);
      router.back();
    } catch (error) {
      alert("Lỗi khi thêm địa chỉ");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateAddress = async () => {
    if (!validate(formData)) return;
    setIsLoading(true);
    try {
      const fullData: UserCUAddress = {
        addressId: formData._id || "",
        userId: userId || "",
        street: formData.street,
        district: formData.district,
        city: formData.city,
        nation: formData.nation,
      };
      await updateAddress.mutateAsync(fullData);
      alert("Cập nhật thành công");
      setModalVisible(false);
      router.back();
    } catch (error) {
      alert("Lỗi khi cập nhật địa chỉ");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    if (mode === "edit") {
      handleUpdateAddress();
    } else {
      handleCreateAddress();
    }
  };

  const handleDelete = (index: number) => {
    const address = addressList[index];
    if (!address._id) return;

    const fullAddress: UserCUAddress = {
      addressId: address._id,
      userId: userId || "",
      street: address.street,
      district: address.district,
      city: address.city,
      nation: address.nation,
    };
    Alert.alert("Xác nhận", "Bạn có chắc chắn muốn xóa địa chỉ này?", [
      { text: "Hủy" },
      {
        text: "Xoá",
        style: "destructive",
        onPress: async () => {
          try {
            setIsLoading(true);
            await deleteAddress.mutateAsync(fullAddress);
            alert("Đã xóa địa chỉ");
            router.back();
          } catch {
            alert("Lỗi khi xóa địa chỉ");
          } finally {
            setIsLoading(false);
          }
        },
      },
    ]);
  };

  const renderInput = (label: string, field: keyof UserAddress) => (
    <View style={{ marginBottom: 12 }}>
      <Text>{label}</Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: theme.color.darkGray,
          borderRadius: 6,
          padding: 8,
          marginTop: 4,
        }}
        value={formData[field]}
        onChangeText={(text) => setFormData({ ...formData, [field]: text })}
        placeholder={`Nhập ${label.toLowerCase()}`}
      />
      {errors[field] && <Text style={{ color: "red" }}>{errors[field]}</Text>}
    </View>
  );

  if (isLoading) return <LoadingOverlay visible />;

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 80 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 12 }}>
          Danh sách địa chỉ
        </Text>

        {addressList.map((address, index) => (
          <View
            key={index}
            style={{
              padding: 12,
              borderWidth: 1,
              borderColor: theme.color.darkGray,
              borderRadius: 6,
              marginBottom: 8,
            }}
          >
            <Text>
              {`${address.street}, ${address.district}, ${address.city}, ${address.nation}`}
            </Text>
            <View style={{ flexDirection: "row", marginTop: 8 }}>
              <TouchableOpacity
                style={{ marginRight: 12 }}
                onPress={() => openModal(index)}
              >
                <Text style={{ color: theme.color.primary }}>Chỉnh sửa</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(index)}>
                <Text style={{ color: "red" }}>Xoá</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Fixed Add Button */}
      <TouchableOpacity
        onPress={() => openModal(null)}
        style={{
          position: "absolute",
          right: 20,
          bottom: 20,
          backgroundColor: theme.color.primary,
          padding: 14,
          borderRadius: 50,
          elevation: 5,
        }}
      >
        <Text style={{ color: theme.color.white, fontWeight: "bold" }}>+</Text>
      </TouchableOpacity>

      {/* Modal for editing/creating address */}
      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.3)",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 8,
              padding: 20,
            }}
          >
            <Text
              style={{ fontSize: 18, fontWeight: "bold", marginBottom: 12 }}
            >
              {mode === "edit" ? "Chỉnh sửa địa chỉ" : "Thêm địa chỉ"}
            </Text>

            {renderInput("Đường / số nhà", "street")}
            {renderInput("Quận / Huyện", "district")}
            {renderInput("Tỉnh / Thành phố", "city")}
            {renderInput("Quốc gia", "nation")}

            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{ marginRight: 16 }}
              >
                <Text>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSave}>
                <Text
                  style={{ color: theme.color.primary, fontWeight: "bold" }}
                >
                  Lưu
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {isLoading && <LoadingOverlay visible />}
    </View>
  );
}
