import { useEffect, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { ProductType } from "../types";

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
                <Button title="Save" onPress={() => props.onSubmit && props.onSubmit(product)} />
                <Button title="Cancel" onPress={props.onCancel} />
                {props.product?.id ? <Button title="Delete" onPress={props.onDelete} /> : <></>}
            </View>
        </View>
    );
}