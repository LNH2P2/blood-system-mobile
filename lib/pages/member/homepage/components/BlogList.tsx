import React from "react";
import { Text, View } from "react-native";

export default function BlogList({
  item,
}: {
  item: { title: string; summary: string };
}) {
  return (
    <View
      style={{
        marginBottom: 12,
        padding: 12,
        backgroundColor: "#f9f9f9",
        borderRadius: 8,
      }}
    >
      <Text style={{ fontWeight: "bold", fontSize: 16 }}>{item.title}</Text>
      <Text style={{ color: "#555", marginTop: 4 }}>{item.summary}</Text>
    </View>
  );
}
