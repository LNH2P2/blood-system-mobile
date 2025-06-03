import React, { useState } from "react";
import { FlatList, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { blogs } from "../homepage/mock";
import BlogList from "./components/BlogList";

export default function BlogPage() {
  const [search, setSearch] = useState("");

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.summary.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <TextInput
        placeholder='Search blogs...'
        value={search}
        onChangeText={setSearch}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          padding: 10,
          marginBottom: 16,
        }}
      />
      <FlatList
        data={filteredBlogs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <BlogList item={item} />}
      />
    </SafeAreaView>
  );
}
