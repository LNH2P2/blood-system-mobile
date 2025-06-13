import { Blog } from "@/lib/types/blog";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function BlogList({ item }: Readonly<{ item: Blog }>) {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.navigate(`/blog/${item._id}`)}
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        padding: 12,
        backgroundColor: "#f9f9f9",
        borderRadius: 8,
      }}
    >
      <Image
        source={{ uri: item.image }}
        style={{ width: 60, height: 60, borderRadius: 8, marginRight: 12 }}
        resizeMode='cover'
      />
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>{item.title}</Text>
        <Text style={{ color: "#555", marginTop: 4 }}>{item.summary}</Text>
      </View>
    </TouchableOpacity>
  );
}
