import { deleteProduct, getProduct, updateProduct } from "@/lib/api/products";
import ProductForm from "@/lib/components/ProductForm";
import { ProductType } from "@/lib/types";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";

export default function ProductDetailScreen() {
    const { productId } = useLocalSearchParams<{ productId: string }>();
    const [product, setProduct] = useState<ProductType>();
    const router = useRouter();

    useEffect(() => {
        setProduct(getProduct(Number(productId)))
    }, [])

    return (
        <ProductForm
            product={product}
            onCancel={() => router.back()}
            onSubmit={(product) => {
                updateProduct(product.id, product);
                router.back();
            }}
            onDelete={() => {
                deleteProduct(Number(productId));
                router.back();
            }}
        />
    )
}