import { MedicalFacility } from "@/lib/types/hospital";

export const mockHospitals: MedicalFacility[] = [
  {
    id: "1",
    name: "Bệnh viện Chợ Rẫy",
    address: "201B Nguyễn Chí Thanh, Phường 12, Quận 5, TP.HCM",
    province: "Thành phố Hồ Chí Minh",
    district: "Quận 5",
    ward: "Phường 12",
    contactInfo: {
      phone: "028 3855 4269",
      email: "info@choray.vn",
    },
    operatingHours: "24/7",
    services: ["Cấp cứu", "Nội khoa", "Ngoại khoa", "Sản khoa", "Nhi khoa"],
    bloodInventory: [
      {
        bloodType: "O+",
        component: "whole_blood",
        quantity: 50,
        expiresAt: "2025-07-01",
      },
      {
        bloodType: "A+",
        component: "red_cells",
        quantity: 30,
        expiresAt: "2025-06-25",
      },
      {
        bloodType: "B+",
        component: "platelets",
        quantity: 20,
        expiresAt: "2025-06-20",
      },
      {
        bloodType: "AB+",
        component: "plasma",
        quantity: 40,
        expiresAt: "2025-07-15",
      },
    ],
    emergencyContact: "115",
    description:
      "Bệnh viện đa khoa hạng I, là trung tâm y tế tuyến cuối của khu vực phía Nam.",
    imageUrl: "https://example.com/choray.jpg",
    coordinates: { latitude: 10.7537, longitude: 106.6631 },
    isActive: true,
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2025-06-09T00:00:00Z",
  },
  {
    id: "2",
    name: "Bệnh viện Bạch Mai",
    address: "78 Giải Phóng, Phương Mai, Đống Đa, Hà Nội",
    province: "Thành phố Hà Nội",
    district: "Quận Đống Đa",
    ward: "Phường Phương Mai",
    contactInfo: {
      phone: "024 3869 3731",
      email: "bachmai@bachmai.gov.vn",
    },
    operatingHours: "24/7",
    services: ["Cấp cứu", "Tim mạch", "Ung bướu", "Thần kinh", "Tiêu hóa"],
    bloodInventory: [
      {
        bloodType: "A-",
        component: "whole_blood",
        quantity: 25,
        expiresAt: "2025-06-30",
      },
      {
        bloodType: "O-",
        component: "red_cells",
        quantity: 15,
        expiresAt: "2025-06-28",
      },
      {
        bloodType: "B-",
        component: "platelets",
        quantity: 10,
        expiresAt: "2025-06-22",
      },
      {
        bloodType: "AB-",
        component: "plasma",
        quantity: 35,
        expiresAt: "2025-07-10",
      },
    ],
    emergencyContact: "115",
    description:
      "Bệnh viện hạng đặc biệt, trung tâm y tế tuyến cuối khu vực phía Bắc.",
    coordinates: { latitude: 21.0136, longitude: 105.8421 },
    isActive: true,
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2025-06-09T00:00:00Z",
  },
  {
    id: "3",
    name: "Bệnh viện Việt Đức",
    address: "40 Tràng Thi, Hoàn Kiếm, Hà Nội",
    province: "Thành phố Hà Nội",
    district: "Quận Hoàn Kiếm",
    ward: "Phường Tràng Thi",
    contactInfo: {
      phone: "024 3825 3531",
      email: "vietduc@vietduc.vn",
    },
    operatingHours: "24/7",
    services: ["Cấp cứu", "Ngoại khoa", "Tim mạch", "Ghép tạng"],
    bloodInventory: [
      {
        bloodType: "O+",
        component: "whole_blood",
        quantity: 35,
        expiresAt: "2025-06-25",
      },
      {
        bloodType: "A+",
        component: "red_cells",
        quantity: 25,
        expiresAt: "2025-06-30",
      },
      {
        bloodType: "B+",
        component: "platelets",
        quantity: 15,
        expiresAt: "2025-06-18",
      },
    ],
    emergencyContact: "115",
    description: "Bệnh viện ngoại khoa hàng đầu Việt Nam, chuyên về ghép tạng.",
    coordinates: { latitude: 21.0285, longitude: 105.8542 },
    isActive: true,
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2025-06-09T00:00:00Z",
  },
  {
    id: "4",
    name: "Bệnh viện Đại học Y Hà Nội",
    address: "1 Tôn Thất Tùng, Đống Đa, Hà Nội",
    province: "Thành phố Hà Nội",
    district: "Quận Đống Đa",
    ward: "Phường Kim Liên",
    contactInfo: {
      phone: "024 3852 3798",
      email: "contact@hmu.edu.vn",
    },
    operatingHours: "07:00 - 17:00",
    services: ["Khám bệnh", "Nội khoa", "Ngoại khoa", "Sản khoa"],
    bloodInventory: [
      {
        bloodType: "AB+",
        component: "plasma",
        quantity: 30,
        expiresAt: "2025-07-05",
      },
      {
        bloodType: "O-",
        component: "red_cells",
        quantity: 10,
        expiresAt: "2025-06-22",
      },
    ],
    emergencyContact: "115",
    description:
      "Bệnh viện trường Đại học Y Hà Nội, kết hợp khám chữa bệnh và đào tạo.",
    coordinates: { latitude: 21.0227, longitude: 105.8194 },
    isActive: true,
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2025-06-09T00:00:00Z",
  },
  {
    id: "5",
    name: "Bệnh viện Từ Dũ",
    address: "284 Cống Quỳnh, Phường Phạm Ngũ Lão, Quận 1, TP.HCM",
    province: "Thành phố Hồ Chí Minh",
    district: "Quận 1",
    ward: "Phường Phạm Ngũ Lão",
    contactInfo: {
      phone: "028 3829 5025",
      email: "info@tudu.com.vn",
    },
    operatingHours: "24/7",
    services: ["Sản khoa", "Nhi khoa", "Cấp cứu sản khoa"],
    bloodInventory: [
      {
        bloodType: "A+",
        component: "whole_blood",
        quantity: 40,
        expiresAt: "2025-06-28",
      },
      {
        bloodType: "B+",
        component: "red_cells",
        quantity: 20,
        expiresAt: "2025-06-24",
      },
      {
        bloodType: "O+",
        component: "platelets",
        quantity: 18,
        expiresAt: "2025-06-20",
      },
    ],
    emergencyContact: "115",
    description:
      "Bệnh viện sản nhi hàng đầu miền Nam, chuyên về chăm sóc mẹ và bé.",
    coordinates: { latitude: 10.7596, longitude: 106.6898 },
    isActive: true,
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2025-06-09T00:00:00Z",
  },
  {
    id: "6",
    name: "Bệnh viện 115",
    address: "527 Sư Vạn Hạnh, Phường 12, Quận 10, TP.HCM",
    province: "Thành phố Hồ Chí Minh",
    district: "Quận 10",
    ward: "Phường 12",
    contactInfo: {
      phone: "028 3865 4025",
      email: "info@bv115.com.vn",
    },
    operatingHours: "24/7",
    services: ["Cấp cứu", "Nội khoa", "Ngoại khoa", "Hồi sức cấp cứu"],
    bloodInventory: [
      {
        bloodType: "O+",
        component: "whole_blood",
        quantity: 45,
        expiresAt: "2025-07-02",
      },
      {
        bloodType: "A+",
        component: "red_cells",
        quantity: 28,
        expiresAt: "2025-06-26",
      },
    ],
    emergencyContact: "115",
    description: "Bệnh viện chuyên về cấp cứu và hồi sức, phục vụ 24/7.",
    coordinates: { latitude: 10.7715, longitude: 106.6663 },
    isActive: true,
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2025-06-09T00:00:00Z",
  },
  {
    id: "7",
    name: "Bệnh viện Nhi Đồng 1",
    address: "341 Sư Vạn Hạnh, Phường 12, Quận 10, TP.HCM",
    province: "Thành phố Hồ Chí Minh",
    district: "Quận 10",
    ward: "Phường 12",
    contactInfo: {
      phone: "028 3865 0050",
      email: "info@nhi1.org.vn",
    },
    operatingHours: "24/7",
    services: ["Nhi khoa", "Cấp cứu nhi", "Nhi ngoại", "Nhi tim mạch"],
    bloodInventory: [
      {
        bloodType: "A+",
        component: "whole_blood",
        quantity: 22,
        expiresAt: "2025-06-27",
      },
      {
        bloodType: "O+",
        component: "red_cells",
        quantity: 18,
        expiresAt: "2025-06-23",
      },
      {
        bloodType: "B+",
        component: "platelets",
        quantity: 12,
        expiresAt: "2025-06-19",
      },
    ],
    emergencyContact: "115",
    description: "Bệnh viện nhi hàng đầu miền Nam, chuyên điều trị cho trẻ em.",
    coordinates: { latitude: 10.7708, longitude: 106.6671 },
    isActive: true,
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2025-06-09T00:00:00Z",
  },
  {
    id: "8",
    name: "Bệnh viện Thống Nhất",
    address: "1 Lý Thường Kiệt, Phường 7, Quận Tân Bình, TP.HCM",
    province: "Thành phố Hồ Chí Minh",
    district: "Quận Tân Bình",
    ward: "Phường 7",
    contactInfo: {
      phone: "028 3862 4020",
      email: "info@bvthongnhat.com.vn",
    },
    operatingHours: "24/7",
    services: ["Cấp cứu", "Nội khoa", "Ngoại khoa", "Sản khoa", "Da liễu"],
    bloodInventory: [
      {
        bloodType: "B+",
        component: "whole_blood",
        quantity: 32,
        expiresAt: "2025-06-29",
      },
      {
        bloodType: "AB+",
        component: "plasma",
        quantity: 25,
        expiresAt: "2025-07-08",
      },
    ],
    emergencyContact: "115",
    description: "Bệnh viện đa khoa khu vực Tân Bình, phục vụ cộng đồng.",
    coordinates: { latitude: 10.8008, longitude: 106.653 },
    isActive: true,
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2025-06-09T00:00:00Z",
  },
  {
    id: "9",
    name: "Bệnh viện K Trung ương",
    address: "43 Quán Sứ, Hoàn Kiếm, Hà Nội",
    province: "Thành phố Hà Nội",
    district: "Quận Hoàn Kiếm",
    ward: "Phường Lý Thái Tổ",
    contactInfo: {
      phone: "024 3822 4455",
      email: "info@benhvienk.gov.vn",
    },
    operatingHours: "07:00 - 17:00",
    services: ["Ung bướu", "Xạ trị", "Hóa trị", "Phẫu thuật ung thư"],
    bloodInventory: [
      {
        bloodType: "O-",
        component: "red_cells",
        quantity: 12,
        expiresAt: "2025-06-25",
      },
      {
        bloodType: "A-",
        component: "platelets",
        quantity: 8,
        expiresAt: "2025-06-21",
      },
      {
        bloodType: "AB-",
        component: "plasma",
        quantity: 20,
        expiresAt: "2025-07-12",
      },
    ],
    emergencyContact: "115",
    description: "Bệnh viện chuyên khoa ung bướu hàng đầu Việt Nam.",
    coordinates: { latitude: 21.0285, longitude: 105.8541 },
    isActive: true,
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2025-06-09T00:00:00Z",
  },
  {
    id: "10",
    name: "Bệnh viện Nhân dân Gia Định",
    address: "1 Nơ Trang Long, Phường 7, Quận Bình Thạnh, TP.HCM",
    province: "Thành phố Hồ Chí Minh",
    district: "Quận Bình Thạnh",
    ward: "Phường 7",
    contactInfo: {
      phone: "028 3899 5533",
      email: "info@giadinh.com.vn",
    },
    operatingHours: "24/7",
    services: ["Cấp cứu", "Nội khoa", "Ngoại khoa", "Nhi khoa", "Răng hàm mặt"],
    bloodInventory: [
      {
        bloodType: "O+",
        component: "whole_blood",
        quantity: 38,
        expiresAt: "2025-07-03",
      },
      {
        bloodType: "A+",
        component: "red_cells",
        quantity: 24,
        expiresAt: "2025-06-27",
      },
      {
        bloodType: "B+",
        component: "platelets",
        quantity: 16,
        expiresAt: "2025-06-22",
      },
    ],
    emergencyContact: "115",
    description:
      "Bệnh viện đa khoa khu vực Bình Thạnh, phục vụ cộng đồng dân cư.",
    coordinates: { latitude: 10.8023, longitude: 106.7089 },
    isActive: true,
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2025-06-09T00:00:00Z",
  },
  // Note: Để giữ response ngắn gọn, tôi sẽ thêm 40 bệnh viện nữa trong file riêng
];

// Mock API service
export const hospitalApi = {
  async getHospitals(params?: {
    province?: string;
    district?: string;
    ward?: string;
    bloodType?: string;
    component?: string;
  }): Promise<MedicalFacility[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    let filteredHospitals = [...mockHospitals];

    if (params?.province) {
      filteredHospitals = filteredHospitals.filter(
        (h) => h.province === params.province
      );
    }

    if (params?.district) {
      filteredHospitals = filteredHospitals.filter(
        (h) => h.district === params.district
      );
    }

    if (params?.ward) {
      filteredHospitals = filteredHospitals.filter(
        (h) => h.ward === params.ward
      );
    }

    if (params?.bloodType || params?.component) {
      filteredHospitals = filteredHospitals.filter((hospital) => {
        return hospital.bloodInventory.some((inventory) => {
          const matchBloodType =
            !params.bloodType || inventory.bloodType === params.bloodType;
          const matchComponent =
            !params.component || inventory.component === params.component;
          const hasQuantity = inventory.quantity > 0;
          const notExpired = new Date(inventory.expiresAt) > new Date();

          return matchBloodType && matchComponent && hasQuantity && notExpired;
        });
      });
    }

    return filteredHospitals;
  },

  async getHospitalById(id: string): Promise<MedicalFacility | null> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockHospitals.find((h) => h.id === id) || null;
  },
};
