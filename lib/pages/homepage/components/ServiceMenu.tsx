import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ServiceItem {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

const services: ServiceItem[] = [
  {
    id: "1",
    title: "Đặt lịch",
    icon: "medical",
    color: "#4CAF50",
  },
  {
    id: "2",
    title: "Pharmacy",
    icon: "medical-outline",
    color: "#2196F3",
  },
  {
    id: "3",
    title: "Hospital",
    icon: "business",
    color: "#FF9800",
  },
  {
    id: "4",
    title: "Ambulance",
    icon: "car",
    color: "#F44336",
  },
];

export default function ServiceMenu() {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
        paddingHorizontal: 10,
      }}
    >
      {services.map((service) => (
        <TouchableOpacity
          key={service.id}
          style={{
            alignItems: "center",
            flex: 1,
          }}
          onPress={() => {
            if (service.title === "Đặt lịch") {
              router.navigate("/(donation-request)/donation-request");
            } else if (service.title === "Hospital") {
              router.navigate("/(hospital)/hospital-search");
            }
          }}
        >
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 15,
              backgroundColor: `${service.color}20`,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <Ionicons name={service.icon} size={30} color={service.color} />
          </View>
          <Text
            style={{
              fontSize: 12,
              color: "#666",
              textAlign: "center",
            }}
          >
            {service.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
