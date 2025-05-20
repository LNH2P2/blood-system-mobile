import { listProducts } from "@/lib/api/products";
import MockProduct from "@/lib/components/MockProduct";
import { Button } from "@react-navigation/elements";
import { useQuery } from "@tanstack/react-query";
import { useNavigation, useRouter } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

export default function ProductsScreen() {
    const router = useRouter();
    const navigation = useNavigation();

    const listProductsQuery = useQuery({
        queryKey: ["listProducts"],
        queryFn: listProducts,
        initialData: []
    })
    const products = listProductsQuery.data;
    console.log(products);

    useEffect(() => {
        navigation.addListener("focus", () => {
            listProductsQuery.refetch();
        })
    }, [router])

    return (
        <View style={{ padding: 8, rowGap: 8 }}>
            <View style={{ flexDirection: "row" }}>
                <Button onPressIn={() => router.navigate("/products/create")}>Add Product</Button>
            </View>
            <View style={{ rowGap: 4 }}>
                {products.map((item, index) => (
                    <MockProduct key={index} product={item} onClick={() => router.navigate({
                        pathname: "/products/[productId]",
                        params: { productId: item.id }
                    })} />
                ))}
            </View>
        </View>
    );
}