import { Button, Text } from "@react-navigation/elements";
import { useEffect, useState } from "react";
import { TextInput, View } from "react-native";
import { ProductType } from "../types";
import RedButton from "./RedButton";

export interface ProductFormProps {
    product?: ProductType;
    onSubmit?: (product: ProductType) => void;
    onCancel?: () => void;
    onDelete?: () => void;
}

export default function ProductForm(props: ProductFormProps) {
    const [product, setProduct] = useState<ProductType>({
        id: 0,
        name: "",
        description: "",
    });

    useEffect(() => {
        if (props.product) {
            setProduct(props.product);
        }
    }, [props.product]);

    return (
        <View style={{ padding: 8, rowGap: 12 }}>
            <View>
                <Text>Product Name</Text>
                <TextInput
                    style={{
                        borderColor: "black",
                        borderWidth: 1,
                        padding: 4,
                        backgroundColor: "white",
                    }}
                    value={product.name}
                    onChangeText={(text) => setProduct({...product, name: text })}
                />
            </View>
            <View>
                <Text>Product Description</Text>
                <TextInput
                    multiline
                    numberOfLines={4}
                    style={{
                        borderColor: "black",
                        borderWidth: 1,
                        padding: 4,
                        backgroundColor: "white",
                    }}
                    value={product.description}
                    onChangeText={(text) => setProduct({ ...product, description: text })}
                />
            </View>
            <View style={{ flexDirection: "row", columnGap: 8 }}>
                <Button onPressIn={() => props.onSubmit && props.onSubmit(product)}>Save</Button>
                <RedButton onPressIn={props.onCancel}>Cancel</RedButton>
                {props.product?.id && <Button onPressIn={props.onDelete}>Delete</Button>}
            </View>
        </View>
    );
}