import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

interface MenuItem {
  label: string;
  icon: string;
  danger?: boolean;
  highlight?: boolean;
  onPress?: () => void; // ✅ mới
}

interface MenuSectionProps {
  title?: string;
  items: MenuItem[];
}

const MenuSection = ({ title, items }: MenuSectionProps) => (
  <View style={styles.section}>
    {title && <Text style={styles.sectionTitle}>{title}</Text>}
    {items.map((item, index) => (
      <TouchableOpacity
        key={index}
        style={styles.menuItem}
        onPress={item.onPress} // ✅ gọi hàm nếu có
      >
        <MaterialCommunityIcons
          name={item.icon as any}
          size={20}
          color={item.danger ? "red" : "#333"}
        />
        <Text
          style={[
            styles.menuText,
            item.highlight && { color: "red" },
            item.danger && { color: "red" },
          ]}
        >
          {item.label}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  section: { paddingHorizontal: 16, marginBottom: 12 },
  sectionTitle: { fontWeight: "bold", fontSize: 16, marginVertical: 10 },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
  },
  menuText: { marginLeft: 12, fontSize: 16 },
});

export default MenuSection;
