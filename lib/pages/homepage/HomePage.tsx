import LoadingOverlay from "@/lib/components/Loading";
import { useBlogs } from "@/lib/hooks/api/useBlog";
import { useUserById } from "@/lib/hooks/api/useUser";
import { theme } from "@/lib/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BlogList from "../blog/components/BlogList";

const { width } = Dimensions.get("window");

export default function HomePage() {
  const router = useRouter();
  // const { user } = useAuth();

  const { data: user } = useUserById("687aa3bdbb57032008becc23");

  const { data: blogs, isLoading } = useBlogs();

  // Only get the first 3 blogs
  const latestBlogs = blogs?.slice(0, 3);

  if (isLoading) {
    return <LoadingOverlay visible={isLoading} />;
  }

  const quickActions = [
    {
      id: "1",
      title: "Đặt lịch",
      icon: "calendar",
      color: "#5D5FEF",
      backgroundColor: "#F1F1FE",
      onPress: () => router.navigate("/(donation-request)/donation-request")
    },
    {
      id: "2",
      title: "Địa điểm",
      icon: "location",
      color: "#F5AF19",
      backgroundColor: "#FFF9E6",
      onPress: () => router.navigate("/(hospital)/hospital-list")
    },
    {
      id: "3",
      title: "Bệnh viện",
      icon: "medical",
      color: "#FF6B35",
      backgroundColor: "#FFE6DE",
      onPress: () => router.navigate("/(hospital)/hospital-list")
    },
    {
      id: "4",
      title: "Nhóm",
      icon: "people",
      color: "#56CCF2",
      backgroundColor: "#E5F7FF",
      onPress: () => router.navigate("/(tabs)/profile")
    },
    {
      id: "5",
      title: "Bạn bè",
      icon: "person-add",
      color: "#6FCF97",
      backgroundColor: "#E8F8F0",
      onPress: () => router.navigate("/(tabs)/profile")
    },
    {
      id: "6",
      title: "Liên hệ",
      icon: "card",
      color: "#FF5C5C",
      backgroundColor: "#FFE5E5",
      onPress: () => router.navigate("/(tabs)/profile")
    },
    {
      id: "7",
      title: "Ưu đãi",
      icon: "gift",
      color: "#9B59B6",
      backgroundColor: "#F4E8FF",
      onPress: () => router.navigate("/(tabs)/blog")
    },
    {
      id: "8",
      title: "Hỗi đáp",
      icon: "headset",
      color: "#2ECC71",
      backgroundColor: "#E8F8F0",
      onPress: () => router.navigate("/(tabs)/profile")
    }
  ];

  const renderQuickAction = ({ item }: { item: (typeof quickActions)[0] }) => (
    <TouchableOpacity
      style={[
        styles.quickActionCard,
        { backgroundColor: item.backgroundColor }
      ]}
      onPress={item.onPress}
    >
      <View style={styles.quickActionIcon}>
        <Ionicons name={item.icon as any} size={24} color={item.color} />
      </View>
      <Text style={styles.quickActionTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with User Info */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.userInfo}>
              <Text style={styles.greeting}>
                Xin chào, {user?.fullName || "Bạn"}
              </Text>
              <Text style={styles.subGreeting}>
                Bạn đã đủ điều kiện hiến máu!
              </Text>
            </View>
            <TouchableOpacity style={styles.profileContainer}>
              {user?.image ? (
                <Image
                  source={{ uri: user.image }}
                  style={styles.profileImage}
                />
              ) : (
                <View style={styles.defaultProfile}>
                  <Ionicons name="person" size={24} color={theme.color.white} />
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Actions Grid */}
        <View style={styles.section}>
          <FlatList
            data={quickActions}
            renderItem={renderQuickAction}
            keyExtractor={(item) => item.id}
            numColumns={4}
            scrollEnabled={false}
            contentContainerStyle={styles.quickActionsGrid}
            columnWrapperStyle={styles.quickActionRow}
          />
        </View>

        {/* News Section - Using Blog */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Tin tức</Text>
            <TouchableOpacity onPress={() => router.navigate("/(tabs)/blog")}>
              <Text style={styles.seeAllText}>Tất cả</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={latestBlogs}
            renderItem={({ item }) => <BlogList item={item} />}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.light
  },
  header: {
    backgroundColor: theme.color.primary,
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
  },
  userInfo: {
    flex: 1
  },
  greeting: {
    fontSize: 18,
    fontWeight: "600",
    color: theme.color.white,
    marginBottom: 4
  },
  subGreeting: {
    fontSize: 14,
    color: theme.color.white,
    opacity: 0.9,
    fontStyle: "italic"
  },
  profileContainer: {
    marginLeft: 15
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: theme.color.white
  },
  defaultProfile: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: theme.color.white
  },
  bloodInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10
  },
  bloodTypeCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.color.primary,
    borderWidth: 3,
    borderColor: theme.color.white,
    justifyContent: "center",
    alignItems: "center"
  },
  bloodTypeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.color.white
  },
  bloodTypeLabel: {
    fontSize: 12,
    color: theme.color.white,
    marginTop: 2
  },
  donationInfoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.color.primary,
    borderWidth: 3,
    borderColor: theme.color.white,
    justifyContent: "center",
    alignItems: "center"
  },
  donationCountText: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.color.white
  },
  donationCountLabel: {
    fontSize: 12,
    color: theme.color.white,
    marginTop: 2
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 25
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.color.dark
  },
  seeAllText: {
    color: theme.color.primary,
    fontSize: 16,
    fontWeight: "600"
  },
  quickActionsGrid: {
    paddingTop: 10
  },
  quickActionRow: {
    justifyContent: "space-around",
    paddingHorizontal: 10
  },
  quickActionCard: {
    alignItems: "center",
    width: (width - 100) / 4,
    marginBottom: 20,
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderRadius: 16
  },
  quickActionIcon: {
    marginBottom: 8
  },
  quickActionTitle: {
    fontSize: 12,
    fontWeight: "500",
    color: theme.color.dark,
    textAlign: "center"
  },
  bannerContainer: {
    backgroundColor: theme.color.primary,
    borderRadius: 16,
    overflow: "hidden",
    marginVertical: 10
  },
  bannerContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20
  },
  bannerLeft: {
    marginRight: 20
  },
  bannerIcon: {
    width: 60,
    height: 60,
    tintColor: theme.color.white
  },
  bannerRight: {
    flex: 1
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.color.white,
    marginBottom: 4
  },
  bannerNumber: {
    fontSize: 32,
    fontWeight: "bold",
    color: theme.color.white,
    marginBottom: 4
  },
  bannerSubtitle: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.color.white,
    lineHeight: 18
  }
});
