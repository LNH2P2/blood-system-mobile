import localFilesApi from "@/lib/api/local-files";
import {
  useCreateBlog,
  useDeleteBlog,
  useUpdateBlog,
} from "@/lib/hooks/api/useBlog";
import { useCategories, useCategoryById } from "@/lib/hooks/api/useCategory";
import { Blog } from "@/lib/types/blog";
import { Category } from "@/lib/types/category";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface BlogDialogProps {
  visible: boolean;
  onClose: () => void;
  mode: "create" | "update" | "delete";
  blog?: Blog;
}

export default function BlogDialog({
  visible,
  onClose,
  mode,
  blog,
}: Readonly<BlogDialogProps>) {
  const [title, setTitle] = useState(blog?.title);
  const [summary, setSummary] = useState(blog?.summary);
  const [content, setContent] = useState(blog?.content);
  const [image, setImage] = useState(blog?.image);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    blog?.category ?? ""
  );
  const [category, setCategory] = useState<Category | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const { data: categories } = useCategories();

  const { data: categoryFromServer } = useCategoryById(selectedCategoryId);

  useEffect(() => {
    if (categoryFromServer) {
      setCategory(categoryFromServer);
    }
  }, [categoryFromServer]);

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setSummary(blog.summary);
      setContent(blog.content);
      setImage(blog.image);
      setSelectedCategoryId(blog.category ?? "");
    }
  }, [blog]);

  const createBlog = useCreateBlog();
  const updateBlog = useUpdateBlog();
  const deleteBlog = useDeleteBlog();

  const pickImage = async () => {
    try {
      // Request permission
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission needed",
          "Please grant permission to access your photos"
        );
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setIsUploading(true);
        try {
          const formData = new FormData();
          formData.append("file", {
            uri: result.assets[0].uri,
            type: "image/jpeg",
            name: "image.jpg",
          } as any);

          const response = await localFilesApi.uploadFile(formData);
          console.log("response after uploading files: ", response);
          if (response) {
            setImage(response);
            Alert.alert("Success", "Image uploaded successfully");
          } else {
            throw new Error("Invalid response from server");
          }
        } catch (error) {
          console.error("Upload error:", error);
          Alert.alert("Error", "Failed to upload image. Please try again.");
        } finally {
          setIsUploading(false);
        }
      }
    } catch (error) {
      console.error("Image picker error:", error);
      Alert.alert("Error", "Failed to pick image. Please try again.");
      setIsUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!title?.trim()) {
      Alert.alert("Error", "Please enter a title");
      return;
    }

    if (!selectedCategoryId) {
      Alert.alert("Error", "Please select a category");
      return;
    }

    try {
      if (mode === "create") {
        await createBlog.mutateAsync({
          title,
          summary,
          content,
          image,
          category: selectedCategoryId,
        });
      } else if (mode === "update" && blog) {
        await updateBlog.mutateAsync({
          id: blog._id,
          blog: {
            title,
            summary,
            content,
            image,
            category: selectedCategoryId,
          },
        });
      } else if (mode === "delete" && blog) {
        console.log("deleting blog: ", blog._id);
        await deleteBlog.mutateAsync(blog._id);
      }

      setTitle("");
      setSummary("");
      setContent("");
      setImage("");
      setSelectedCategoryId("");
      onClose();
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  const handleDelete = () => {
    Alert.alert("Delete Blog", "Are you sure you want to delete this blog?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", onPress: handleSubmit, style: "destructive" },
    ]);
  };

  return (
    <Modal
      visible={visible}
      animationType='slide'
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>
            {mode === "create"
              ? "Create Blog"
              : mode === "update"
              ? "Update Blog"
              : "Delete Blog"}
          </Text>

          {mode !== "delete" ? (
            <>
              <TextInput
                style={styles.input}
                placeholder='Title'
                value={title}
                onChangeText={setTitle}
                placeholderTextColor='#666'
              />
              <TextInput
                style={styles.input}
                placeholder='Summary'
                value={summary}
                onChangeText={setSummary}
                multiline
                placeholderTextColor='#666'
              />
              <TextInput
                style={[styles.input, styles.contentInput]}
                placeholder='Content'
                value={content}
                onChangeText={setContent}
                multiline
                placeholderTextColor='#666'
              />

              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={category?._id}
                  onValueChange={(itemValue) =>
                    setSelectedCategoryId(itemValue)
                  }
                  style={styles.picker}
                >
                  <Picker.Item label='Select a category' value='' />
                  {categories?.map((category) => (
                    <Picker.Item
                      key={category._id}
                      label={category.name}
                      value={category._id}
                    />
                  ))}
                </Picker>
              </View>

              <View style={styles.imageContainer}>
                {image ? (
                  <Image
                    source={{ uri: image }}
                    style={styles.previewImage}
                    resizeMode='cover'
                  />
                ) : null}
                <TouchableOpacity
                  style={[
                    styles.uploadButton,
                    isUploading && styles.uploadButtonDisabled,
                  ]}
                  onPress={pickImage}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <View style={styles.uploadingContainer}>
                      <ActivityIndicator color='white' />
                      <Text style={styles.uploadButtonText}>Uploading...</Text>
                    </View>
                  ) : (
                    <Text style={styles.uploadButtonText}>
                      {image ? "Change Image" : "Upload Image"}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <Text style={styles.deleteText}>
              Are you sure you want to delete &ldquo;{blog?.title}&rdquo;?
            </Text>
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onClose}
              disabled={isUploading}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.submitButton,
                mode === "delete" && styles.deleteButton,
                isUploading && styles.buttonDisabled,
              ]}
              onPress={mode === "delete" ? handleDelete : handleSubmit}
              disabled={isUploading}
            >
              <Text style={styles.buttonText}>
                {mode === "create"
                  ? "Create"
                  : mode === "update"
                  ? "Update"
                  : "Delete"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 24,
    width: "100%",
    maxHeight: "80%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: "#f8f8f8",
  },
  contentInput: {
    height: 120,
    textAlignVertical: "top",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: "#f8f8f8",
  },
  picker: {
    height: 50,
  },
  imageContainer: {
    marginBottom: 16,
    alignItems: "center",
  },
  previewImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  uploadButton: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    width: "100%",
  },
  uploadButtonDisabled: {
    backgroundColor: "#ccc",
  },
  uploadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  uploadButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    gap: 12,
  },
  cancelButton: {
    backgroundColor: "#e0e0e0",
    padding: 14,
    borderRadius: 8,
    flex: 1,
  },
  submitButton: {
    backgroundColor: "#007AFF",
    padding: 14,
    borderRadius: 8,
    flex: 1,
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
  deleteText: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 24,
    color: "#333",
    lineHeight: 24,
  },
});
