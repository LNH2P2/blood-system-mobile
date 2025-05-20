import { deleteProduct, getProduct, updateProduct } from "@/lib/api/products";
import ProductForm from "@/lib/components/ProductForm";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function ProductDetailScreen() {
    const { productId } = useLocalSearchParams<{ productId: string }>();
    const router = useRouter();

    const getProductQuery = useQuery({
        queryKey: ["getProduct", productId],
        queryFn: () => getProduct(+productId),
    })
    const product = getProductQuery.data;
    
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