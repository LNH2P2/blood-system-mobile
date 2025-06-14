import LoadingOverlay from "@/lib/components/Loading";
import { useBlogs } from "@/lib/hooks/api/useBlog";
import { Blog } from "@/lib/types/blog";
import React, { useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BlogDialog from "./components/BlogDialog";
import BlogList from "./components/BlogList";

export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "update" | "delete">(
    "create"
  );
  const [selectedBlog, setSelectedBlog] = useState<Blog | undefined>();
  const { data: blogs, isLoading } = useBlogs();

  const filteredBlogs = blogs?.filter(
    (blog) =>
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.summary.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenDialog = (
    mode: "create" | "update" | "delete",
    blog?: Blog
  ) => {
    setDialogMode(mode);
    if (mode === "update" || mode === "delete") {
      setSelectedBlog(blog);
    } else if (mode === "create") {
      setSelectedBlog({
        _id: "",
        status: "draft",
        createdAt: "",
        updatedAt: "",
        __v: 0,
        title: "",
        summary: "",
        content: "",
        image: "",
      });
    }
    setDialogVisible(true);
  };

  const handleCloseDialog = () => {
    setSelectedBlog(undefined);
    setDialogVisible(false);
  };

  if (isLoading) {
    return <LoadingOverlay visible={isLoading} />;
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <TextInput
          placeholder='Search blogs...'
          value={search}
          onChangeText={setSearch}
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            padding: 10,
            flex: 1,
            marginRight: 10,
          }}
        />
        <TouchableOpacity
          onPress={() => handleOpenDialog("create")}
          style={{
            backgroundColor: "#007AFF",
            padding: 10,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Create</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredBlogs}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <BlogList
            item={item}
            onEdit={() => handleOpenDialog("update", item)}
            onDelete={() => handleOpenDialog("delete", item)}
          />
        )}
      />

      <BlogDialog
        visible={dialogVisible}
        onClose={handleCloseDialog}
        mode={dialogMode}
        blog={selectedBlog}
      />
    </SafeAreaView>
  );
}
