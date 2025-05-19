import { createProduct } from "@/lib/api/products";
import ProductForm from "@/lib/components/ProductForm";
import { useRouter } from "expo-router";

export default function CreateProductScreen() {
    const router = useRouter();

    return (
        <ProductForm
            onCancel={() => router.back()}
            onSubmit={(product) => {
                console.log("Product created", product);
                createProduct(product);
                router.back();
            }}
        />
    )
}