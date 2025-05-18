import RedButton from "@/lib/components/RedButton";
import { Button } from "@react-navigation/elements";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button onPressIn={() => router.navigate("/(member)/profile")}>
        Member
      </Button>
      <RedButton onPressIn={() => router.navigate("/(admin)")}>
        Admin
      </RedButton>
    </View>
  );
}
