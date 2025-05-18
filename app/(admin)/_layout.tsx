import { Tabs } from "expo-router";

export default function AdminLayout() {
    return <Tabs>
        <Tabs.Screen name="index" options={{ title: "Dashboard" }} />
        <Tabs.Screen name="products" options={{ title: "Products", headerShown: false }} />
    </Tabs>
}