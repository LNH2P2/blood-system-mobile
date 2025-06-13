import LoadingOverlay from "@/lib/components/Loading";
import { useBlogById } from "@/lib/hooks/api/useBlog";
import { Ionicons } from "@expo/vector-icons";
import { usePathname } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { height } = Dimensions.get("window");

export default function BlogDetail() {
  const pathname = usePathname();
  const blogId = pathname.split("/").pop();

  const { data: blog, isLoading } = useBlogById(blogId as string);

  if (!blog) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name='document-text-outline' size={64} color='#ccc' />
          <Text style={styles.errorText}>Blog post not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (isLoading) {
    return <LoadingOverlay visible={isLoading} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='light-content' />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        {/* Hero Image Section */}
        <View style={styles.heroContainer}>
          <Image
            source={{ uri: blog.image }}
            style={styles.heroImage}
            resizeMode='cover'
          />
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>{blog.title}</Text>
            <Text style={styles.heroSummary}>{blog.summary}</Text>
          </View>
        </View>

        {/* Content Section */}
        <View style={styles.contentContainer}>
          {/* Reading Info */}
          <View style={styles.readingInfo}>
            <View style={styles.infoItem}>
              <Ionicons name='time-outline' size={16} color='#666' />
              <Text style={styles.infoText}>5 min read</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name='heart-outline' size={16} color='#e74c3c' />
              <Text style={styles.infoText}>Health</Text>
            </View>
          </View>

          {/* Article Content */}
          <View style={styles.articleContent}>
            <Text style={styles.contentText}>{blog.content}</Text>
          </View>

          {/* Related Articles Hint */}
          <View style={styles.relatedContainer}>
            <Text style={styles.relatedTitle}>Related Articles</Text>
            <Text style={styles.relatedSubtitle}>
              Discover more about blood donation and health
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: "#666",
    marginTop: 16,
    textAlign: "center",
  },
  heroContainer: {
    position: "relative",
    height: height * 0.4,
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "60%",
  },
  heroContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  heroSummary: {
    fontSize: 16,
    color: "#f0f0f0",
    lineHeight: 22,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  contentContainer: {
    padding: 20,
  },
  readingInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    marginLeft: 6,
    fontSize: 14,
    color: "#666",
  },
  articleContent: {
    marginBottom: 32,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 26,
    color: "#333",
    textAlign: "justify",
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#f0f0f0",
    marginBottom: 32,
  },
  actionButton: {
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    minWidth: 80,
  },
  actionText: {
    marginTop: 4,
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  relatedContainer: {
    backgroundColor: "#f8f9fa",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  relatedTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  relatedSubtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
});
