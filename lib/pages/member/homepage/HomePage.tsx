import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BlogList from "../blog/components/BlogList";
import { blogs } from "./mock";

export default function HomePage() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Latest Blogs</Text>
        <TouchableOpacity onPress={() => router.navigate("/(member)/blog")}>
          <Text style={{ color: "#007bff" }}>See all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={blogs}
        renderItem={({ item }) => <BlogList item={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
