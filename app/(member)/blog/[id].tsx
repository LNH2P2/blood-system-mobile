import { usePathname } from "expo-router";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BlogDetail() {
  const pathname = usePathname();
  const blogId = pathname.split("/").pop();

  return (
    <SafeAreaView>
      <Text>base: {blogId}</Text>
    </SafeAreaView>
  );
}
