import { Text, View } from "react-native";
import { ProductType } from "../types";

export interface MockProductProps {
    product: ProductType;
    onClick?: () => void;
}

export default function MockProduct({ product, onClick }: MockProductProps) {
    return (
        <View style={{ borderColor: "black", borderWidth: 1, padding: 4 }} onTouchStart={onClick}>
            <Text style={{ fontSize: 20, fontWeight: "semibold" }}>{product.name}</Text>
            <Text>{product.description}</Text>
        </View>
    )
}