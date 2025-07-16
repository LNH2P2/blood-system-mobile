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
    title: "Donate Blood",
    icon: "heart",
    color: "#FF6B6B",
  },
  {
    id: "2",
    title: "Find Donor",
    icon: "search",
    color: "#4ECDC4",
  },
  {
    id: "3",
    title: "Blood Bank",
    icon: "medical",
    color: "#45B7D1",
  },
  {
    id: "4",
    title: "Emergency",
    icon: "alert-circle",
    color: "#FF9F43",
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
            if (service.title === "Donate Blood") {
              router.navigate("/(donation-request)/donation-request");
            } else if (service.title === "Find Donor") {
              router.navigate("/(donation-request)/donation-place");
            } else if (service.title === "Blood Bank") {
              router.navigate("/(donation-request)/donation-blood");
            } else if (service.title === "Emergency") {
              router.navigate("/(donation-request)/donation-request");
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
