import LoadingOverlay from "@/lib/components/Loading";
import { useBlogs } from "@/lib/hooks/api/useBlog";
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
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BlogList from "../blog/components/BlogList";

const { width } = Dimensions.get("window");

export default function HomePage() {
  const router = useRouter();
  const { data: blogs, isLoading } = useBlogs();

  // Only get the first 3 blogs
  const latestBlogs = blogs?.slice(0, 3);

  if (isLoading) {
    return <LoadingOverlay visible={isLoading} />;
  }

  const bloodTypes = [
    { type: "A+", compatibility: "Can donate to A+, AB+" },
    { type: "O-", compatibility: "Universal donor" },
    { type: "AB+", compatibility: "Universal recipient" },
    { type: "B-", compatibility: "Can donate to B-, B+, AB-, AB+" },
  ];

  const quickActions = [
    {
      id: "1",
      title: "Donate Blood",
      subtitle: "Register to donate",
      icon: "heart",
      color: "#FF6B6B",
      onPress: () => router.navigate("/(donation-request)/donation-request"),
    },
    {
      id: "2",
      title: "Find Donor",
      subtitle: "Search nearby donors",
      icon: "search",
      color: "#4ECDC4",
      onPress: () => router.navigate("/(donation-request)/donation-place"),
    },
    {
      id: "3",
      title: "Blood Bank",
      subtitle: "Check availability",
      icon: "medical",
      color: "#45B7D1",
      onPress: () => router.navigate("/(donation-request)/donation-blood"),
    },
    {
      id: "4",
      title: "Emergency",
      subtitle: "Urgent blood needed",
      icon: "alert-circle",
      color: "#FF9F43",
      onPress: () => router.navigate("/(donation-request)/donation-request"),
    },
  ];

  const stats = [
    { label: "Total Donors", value: "1,247", icon: "people" },
    { label: "Units Collected", value: "3,892", icon: "water" },
    { label: "Lives Saved", value: "11,676", icon: "heart" },
    { label: "Active Requests", value: "23", icon: "time" },
  ];

  const emergencyRequests = [
    {
      id: "1",
      bloodType: "O-",
      location: "City Hospital",
      urgency: "Critical",
      timePosted: "2 hours ago",
    },
    {
      id: "2",
      bloodType: "A+",
      location: "General Hospital",
      urgency: "Urgent",
      timePosted: "4 hours ago",
    },
  ];

  const renderEmergencyRequest = ({
    item,
  }: {
    item: (typeof emergencyRequests)[0];
  }) => (
    <TouchableOpacity style={styles.emergencyCard}>
      <View style={styles.emergencyHeader}>
        <View style={styles.bloodTypeTag}>
          <Text style={styles.bloodTypeText}>{item.bloodType}</Text>
        </View>
        <View
          style={[
            styles.urgencyTag,
            {
              backgroundColor:
                item.urgency === "Critical" ? "#FF6B6B" : "#FF9F43",
            },
          ]}
        >
          <Text style={styles.urgencyText}>{item.urgency}</Text>
        </View>
      </View>
      <Text style={styles.locationText}>{item.location}</Text>
      <Text style={styles.timeText}>{item.timePosted}</Text>
    </TouchableOpacity>
  );

  const renderQuickAction = ({ item }: { item: (typeof quickActions)[0] }) => (
    <TouchableOpacity style={styles.quickActionCard} onPress={item.onPress}>
      <View
        style={[styles.quickActionIcon, { backgroundColor: `${item.color}20` }]}
      >
        <Ionicons name={item.icon as any} size={24} color={item.color} />
      </View>
      <Text style={styles.quickActionTitle}>{item.title}</Text>
      <Text style={styles.quickActionSubtitle}>{item.subtitle}</Text>
    </TouchableOpacity>
  );

  const renderBloodType = ({ item }: { item: (typeof bloodTypes)[0] }) => (
    <View style={styles.bloodTypeCard}>
      <Text style={styles.bloodTypeTitle}>{item.type}</Text>
      <Text style={styles.bloodTypeCompatibility}>{item.compatibility}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image
              source={require("@/assets/images/logo-text-primary.png")}
              style={styles.logo}
              resizeMode='contain'
            />
            <Text style={styles.headerTitle}>Blood Donation Center</Text>
            <Text style={styles.headerSubtitle}>Saving lives together</Text>
          </View>
        </View>

        {/* Emergency Alerts */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Emergency Requests</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={emergencyRequests}
            renderItem={renderEmergencyRequest}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.emergencyList}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <FlatList
            data={quickActions}
            renderItem={renderQuickAction}
            keyExtractor={(item) => item.id}
            numColumns={2}
            scrollEnabled={false}
            contentContainerStyle={styles.quickActionsGrid}
          />
        </View>

        {/* Statistics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Impact</Text>
          <View style={styles.statsContainer}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <Ionicons
                  name={stat.icon as any}
                  size={20}
                  color={theme.color.primary}
                />
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Blood Type Information */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Blood Type Info</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Learn more</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={bloodTypes}
            renderItem={renderBloodType}
            keyExtractor={(item) => item.type}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.bloodTypeList}
          />
        </View>

        {/* Latest Blogs */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Latest Blogs</Text>
            <TouchableOpacity onPress={() => router.navigate("/blog")}>
              <Text style={styles.seeAllText}>See all</Text>
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
    backgroundColor: theme.color.light,
  },
  header: {
    backgroundColor: theme.color.primary,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerContent: {
    alignItems: "center",
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.color.light,
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: 16,
    color: theme.color.light,
    textAlign: "center",
    opacity: 0.8,
    marginTop: 5,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 25,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.color.dark,
  },
  seeAllText: {
    color: theme.color.primary,
    fontSize: 16,
    fontWeight: "600",
  },
  emergencyList: {
    paddingRight: 20,
  },
  emergencyCard: {
    backgroundColor: theme.color.light,
    padding: 15,
    borderRadius: 12,
    marginRight: 12,
    width: width * 0.7,
    borderLeftWidth: 4,
    borderLeftColor: "#FF6B6B",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emergencyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  bloodTypeTag: {
    backgroundColor: theme.color.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  bloodTypeText: {
    color: theme.color.light,
    fontSize: 12,
    fontWeight: "bold",
  },
  urgencyTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  urgencyText: {
    color: theme.color.light,
    fontSize: 12,
    fontWeight: "bold",
  },
  locationText: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.color.dark,
    marginBottom: 5,
  },
  timeText: {
    fontSize: 12,
    color: theme.color.gray,
  },
  quickActionsGrid: {
    justifyContent: "space-between",
  },
  quickActionCard: {
    backgroundColor: theme.color.light,
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    width: (width - 60) / 2,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.color.dark,
    textAlign: "center",
    marginBottom: 4,
  },
  quickActionSubtitle: {
    fontSize: 12,
    color: theme.color.gray,
    textAlign: "center",
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statCard: {
    backgroundColor: theme.color.light,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    width: (width - 60) / 2,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.color.primary,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: theme.color.gray,
    textAlign: "center",
    marginTop: 4,
  },
  bloodTypeList: {
    paddingRight: 20,
  },
  bloodTypeCard: {
    backgroundColor: theme.color.light,
    padding: 15,
    borderRadius: 12,
    marginRight: 12,
    width: 160,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bloodTypeTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.color.primary,
    marginBottom: 5,
  },
  bloodTypeCompatibility: {
    fontSize: 12,
    color: theme.color.gray,
    lineHeight: 16,
  },
});
