import React from "react";
import { Image, Text, View } from "react-native";

export default function BlogList({
  item,
}: {
  item: { title: string; summary: string; image: string };
}) {
  return (
    <View
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
    </View>
  );
}
