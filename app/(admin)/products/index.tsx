import { listProducts } from "@/lib/api/products";
import MockProduct from "@/lib/components/MockProduct";
import { ProductType } from "@/lib/types";
import { Button } from "@react-navigation/elements";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function ProductsScreen() {
    const router = useRouter();
    const [products, setProducts] = useState<ProductType[]>([]);

    useEffect(() => {
        setProducts(listProducts());
    }, [])

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